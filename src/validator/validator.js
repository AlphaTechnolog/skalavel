"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.Validator = void 0;
var Validator = /** @class */ (function () {
    function Validator(data, rules) {
        this.validationStatus = true;
        this.validationErrors = {};
        this.data = data;
        this.rules = rules;
        this.validate();
    }
    Validator.prototype.getSplittedRules = function (valueRules) {
        return valueRules.split('|');
    };
    Validator.prototype.ok = function () {
        return this.validationStatus;
    };
    Validator.prototype.getErrors = function () {
        return this.validationErrors;
    };
    Validator.prototype.validate = function () {
        for (var _i = 0, _a = Object.entries(this.rules); _i < _a.length; _i++) {
            var _b = _a[_i], ruleKey = _b[0], rule = _b[1];
            var splittedRules = this.getSplittedRules(rule);
            if (!this.data[ruleKey] && splittedRules.indexOf('required') !== -1) {
                // The data does not have the required rule
                this.validationStatus = false;
                if (!this.validationErrors[ruleKey]) {
                    this.validationErrors[ruleKey] = [];
                }
                this.validationErrors[ruleKey].push(ruleKey + " is required");
                continue;
            }
            for (var _c = 0, splittedRules_1 = splittedRules; _c < splittedRules_1.length; _c++) {
                var stringRule = splittedRules_1[_c];
                if (stringRule !== 'required' && stringRule !== 'nullable') {
                    // Make the validation
                    var validator = require("./rules/" + stringRule + ".rule");
                    var splittedRule = stringRule.split(':');
                    var argv = [];
                    if (splittedRule.length > 1) {
                        argv = splittedRule[1].split(',');
                    }
                    var validated = validator.apply(void 0, __spreadArray([this.data[ruleKey]], argv, false));
                    if (!validated) {
                        this.validationStatus = false;
                        if (!this.validationErrors[ruleKey]) {
                            this.validationErrors[ruleKey] = [];
                        }
                        this.validationErrors[ruleKey].push(ruleKey + " does not pass the test " + stringRule);
                    }
                }
            }
        }
    };
    return Validator;
}());
exports.Validator = Validator;
