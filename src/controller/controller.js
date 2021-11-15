"use strict";
exports.__esModule = true;
exports.Controller = void 0;
exports.Controller = /** @class */ (function () {
    function Controller(req) {
        this.req = req;
        this._register = {
            res: "",
            headers: { "Content-Type": "text/html" },
            statuscode: 200
        };
    }
    Controller.prototype._rawRes = function (response, headers, statuscode) {
        this._register.res = response;
        this._register.headers = headers;
        this._register.statuscode = statuscode;
    };
    Controller.prototype.htmlRes = function (response, statuscode) {
        if (statuscode === void 0) { statuscode = 200; }
        this._rawRes(response, {
            "Content-Type": "text/html"
        }, statuscode);
    };
    Controller.prototype.jsonRes = function (response, statuscode) {
        if (statuscode === void 0) { statuscode = 200; }
        this._rawRes(JSON.stringify(response), {
            "Content-Type": "application/json"
        }, statuscode);
    };
    Controller.prototype.redirect = function (url) {
        this._rawRes("", { location: url }, 302);
    };
    return Controller;
}());
