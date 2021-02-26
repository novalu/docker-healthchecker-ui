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
exports.UiPlainConfiguration = exports.UiFileConfiguration = exports.startHealthcheckerUiServer = void 0;
require("reflect-metadata");
const container_1 = __importDefault(require("./di/container"));
const types_1 = __importDefault(require("./di/types"));
const ConsoleLogger_1 = require("./utils/log/impl/ConsoleLogger");
const UiFileConfiguration_1 = require("./model/UiFileConfiguration");
Object.defineProperty(exports, "UiFileConfiguration", { enumerable: true, get: function () { return UiFileConfiguration_1.UiFileConfiguration; } });
const UiPlainConfiguration_1 = require("./model/UiPlainConfiguration");
Object.defineProperty(exports, "UiPlainConfiguration", { enumerable: true, get: function () { return UiPlainConfiguration_1.UiPlainConfiguration; } });
const startHealthcheckerUiServer = function startHealthcheckerUiServer(uiConfiguration) {
    return __awaiter(this, void 0, void 0, function* () {
        container_1.default.bind(types_1.default.Logger).to(ConsoleLogger_1.ConsoleLogger).inSingletonScope();
        const lib = container_1.default.get(types_1.default.Lib);
        return yield lib.start(uiConfiguration);
    });
};
exports.startHealthcheckerUiServer = startHealthcheckerUiServer;
//# sourceMappingURL=mainLib.js.map