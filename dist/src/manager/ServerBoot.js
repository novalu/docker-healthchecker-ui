"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerBoot = void 0;
const inversify_1 = require("inversify");
const types_1 = __importDefault(require("../di/types"));
const DashboardController_1 = require("../routes/dashboard/DashboardController");
const path = __importStar(require("path"));
const http = __importStar(require("http"));
const Joi = __importStar(require("@hapi/joi"));
const koa_1 = __importDefault(require("koa"));
const koa_pug_1 = __importDefault(require("koa-pug"));
const koa_compress_1 = __importDefault(require("koa-compress"));
const koa_favicon_1 = __importDefault(require("koa-favicon"));
const koa_static_1 = __importDefault(require("koa-static"));
const koa_mount_1 = __importDefault(require("koa-mount"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa_helmet_1 = __importDefault(require("koa-helmet"));
let ServerBoot = class ServerBoot {
    constructor(dashboardController, logger) {
        this.dashboardController = dashboardController;
        this.logger = logger;
    }
    addListenCallback(server, callback) {
        server.on("listening", () => __awaiter(this, void 0, void 0, function* () {
            yield callback();
        }));
    }
    addServerErrorCallback(server, uiConfiguration) {
        server.on("error", (error) => {
            if (error.syscall !== "listen") {
                throw error;
            }
            switch (error.code) {
                case "EACCES":
                    this.logger.fatal(`Port ${uiConfiguration.port} requires elevated privileges`);
                    process.exit(1);
                    break;
                case "EADDRINUSE":
                    this.logger.fatal(`Port ${uiConfiguration.port} is already in use`);
                    process.exit(1);
                    break;
                default:
                    throw error;
            }
        });
    }
    createApp(port) {
        return __awaiter(this, void 0, void 0, function* () {
            this.koa = new koa_1.default();
            const pug = new koa_pug_1.default({
                viewPath: path.join(__dirname, "../../../src/routes"),
                pretty: true
            });
            pug.use(this.koa);
            this.koa.use(koa_compress_1.default());
            this.koa.use(koa_favicon_1.default(path.join(__dirname, "../../public/", "images/favicon.ico")));
            this.koa.use(koa_mount_1.default("/", koa_static_1.default(path.join(__dirname, "../../public/"))));
            this.koa.use(koa_helmet_1.default({
                contentSecurityPolicy: {
                    directives: {
                        defaultSrc: ["'self'", "'unsafe-inline'"]
                    }
                }
            }));
        });
    }
    installRoutes(uiConfiguration) {
        const router = new koa_router_1.default();
        this.dashboardController.install(router, uiConfiguration);
        this.koa.use(router.routes());
        this.koa.use(router.allowedMethods());
    }
    postStart(uiConfiguration) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info(`Docker Healthchecker UI server listening at ${uiConfiguration.port}.`);
        });
    }
    startServer(uiConfiguration) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.createApp(uiConfiguration.port);
            this.installRoutes(uiConfiguration);
            const server = http.createServer(this.koa.callback());
            this.addListenCallback(server, () => __awaiter(this, void 0, void 0, function* () { return this.postStart(uiConfiguration); }));
            this.addServerErrorCallback(server, uiConfiguration);
            const portResult = Joi.number().port().validate(uiConfiguration.port);
            if (portResult.error) {
                throw new Error("Provided port is not valid");
            }
            server.listen(uiConfiguration.port);
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