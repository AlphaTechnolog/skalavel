import * as http from 'http';
import { IController } from '../controller/interfaces';

export type RouteCallback = (
  req: http.IncomingMessage,
  res: http.ServerResponse,
) => IController;

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
