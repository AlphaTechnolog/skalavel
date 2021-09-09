export interface IGlobal {
  _baseState: object
  set<V>(k: string, v: V): object
  delete(k: string): object
  fetch<V>(k: string): V
  fetchall(): object
}
