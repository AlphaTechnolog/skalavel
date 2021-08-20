import * as http from 'http';
import { IRouter } from '../router/interfaces';
import { ITaskConstructor } from '../tasks/interfaces';
import { IServer } from './interfaces';
import { RouteGenerator } from '../router-generator';

export class Server implements IServer {
  server?: http.Server;
  router?: IRouter;
  tasks?: ITaskConstructor[];

  setRouter(router: IRouter): void {
    this.router = router;
  }

  setTasks(tasks: ITaskConstructor[]): void {
    this.tasks = tasks;
  }

  _createServer(): void {
    this.server = http.createServer((req, res) => {
      if (!this.router) {
        throw new Error(
          'No router detected, you was created a router?',
        );
      }

      const routeGenerator = new RouteGenerator(this.router);
      routeGenerator.generateRoutes(req, res);
    });
  }

  _runTasks(): void {
    if (!this.tasks) {
      return;
    }

    this.tasks.forEach((Task: ITaskConstructor) => {
      const task = new Task();
      task.run();
    });
  }

  listen(port: number, callback: () => void): void {
    this._runTasks();
    this._createServer();

    if (!this.server) {
      throw new Error('Cannot create the server');
    }

    this.server.listen(port, callback);
  }
}
