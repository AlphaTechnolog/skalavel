import * as http from 'http';
import { IServer } from './interfaces';

export class Server implements IServer {
  server?: http.Server;

  constructor() {
    this._createServer();
  }

  _createServer(): void {
    this.server = http.createServer((req, res) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end('<h1>Hello, Skalavel</h1>');
    });
  }

  listen(port: number, callback: () => void): void {
    if (!this.server) {
      throw new Error('Cannot create the server');
    }

    this.server.listen(port, callback);
  }
}
