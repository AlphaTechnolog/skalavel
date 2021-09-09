export interface BaseMessageData {
  message: string
  exit?: boolean
}

export type LogFunction = (message: string) => void

export interface ILog {
  baseMessage: (data: BaseMessageData) => void
  success: LogFunction
  error: LogFunction
  warning: LogFunction
  info: LogFunction
}
