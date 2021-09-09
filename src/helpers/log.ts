import {BaseMessageData, ILog} from './interfaces'
import 'colors'

export class Log implements ILog {
  baseMessage({message, exit}: BaseMessageData): void {
    if (!exit) {
      exit = false
    }

    console.log(message)

    if (exit) {
      process.exit(1)
    }
  }

  success(message: string): void {
    this.baseMessage({
      message: `[S]: ${message}`.green,
    })
  }

  error(message: string): void {
    this.baseMessage({
      message: `[E]: ${message}`.red,
      exit: true,
    })
  }

  warning(message: string): void {
    this.baseMessage({
      message: `[W]: ${message}`.yellow,
    })
  }

  info(message: string): void {
    this.baseMessage({
      message: `[I]: ${message}`.blue,
    })
  }
}

export const log: Log = new Log()
