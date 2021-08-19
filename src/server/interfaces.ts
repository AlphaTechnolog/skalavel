import * as http from 'http';
import { IRouter } from '../router/interfaces';

export interface IServer {
  server?: http.Server;
  router?: IRouter;
  _createServer: () => void;
  listen: (port: number, callback: () => void) => void;
}
