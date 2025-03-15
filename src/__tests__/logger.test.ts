import axios from 'axios'
import AxiosMockAdapter from 'axios-mock-adapter'

import '../__mocks__/matchMedia.mock'
import '../__mocks__/fingerprintjs.mock'
import { logError, configure } from '..'
import { resetConfig, type LogInfo } from '../helpers'

describe('logger', () => {
  const errorType = 'CUSTOM_ERROR_TYPE'
  const logEndpoint = '/path/to/custom/log/endpoint'

  const axiosMock = new AxiosMockAdapter(axios)

  axiosMock.onPost(logEndpoint).reply(200)

  beforeEach(() => {
    resetConfig()
    axiosMock.resetHistory()
  })

  it('calls the configured "logEndpoint" option when "logError" is called', async () => {
    configure({ logEndpoint })

    await logError(errorType)

    expect(axiosMock.history.post.length).toBe(1)
    expect(axiosMock.history.post[0].url).toBe(logEndpoint)
  })

  it('don\'t call the log endpoint when "disabled" option is true', async () => {
    configure({ disable: true })

    await logError(errorType)

    expect(axiosMock.history.post.length).toBe(0)
  })

  it('updates the configuration after "configure" method is called', async () => {
    const buildDateTime = new Date().toString()
    const gitRevision = '673e90ce177977064322a15ceaed60edd72e56cf'

    configure({
      logEndpoint,
      staticInfo: { buildDateTime, gitRevision },
    })

    await logError(errorType)

    expect(axiosMock.history.post.length).toBe(1)
    expect(axiosMock.history.post[0].url).toBe(logEndpoint)
    expect(JSON.parse(axiosMock.history.post[0].data)).toEqual({
      data: expect.objectContaining<Partial<LogInfo>>({
        extraInfo: {
          buildDateTime,
          gitRevision,
        },
      }),
    })
  })

  it('collects user info correctly', async () => {
    configure({
      logEndpoint,
    })

    await logError(errorType)

    expect(axiosMock.history.post.length).toBe(1)
    expect(JSON.parse(axiosMock.history.post[0].data)).toEqual({
      data: expect.objectContaining<LogInfo>({
        errorType,
        allLanguages: expect.any(Array),
        browserId: expect.any(String),
        browserInfo: expect.objectContaining({
          browser: expect.objectContaining({ name: expect.any(String) }),
          engine: expect.objectContaining({ name: expect.any(String) }),
          os: expect.any(Object),
          platform: expect.any(Object),
        }),
        deviceDimensions: expect.any(String),
        language: expect.any(String),
        localTime: expect.any(String),
        url: expect.any(String),
        userPreferences: {
          darkColorScheme: expect.any(Boolean),
          lightColorScheme: expect.any(Boolean),
          moreContrast: expect.any(Boolean),
          reducedData: expect.any(Boolean),
          reducedMotion: expect.any(Boolean),
        },
        extraInfo: {},
      }),
    })
  })

  it('passes "extraInfo" to log request', async () => {
    const extraInfo = {
      someNumber: 7,
      someBoolean: true,
      someArray: [],
      someObject: {},
    }

    configure({
      logEndpoint,
    })

    await logError(errorType, extraInfo)

    expect(axiosMock.history.post.length).toBe(1)
    expect(JSON.parse(axiosMock.history.post[0].data).data.extraInfo).toEqual(extraInfo)
  })

  it('console.log is correctly called when "debug" option is true', async () => {
    configure({ debug: true })

    const consoleLogMock = jest.spyOn(console, 'log').mockImplementation(() => {})
    const loggedStyle = Array(4).fill(expect.any(String))
    const loggedData = expect.objectContaining<LogInfo>({
      errorType,
      allLanguages: expect.any(Array),
      browserId: expect.any(String),
      browserInfo: expect.objectContaining({
        browser: expect.objectContaining({ name: expect.any(String) }),
        engine: expect.objectContaining({ name: expect.any(String) }),
        os: expect.any(Object),
        platform: expect.any(Object),
      }),
      deviceDimensions: expect.any(String),
      language: expect.any(String),
      localTime: expect.any(String),
      url: expect.any(String),
      userPreferences: {
        darkColorScheme: expect.any(Boolean),
        lightColorScheme: expect.any(Boolean),
        moreContrast: expect.any(Boolean),
        reducedData: expect.any(Boolean),
        reducedMotion: expect.any(Boolean),
      },
      extraInfo: {},
    })

    await logError(errorType)

    expect(consoleLogMock).toHaveBeenCalledTimes(1)
    expect(consoleLogMock).toHaveBeenCalledWith(...loggedStyle, loggedData)
    expect(axiosMock.history.post.length).toBe(0)
  })
})
