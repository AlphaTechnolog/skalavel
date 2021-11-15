"use strict";
exports.__esModule = true;
exports.Task = void 0;
var log_1 = require("../helpers/log");
exports.Task = /** @class */ (function () {
    function Task() {
        this.meta();
    }
    Task.prototype.meta = function () {
        //
    };
    Task.prototype.run = function () {
        log_1.log.error("No run method specified for this task");
    };
    return Task;
}());
