import * as http from 'http'
import {IRouter, IRegister} from '../router/interfaces'
import {IController} from '../controller/interfaces'
import {BreakException} from '../helpers'

export class RouteGenerator {
  router: IRouter

  constructor(router: IRouter) {
    this.router = router
  }

  generateRoutes(req: http.IncomingMessage, res: http.ServerResponse) {
    if (!this.router._register) {
      throw new Error('Cannot get the _register from the router')
    }

    try {
      this.router._register.forEach(({url, method, callback}: IRegister): void => {
        const reqUrl: string | undefined = req.url

        if (!reqUrl) {
          throw new Error('Cannot get the url from the client socket')
        }

        // Appending the / in the base router url
        if (url[url.length - 1] !== '/' && method === 'get') {
          url += '/'
        }

        // If not have the last / in `req.url` redirecting to the route with the last /
        if (
          reqUrl[reqUrl.length - 1] !== '/' &&
          reqUrl + '/' === url &&
          method === 'get'
        ) {
          res.statusCode = 302
          res.setHeader('location', url)
          res.end('')
          throw BreakException
        }

        if (reqUrl === url && req.method?.toLowerCase() === method) {
          req.setEncoding('utf-8')
          req.on('data', (chunk): void => {
            // @ts-ignore
            req.body = JSON.parse(chunk)
          })
          req.on('end', (): void => {
            const controller: IController = callback(req, res)
            const {_register} = controller
            res.statusCode = _register.statuscode
            for (const [name, value] of Object.entries(_register.headers)) {
              res.setHeader(name as string, value as string)
            }

            res.end(_register.res)
          })
        }
      })
    } catch (err) {
      if (err !== BreakException) {
        throw err
      }
    }
  }
}
