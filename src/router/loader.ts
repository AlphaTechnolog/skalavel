import {
  IRouteLoaderConfig,
  IRouteLoaderRoute,
  IRouter
} from './interfaces'

import { controllerLoader } from '../'

export class RouteLoader {
  router!: IRouter

  constructor (router: IRouter) {
    this.router = router
  }

  load (config: IRouteLoaderConfig, routes: IRouteLoaderRoute[]): void {
    for (const route of routes) {
      this.router[route.method](config.prefix + route.address, controllerLoader(
        // @ts-ignore
        config.controller,
        route.endpoint,
      ))
    }
  }
}
