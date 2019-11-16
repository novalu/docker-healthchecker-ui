"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
let ConsoleLogger = class ConsoleLogger {
    logExtra(op, extra) {
        if (extra instanceof Error) {
            op(this.pe.render(extra));
        }
        else {
            op(extra);
        }
    }
    debug(body, extra) {
        console.log(body);
        if (extra)
            this.logExtra((extraParam) => console.log(extraParam), extra);
    }
    error(body, extra) {
        console.log(body);
        if (extra)
            this.logExtra((extraParam) => console.log(extraParam), extra);
    }
    info(body, extra) {
        console.log(body);
        if (extra)
            this.logExtra((extraParam) => console.log(extraParam), extra);
    }
    trace(body, extra) {
        console.log(body);
        if (extra)
            this.logExtra((extraParam) => console.log(extraParam), extra);
    }
    warn(body, extra) {
        console.log(body);
        if (extra)
            this.logExtra((extraParam) => console.log(extraParam), extra);
    }
    fatal(body, extra) {
        console.log(body);
        if (extra)
            this.logExtra((extraParam) => console.log(extraParam), extra);
    }
};
ConsoleLogger = __decorate([
    inversify_1.injectable()
], ConsoleLogger);
exports.ConsoleLogger = ConsoleLogger;
//# sourceMappingURL=ConsoleLogger.js.map