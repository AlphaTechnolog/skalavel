"use strict";
exports.__esModule = true;
exports.Server = void 0;
var express_1 = require("express");
var router_generator_1 = require("../router-generator");
var Server = /** @class */ (function () {
    function Server() {
    }
    Server.prototype.setRouter = function (router) {
        this.router = router;
    };
    Server.prototype.setTasks = function (tasks) {
        this.tasks = tasks;
    };
    Server.prototype._createServer = function () {
        this.server = (0, express_1["default"])();
        this.server.use(express_1["default"].json());
        this.server.use(express_1["default"].urlencoded({ extended: true }));
        if (!this.router) {
            this.server.use(function (_req, res) {
                res.status(500).json({
                    error: true,
                    message: "The server does not provide any router"
                });
            });
            return;
        }
        var routeGenerator = new router_generator_1.RouteGenerator(this.router);
        routeGenerator.generateRoutes(this.server);
    };
    Server.prototype._runTasks = function () {
        if (!this.tasks) {
            return;
        }
        this.tasks.forEach(function (Task) {
            var task = new Task();
            task.run();
        });
    };
    Server.prototype.listen = function (port, callback) {
        this._runTasks();
        this._createServer();
        if (!this.server) {
            throw new Error("Cannot create the server");
        }
        this.server.listen(port, callback);
    };
    return Server;
}());
exports.Server = Server;
