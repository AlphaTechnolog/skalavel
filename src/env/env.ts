import {IEnv} from './interfaces'
import {log, global} from '../index'
import * as dotenv from 'dotenv'

export class Env implements IEnv {
  parse(verbose: boolean = false): void {
    const {parsed: env} = dotenv.config({path: '.env'})
    if (!env) {
      throw new Error(
        '[Skalavel Environment]: Cannot get the parsed environment from dotenv',
      )
    }
    global.set<object>('environment', {})
    for (const [parsed, parsedValue] of Object.entries(env)) {
      if (verbose === true) {
        log.info(
          `[Skalavel Environment]: Parsed ${parsed} (${parsedValue}), adding to global state...`,
        )
      }
      global.set('environment', {
        ...global.fetch<object>('environment'),
        [parsed]: parsedValue,
      })
    }
  }

  getParsedValue<V>(k: string): V {
    return global.fetch<object>('environment')[k]
  }
}

export const env: Env = new Env()
