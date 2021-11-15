"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.env = exports.Env = void 0;
var index_1 = require("../index");
var dotenv = require("dotenv");
var Env = /** @class */ (function () {
    function Env() {
    }
    Env.prototype.parse = function (verbose) {
        var _a;
        if (verbose === void 0) { verbose = false; }
        var env = dotenv.config({ path: ".env" }).parsed;
        if (!env) {
            throw new Error("[Skalavel Environment]: Cannot get the parsed environment from dotenv");
        }
        index_1.global.set("environment", {});
        for (var _i = 0, _b = Object.entries(env); _i < _b.length; _i++) {
            var _c = _b[_i], parsed = _c[0], parsedValue = _c[1];
            if (verbose === true) {
                index_1.log.info("[Skalavel Environment]: Parsed " + parsed + " (" + parsedValue + "), adding to global state...");
            }
            index_1.global.set("environment", __assign(__assign({}, index_1.global.fetch("environment")), (_a = {}, _a[parsed] = parsedValue, _a)));
        }
    };
    Env.prototype.getParsedValue = function (k) {
        return index_1.global.fetch("environment")[k];
    };
    return Env;
}());
exports.Env = Env;
exports.env = new Env();
