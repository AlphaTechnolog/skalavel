"use strict";
exports.__esModule = true;
exports.log = exports.Log = void 0;
require("colors");
var Log = /** @class */ (function () {
    function Log() {
    }
    Log.prototype.baseMessage = function (_a) {
        var message = _a.message, exit = _a.exit;
        if (!exit) {
            exit = false;
        }
        console.log(message);
        if (exit) {
            process.exit(1);
        }
    };
    Log.prototype.success = function (message) {
        this.baseMessage({
            message: ("[S]: " + message).green
        });
    };
    Log.prototype.error = function (message) {
        this.baseMessage({
            message: ("[E]: " + message).red,
            exit: true
        });
    };
    Log.prototype.warning = function (message) {
        this.baseMessage({
            message: ("[W]: " + message).yellow
        });
    };
    Log.prototype.info = function (message) {
        this.baseMessage({
            message: ("[I]: " + message).blue
        });
    };
    return Log;
}());
exports.Log = Log;
exports.log = new Log();
