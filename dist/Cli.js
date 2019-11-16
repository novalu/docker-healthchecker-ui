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
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const inversify_1 = require("inversify");
const types_1 = __importDefault(require("./di/types"));
const ServerBoot_1 = require("./manager/ServerBoot");
const Configuration_1 = require("./model/Configuration");
const ConfigurationValidator_1 = require("./utils/ConfigurationValidator");
let Cli = class Cli {
    constructor(serverBoot, configurationValidator, logger) {
        this.serverBoot = serverBoot;
        this.configurationValidator = configurationValidator;
        this.logger = logger;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            const argv = yargs_1.default
                .help("h")
                .alias("h", "help")
                //.group("image", "Main:")
                .alias("i", "image")
                .describe("image", "Docker image to check. Could be defined more times.")
                .array("image")
                .string("image")
                .demandOption("image", "At least one image is required")
                .alias("p", "port")
                .describe("port", "Port, on which will server run")
                .number("port")
                .default("port", 8080)
                .fail((msg, err) => {
                console.error(msg);
                process.exit(1);
            })
                .argv;
            const images = argv.image;
            const configuration = new Configuration_1.Configuration(images, argv.port);
            const validateResult = yield this.configurationValidator.check(configuration);
            if (validateResult) {
                return this.serverBoot.startServer(configuration);
            }
        });
    }
};
Cli = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.default.ServerBoot)),
    __param(1, inversify_1.inject(types_1.default.ConfigurationValidator)),
    __param(2, inversify_1.inject(types_1.default.Logger)),
    __metadata("design:paramtypes", [ServerBoot_1.ServerBoot,
        ConfigurationValidator_1.ConfigurationValidator, Object])
], Cli);
exports.Cli = Cli;
//# sourceMappingURL=Cli.js.map