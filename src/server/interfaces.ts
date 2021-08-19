import * as http from 'http';

export interface IServer {
  server?: http.Server;
  _createServer: () => void;
  listen: (port: number) => void;
}
