import { Request, Response } from 'express'
import { IControllerConstructor, IController } from "./interfaces";
import { RouteCallback } from "../router/interfaces";

export const controllerLoader =
  (Controller: IControllerConstructor, method: string): RouteCallback =>
  (req: Request, _res: Response): IController => {
    const controllerInstance: IController = new Controller(req);
    // @ts-ignore
    controllerInstance[method]();
    return controllerInstance;
  };
