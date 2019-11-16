"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const inversify_1 = require("inversify");
const express_1 = __importDefault(require("express"));
const types_1 = __importDefault(require("../di/types"));
const DashboardController_1 = require("../routes/dashboard/DashboardController");
const path = __importStar(require("path"));
const http = __importStar(require("http"));
const serve_static_1 = __importDefault(require("serve-static"));
let ServerBoot = class ServerBoot {
    constructor(dashboardController, logger) {
        this.dashboardController = dashboardController;
        this.logger = logger;
        this.PORT = 8080;
    }
    addListenCallback(server, callback) {
        server.on("listening", () => __awaiter(this, void 0, void 0, function* () {
            yield callback();
        }));
    }
    addServerErrorCallback(server) {
        server.on("error", (error) => {
            if (error.syscall !== "listen") {
                throw error;
            }
            const port = server.address().port;
            switch (error.code) {
                case "EACCES":
                    this.logger.fatal(`Port ${port} requires elevated privileges`);
                    process.exit(1);
                    break;
                case "EADDRINUSE":
                    this.logger.fatal(`Port ${port} is already in use`);
                    process.exit(1);
                    break;
                default:
                    throw error;
            }
        });
    }
    createExpressApp(port) {
        return __awaiter(this, void 0, void 0, function* () {
            this.expressApp = express_1.default();
            this.expressApp.set("port", port);
            this.expressApp.set("views", path.join(__dirname, "../../src/routes"));
            this.expressApp.use(serve_static_1.default(path.join(__dirname, "../../public/")));
            //const faviconPath = path.join(__dirname, "../public/", "images/favicon.ico"); // TODO
            //this.expressApp.use(favicon(faviconPath));
            this.expressApp.set("view engine", "pug");
            this.expressApp.locals.pretty = true;
            this.expressApp.use("/", this.dashboardController.router);
        });
    }
    postStart() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info(`Server listening at ${this.PORT}`);
        });
    }
    startServer() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.createExpressApp(this.PORT);
            const server = http.createServer(this.expressApp);
            this.addListenCallback(server, () => __awaiter(this, void 0, void 0, function* () { return yield this.postStart(); }));
            this.addServerErrorCallback(server);
            server.listen(this.PORT);
            return true;
        });
    }
};
ServerBoot = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.default.DashboardController)),
    __param(1, inversify_1.inject(types_1.default.Logger)),
    __metadata("design:paramtypes", [DashboardController_1.DashboardController, Object])
], ServerBoot);
exports.ServerBoot = ServerBoot;
//# sourceMappingURL=ServerBoot.js.map