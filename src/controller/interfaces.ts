import { Request } from 'express'

export interface IControllerRegister {
  res: string;
  statuscode: number;
  headers: any;
}

export type IControllerConstructor = new (
  req: Request
) => IController;

export interface IController {
  req: Request;
  _register: IControllerRegister;
  _rawRes(response: any, headers: any, statuscode: number): void;
  htmlRes(response: string, statuscode?: number): void;
  jsonRes(response: any, statuscode?: number): void;
  redirect(url: string): void;
}
