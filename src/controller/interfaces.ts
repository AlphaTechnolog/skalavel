export interface IControllerRegister {
	res: string;
	statuscode: number;
	headers: any;
}

export interface IControllerConstructor {
	new(): IController;
}

export interface IController {
	_register: IControllerRegister;
	_rawRes: (response: any, headers: any, statuscode: number) => void;
	htmlRes: (response: string, statuscode?: number) => void;
	jsonRes: (response: any, statuscode?: number) => void;
	run: () => void;
}
