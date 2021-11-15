import express, { Express, Request, Response } from "express";
import { IRouter } from "../router/interfaces";
import { ITaskConstructor } from "../tasks/interfaces";
import { IServer } from "./interfaces";
import { RouteGenerator } from "../router-generator";

export class Server implements IServer {
  server?: Express;
  router?: IRouter;
  tasks?: ITaskConstructor[];

  setRouter(router: IRouter): void {
    this.router = router;
  }

  setTasks(tasks: ITaskConstructor[]): void {
    this.tasks = tasks;
  }

  _createServer(): void {
    this.server = express();
    this.server.set("json spaces", 2);
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
    if (!this.router) {
      this.server.use((_req: Request, res: Response): void => {
        res.status(500).json({
          error: true,
          message: "The server does not provide any router",
        });
      });

      return;
    }

    const routeGenerator = new RouteGenerator(this.router);
    routeGenerator.generateRoutes(this.server);
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
      throw new Error("Cannot create the server");
    }

    this.server.listen(port, callback);
  }
}
