export type ITaskConstructor = new () => ITask

export interface ITask {
  meta(): void | Promise<void>
  run(): any | Promise<any>
}
