import axios from 'axios'

import { collectInfo, getConfig, setConfig } from './helpers'
import type { LoggerConfig } from './types'

/** Configure logger instance */
export function configure(newConfig: Partial<LoggerConfig>) {
  const config = getConfig()
  setConfig({ ...config, ...newConfig })
}

/** Log error passing a given error type and info object */
export async function logError(errorType: string, extraInfo?: object) {
  const config = getConfig()

  if (config.disable) {
    return
  }

  const info = await collectInfo(errorType, extraInfo)

  if (config.debug) {
    console.log(
      `%c client-error-logger %c ${info.errorType} `,
      'background: #db3534; color: white;',
      'background: lightgrey; color: #333;',
      'Endpoint called with parameters:',
      info,
    )
    return
  }

  if (!config.logEndpoint) {
    return console.error('Logger endpoint not configured')
  }

  await axios.post(config.logEndpoint, {
    data: info,
  })
}
