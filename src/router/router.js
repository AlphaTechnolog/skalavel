"use strict";
exports.__esModule = true;
exports.Router = void 0;
var Router = /** @class */ (function () {
    function Router() {
        this._register = [];
    }
    Router.prototype._createRoute = function (method, url, callback) {
        if (!this._register) {
            throw new Error("Cannot set into this._register");
        }
        this._register.push({
            method: method,
            url: url,
            callback: callback
        });
    };
    Router.prototype.get = function (url, callback) {
        this._createRoute("get", url, callback);
    };
    Router.prototype.post = function (url, callback) {
        this._createRoute("post", url, callback);
    };
    Router.prototype.put = function (url, callback) {
        this._createRoute("put", url, callback);
    };
    Router.prototype["delete"] = function (url, callback) {
        this._createRoute("delete", url, callback);
    };
    return Router;
}());
exports.Router = Router;
