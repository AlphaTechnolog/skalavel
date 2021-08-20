import * as http from 'http';
import { IRouter, IRegister } from '../router/interfaces';
import { IController } from '../controller/interfaces';

export class RouteGenerator {
  router: IRouter;

  constructor(router: IRouter) {
    this.router = router;
  }

  generateRoutes(
    req: http.IncomingMessage,
    res: http.ServerResponse,
  ) {
    if (!this.router._register) {
      throw new Error(
        'Cannot get the _register from the router',
      );
    }

    this.router._register.forEach(
      ({ url, method, callback }: IRegister): void => {
        if (
          req.url === url &&
          req.method?.toLowerCase() === method
        ) {
          const controller: IController = callback(req, res);
          const { _register } = controller;
          res.statusCode = _register.statuscode;
          for (const [name, value] of Object.entries(
            _register.headers,
          )) {
            res.setHeader(name as string, value as string);
          }

          res.end(_register.res);
        }
      },
    );
  }
}
