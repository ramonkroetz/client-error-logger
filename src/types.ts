export type LoggerConfig = {
  /** Enable debug mode */
  debug?: boolean

  /** Disable logging */
  disable?: boolean

  /** Log endpoint URL */
  logEndpoint?: string

  /** Static info that is sent in every log */
  staticInfo?: { [key: string]: string }
}
