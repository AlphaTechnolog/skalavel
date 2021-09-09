import * as http from 'http'
import {IRouter} from '../router/interfaces'
import {ITaskConstructor} from '../tasks/interfaces'

export interface IServer {
  server?: http.Server
  router?: IRouter
  tasks?: ITaskConstructor[]
  _runTasks: () => void
  _createServer: () => void
  listen: (port: number, callback: () => void) => void
}
