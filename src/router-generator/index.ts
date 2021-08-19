import * as http from 'http';
import { IRouter, IRegister } from '../router/interfaces';

export class RouteGenerator {
  router: IRouter;

  constructor(router: IRouter) {
    this.router = router;
  }

  generateRoutes(req: http.IncomingMessage, res: http.ServerResponse) {
    if (!this.router._register) {
      throw new Error('Cannot get the _register from the router');
    }

    this.router._register.forEach(({ url, method, callback }: IRegister): void => {
      if (req.url === url && req.method?.toLowerCase() === method) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        callback(req, res);
      }
    });
  }
}
