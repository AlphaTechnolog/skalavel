export interface IRenderer {
  prefixpath: string;
  setViewPrefix(prefixpath: string): void;
  getRendered(viewpath: string, context: Record<string, any>): string;
}
