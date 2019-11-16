"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const types_1 = __importDefault(require("./types"));
const App_1 = require("../App");
const Cli_1 = require("../Cli");
const DashboardController_1 = require("../routes/dashboard/DashboardController");
const WebHandler_1 = require("../utils/WebHandler");
const Lib_1 = require("../Lib");
const ServerBoot_1 = require("../manager/ServerBoot");
const container = new inversify_1.Container();
container
    .bind(types_1.default.App)
    .to(App_1.App)
    .inSingletonScope();
container
    .bind(types_1.default.Cli)
    .to(Cli_1.Cli)
    .inSingletonScope();
container
    .bind(types_1.default.Lib)
    .to(Lib_1.Lib)
    .inSingletonScope();
container
    .bind(types_1.default.ServerBoot)
    .to(ServerBoot_1.ServerBoot)
    .inSingletonScope();
container
    .bind(types_1.default.DashboardController)
    .to(DashboardController_1.DashboardController)
    .inSingletonScope();
container
    .bind(types_1.default.WebHandler)
    .to(WebHandler_1.WebHandler)
    .inSingletonScope();
exports.default = container;
//# sourceMappingURL=container.js.map