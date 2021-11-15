"use strict";
exports.__esModule = true;
exports.global = exports.Global = void 0;
var Global = /** @class */ (function () {
    function Global() {
        this._baseState = {};
    }
    Global.prototype.set = function (k, v) {
        // @ts-ignore
        this._baseState[k] = v;
        return this._baseState;
    };
    Global.prototype.fetchall = function () {
        return this._baseState;
    };
    Global.prototype.fetch = function (k) {
        // @ts-ignore
        if (!this._baseState[k]) {
            throw new Error("Cannot get \"" + k + "\" from your global state");
        }
        // @ts-ignore
        return this._baseState[k];
    };
    Global.prototype["delete"] = function (k) {
        // @ts-ignore
        delete this._baseState[k];
        return this._baseState;
    };
    return Global;
}());
exports.Global = Global;
exports.global = new Global();
