import {IRegister, IRouter, RouteCallback} from './interfaces'

export class Router implements IRouter {
  _register?: IRegister[] = []

  _createRoute(method: string, url: string, callback: RouteCallback): void {
    if (!this._register) {
      throw new Error('Cannot set into this._register')
    }

    this._register.push({
      method,
      url,
      callback,
    })
  }

  get(url: string, callback: RouteCallback): void {
    this._createRoute('get', url, callback)
  }

  post(url: string, callback: RouteCallback): void {
    this._createRoute('post', url, callback)
  }

  put(url: string, callback: RouteCallback): void {
    this._createRoute('put', url, callback)
  }

  delete(url: string, callback: RouteCallback): void {
    this._createRoute('delete', url, callback)
  }
}
