import { Request, Response } from "express";
import { IController, IControllerConstructor } from "../controller/interfaces";

export type RouteCallback = (
  req: Request,
  res: Response
) => Promise<IController>;

export type RouteParams = (url: string, callback: RouteCallback) => void;

export interface IRegister {
  method: string;
  url: string;
  callback: RouteCallback;
}

export interface IRouter {
  _register?: IRegister[];
  _createRoute: (method: string, url: string, callback: RouteCallback) => void;
  get: RouteParams;
  post: RouteParams;
  put: RouteParams;
  delete: RouteParams;
}

export interface IRouteLoaderConfig {
  prefix: string;
  controller: IControllerConstructor;
}

export interface IRouteLoaderRoute {
  method: string;
  address: string;
  endpoint: string;
}
