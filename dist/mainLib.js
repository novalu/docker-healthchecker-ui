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
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const container_1 = __importDefault(require("./di/container"));
const types_1 = __importDefault(require("./di/types"));
const ConsoleLogger_1 = require("./utils/log/impl/ConsoleLogger");
const Configuration_1 = require("./model/Configuration");
exports.Configuration = Configuration_1.Configuration;
const startHealthcheckerUiServer = function startHealthcheckerUiServer(configuration) {
    return __awaiter(this, void 0, void 0, function* () {
        container_1.default.bind(types_1.default.Logger).to(ConsoleLogger_1.ConsoleLogger).inSingletonScope();
        const lib = container_1.default.get(types_1.default.Lib);
        return yield lib.start(configuration);
    });
};
exports.startHealthcheckerUiServer = startHealthcheckerUiServer;
//# sourceMappingURL=mainLib.js.map