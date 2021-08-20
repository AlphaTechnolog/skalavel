
import {IControllerRegister, IController, IControllerConstructor} from './interfaces'

export const Controller: IControllerConstructor = class Controller implements IController {
	_register: IControllerRegister;

	constructor() {
		this._register = {
			res: '',
			headers: {'Content-Type': 'text/html'},
			statuscode: 200
		}
	}

	_rawRes(response: any, headers: Object, statuscode: number): void {
		this._register.res = JSON.stringify(response);
		this._register.headers = headers;
		this._register.statuscode = statuscode;
	}

	htmlRes(response: string, statuscode: number = 200): void {
		this._rawRes(response, {
			'Content-Type': 'text/html',
		}, statuscode);
	}

	jsonRes(response: any, statuscode: number = 200): void {
		this._rawRes(response, {
			'Content-Type': 'application/json'
		}, statuscode)
	}

	run(): void {
		console.log('ok')
	}
}
