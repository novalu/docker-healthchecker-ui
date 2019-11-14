#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const container_1 = __importDefault(require("./di/container"));
const types_1 = __importDefault(require("./di/types"));
const pretty_error_1 = __importDefault(require("pretty-error"));
const http = __importStar(require("http"));
const SignaleLogger_1 = require("./utils/log/impl/SignaleLogger");
const PORT = 8080;
function addListenCallback(server, startCallback) {
    server.on("listening", () => __awaiter(this, void 0, void 0, function* () {
        yield startCallback();
    }));
}
function addServerErrorCallback(server, app) {
    server.on("error", (error) => {
        if (error.syscall !== "listen") {
            throw error;
        }
        const port = server.address().port;
        switch (error.code) {
            case "EACCES":
                app.logger.fatal(`Port ${port} requires elevated privileges`);
                process.exit(1);
                break;
            case "EADDRINUSE":
                app.logger.fatal(`Port ${port} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    });
}
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = container_1.default.get(types_1.default.Cli);
        yield app.init(PORT);
        const appServer = http.createServer(app.expressApp);
        addListenCallback(appServer, () => __awaiter(this, void 0, void 0, function* () {
            app.logger.info(`Server listening`);
            yield app.start();
        }));
        addServerErrorCallback(appServer, app);
        appServer.listen(PORT);
        return app;
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    let app;
    try {
        container_1.default.bind(types_1.default.Logger).to(SignaleLogger_1.SignaleLogger);
        app = yield start();
    }
    catch (err) {
        const msg = "Cannot start application";
        if (app) {
            app.logger.fatal(msg, err);
        }
        else {
            const pe = new pretty_error_1.default();
            // tslint:disable-next-line:no-console
            console.error(`${msg}, error: ${pe.render(err)}`);
        }
    }
}))();
//# sourceMappingURL=mainCli.js.map