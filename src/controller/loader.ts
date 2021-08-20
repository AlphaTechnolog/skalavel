import * as http from 'http';
import {IControllerConstructor, IController} from './interfaces'
import {RouteCallback} from '../router/interfaces'

export const controllerLoader = (
	Controller: IControllerConstructor,
	method: string
): RouteCallback => (
	req: http.IncomingMessage,
	res: http.ServerResponse
): IController => {
	const controllerInstance: IController = new Controller();
	// @ts-ignore
	controllerInstance[method]();
	return controllerInstance;
}
