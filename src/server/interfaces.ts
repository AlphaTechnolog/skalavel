import { Express } from "express";
import { IRouter } from "../router/interfaces";
import { ITaskConstructor } from "../tasks/interfaces";

export interface IServer {
  server?: Express;
  router?: IRouter;
  tasks?: ITaskConstructor[];
  _runTasks: () => void;
  _createServer: () => void;
  listen: (port: number, callback: () => void) => void;
}
