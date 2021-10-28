import { IRenderer } from "./interfaces";
import * as path from "path";
import * as fs from "fs";

export class Renderer implements IRenderer {
  prefixpath: string;

  constructor() {
    this.prefixpath = "/";
  }

  setViewPrefix(prefixpath: string): void {
    this.prefixpath = prefixpath;
  }

  getRendered(viewpath: string, context: Record<string, any>): string {
    let content: string = fs
      .readFileSync(path.join(this.prefixpath, viewpath))
      .toString();
    for (const [key, val] of Object.entries(context)) {
      content = content.replace(new RegExp(`~${key}~`, "g"), val);
    }

    return content;
  }
}

export const renderer: IRenderer = new Renderer();
