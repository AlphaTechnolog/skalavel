import * as http from 'http';
import { IRouter } from '../router/interfaces';
import { IServer } from './interfaces';
import { RouteGenerator } from '../router-generator';

export class Server implements IServer {
  server?: http.Server;
  router?: IRouter;

  setRouter(router: IRouter) {
    this.router = router;
  }

  _createServer(): void {
    this.server = http.createServer((req, res) => {
      if (!this.router) {
        throw new Error('Cannot get the router from this');
      }

      const routeGenerator = new RouteGenerator(this.router);
      routeGenerator.generateRoutes(req, res);
    });
  }

  listen(port: number, callback: () => void): void {
    this._createServer();

    if (!this.server) {
      throw new Error('Cannot create the server');
    }

    this.server.listen(port, callback);
  }
}
