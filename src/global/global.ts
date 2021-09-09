import {IGlobal} from './interfaces'

export class Global implements IGlobal {
  _baseState: object = {}

  set<V>(k: string, v: V): object {
    // @ts-ignore
    this._baseState[k] = v
    return this._baseState
  }

  fetchall(): object {
    return this._baseState
  }

  fetch<V>(k: string): V {
    // @ts-ignore
    if (!this._baseState[k]) {
      throw new Error(`Cannot get "${k}" from your global state`)
    }

    // @ts-ignore
    return this._baseState[k]
  }

  delete(k: string): object {
    // @ts-ignore
    delete this._baseState[k]
    return this._baseState
  }
}

export const global: Global = new Global()
