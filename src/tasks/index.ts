import { ITask, ITaskConstructor } from './interfaces';
import { log } from '../helpers/log';

export const Task: ITaskConstructor = class Task
  implements ITask
{
  constructor() {
    this.meta();
  }

  meta(): void | Promise<void> {
    //
  }

  run(): any | Promise<any> {
    log.error('No run method specified for this task');
  }
};
