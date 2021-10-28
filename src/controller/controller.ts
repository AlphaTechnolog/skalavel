import { Request } from "express";

import {
  IControllerRegister,
  IController,
  IControllerConstructor,
} from "./interfaces";

export const Controller: IControllerConstructor = class Controller
  implements IController
{
  _register: IControllerRegister;
  req: Request;

  constructor(req: Request) {
    this.req = req;
    this._register = {
      res: "",
      headers: { "Content-Type": "text/html" },
      statuscode: 200,
    };
  }

  _rawRes(response: any, headers: any, statuscode: number): void {
    this._register.res = response;
    this._register.headers = headers;
    this._register.statuscode = statuscode;
  }

  htmlRes(response: string, statuscode: number = 200): void {
    this._rawRes(
      response,
      {
        "Content-Type": "text/html",
      },
      statuscode
    );
  }

  jsonRes(response: any, statuscode: number = 200): void {
    this._rawRes(
      JSON.stringify(response),
      {
        "Content-Type": "application/json",
      },
      statuscode
    );
  }

  redirect(url: string): void {
    this._rawRes("", { location: url }, 302);
  }
};
