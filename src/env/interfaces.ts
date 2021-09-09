export interface IEnv {
  parse(verbose: boolean): void
  getParsedValue<V>(k: string): V
}
