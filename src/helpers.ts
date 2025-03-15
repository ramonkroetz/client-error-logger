import Bowser from 'bowser'

import type { LoggerConfig } from './types'
import Fingerprint from '@fingerprintjs/fingerprintjs'

export type LogInfo = {
  errorType: string
  url: string
  language: string
  allLanguages: string[]
  browserInfo: Bowser.Parser.ParsedResult
  deviceDimensions: string
  browserId: string
  localTime: string
  userPreferences: {
    reducedData: boolean
    reducedMotion: boolean
    darkColorScheme: boolean
    lightColorScheme: boolean
    moreContrast: boolean
  }
  extraInfo: {
    [key: string]: unknown
  }
}

declare global {
  interface Window {
    logConfig: LoggerConfig
  }
}

const LOGGER_DEFAULT_CONFIG: LoggerConfig = {
  debug: false,
  disable: false,
  logEndpoint: '',
  staticInfo: {},
}

let config = LOGGER_DEFAULT_CONFIG

export function getConfig() {
  return config
}

export function setConfig(newConfig: LoggerConfig) {
  config = newConfig
}

export function resetConfig() {
  return setConfig(LOGGER_DEFAULT_CONFIG)
}

async function getBrowserId() {
  const fpPromise = await Fingerprint.load()
  const result = await fpPromise.get()
  return result.visitorId
}

export async function collectInfo(errorType: string, extraInfo?: object): Promise<LogInfo> {
  const url = window.location.href

  const { language } = navigator
  const allLanguages = [...navigator.languages]
  const browserInfo = Bowser.parse(navigator.userAgent)
  const deviceDimensions = `${window.innerWidth}x${window.innerHeight}`
  const browserId = await getBrowserId()
  const localTime = new Date().toString()
  const userPreferences = {
    reducedData: matchMedia('(prefers-reduced-data: reduce)').matches,
    reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
    darkColorScheme: matchMedia('(prefers-color-scheme: dark)').matches,
    lightColorScheme: matchMedia('(prefers-color-scheme: light)').matches,
    moreContrast: matchMedia('(prefers-contrast: more)').matches,
  }

  return {
    errorType,
    url,
    language,
    allLanguages,
    browserInfo,
    deviceDimensions,
    browserId,
    localTime,
    userPreferences,
    extraInfo: {
      ...config.staticInfo,
      ...extraInfo,
    },
  }
}
