"use strict";
exports.__esModule = true;
exports.renderer = exports.Renderer = void 0;
var path = require("path");
var fs = require("fs");
var Renderer = /** @class */ (function () {
    function Renderer() {
        this.prefixpath = "/";
    }
    Renderer.prototype.setViewPrefix = function (prefixpath) {
        this.prefixpath = prefixpath;
    };
    Renderer.prototype.getRendered = function (viewpath, context) {
        var content = fs
            .readFileSync(path.join(this.prefixpath, viewpath))
            .toString();
        for (var _i = 0, _a = Object.entries(context); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], val = _b[1];
            content = content.replace(new RegExp("~" + key + "~", "g"), val);
        }
        return content;
    };
    return Renderer;
}());
exports.Renderer = Renderer;
exports.renderer = new Renderer();
