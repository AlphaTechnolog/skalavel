import { Request } from "express";

export interface IControllerRegister {
  res: string;
  statuscode: number;
  headers: any;
}

export type IControllerConstructor = new (req: Request) => IController;

export interface IController {
  req: Request;
  _register: IControllerRegister;
  /**
   * A lifecycle to be executed at create the controller
   */
  created(): void;
  /**
   * Make a http response
   * @param response The response string
   * @param headers The headers object
   * @param statuscode The statuscode of the response
   */
  _rawRes(response: any, headers: any, statuscode: number): void;
  /**
   * Make a configured response to be as html text
   * @param response The response string
   * @param statuscode The statuscode of the response
   */
  htmlRes(response: string, statuscode?: number): void;
  /**
   * Make a response in json format
   * @param response The json object
   * @param statuscode The statuscode of the response
   */
  jsonRes(response: any, statuscode?: number): void;
  /**
   * Redirect to another uri
   * @param url The url to redirect
   */
  redirect(url: string): void;
}
