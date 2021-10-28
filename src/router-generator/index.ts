import { Express, Request, Response } from "express";
import { IRouter, IRegister } from "../router/interfaces";
import { IController } from "../controller/interfaces";

export class RouteGenerator {
  router: IRouter;

  constructor(router: IRouter) {
    this.router = router;
  }

  generateRoutes(server: Express): void {
    if (!this.router._register) {
      server.use((_req: Request, res: Response): void => {
        res
          .status(500)
          .json("The server does not provide any route for the router");
      });

      return;
    }

    this.router._register.forEach(
      ({ url, method, callback }: IRegister): void => {
        server[method](url, (req: Request, res: Response): void => {
          const controller: IController = callback(req, res);
          const { _register } = controller;
          res.status(_register.statuscode);
          for (const [name, value] of Object.entries(_register.headers)) {
            res.setHeader(name as string, value as string);
          }

          res.end(_register.res);
        });
      }
    );
  }
}
