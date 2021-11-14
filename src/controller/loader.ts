import { Request, Response } from "express";
import { IControllerConstructor, IController } from "./interfaces";
import { RouteCallback } from "../router/interfaces";

export const controllerLoader =
  (Controller: IControllerConstructor, method: string): RouteCallback =>
  async (req: Request, _res: Response): Promise<IController> => {
    const controllerInstance: IController = new Controller(req);
    // @ts-ignore
    await controllerInstance[method]();
    return controllerInstance;
  };
