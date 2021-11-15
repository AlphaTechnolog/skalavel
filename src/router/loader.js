"use strict";
exports.__esModule = true;
exports.RouteLoader = void 0;
var __1 = require("../");
var RouteLoader = /** @class */ (function () {
    function RouteLoader(router) {
        this.router = router;
    }
    RouteLoader.prototype.load = function (config, routes) {
        for (var _i = 0, routes_1 = routes; _i < routes_1.length; _i++) {
            var route = routes_1[_i];
            this.router[route.method](config.prefix + route.address, (0, __1.controllerLoader)(
            // @ts-ignore
            config.controller, route.endpoint));
        }
    };
    return RouteLoader;
}());
exports.RouteLoader = RouteLoader;
