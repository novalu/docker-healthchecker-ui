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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const express = __importStar(require("express"));
const WebHandler_1 = require("../../utils/WebHandler");
const types_1 = __importDefault(require("../../di/types"));
const docker_healthchecker_1 = require("docker-healthchecker");
const DashboardData_1 = require("./model/DashboardData");
const lodash = __importStar(require("lodash"));
const ContainerView_1 = require("./model/ContainerView");
let DashboardController = class DashboardController {
    constructor(webHandler) {
        this.webHandler = webHandler;
        this.router = express.Router();
        this.router.get("/", this.webHandler.await((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const containers = yield docker_healthchecker_1.containersHealth(this.uiConfiguration);
            const containersViews = lodash.map(containers, (container) => {
                return new ContainerView_1.ContainerView(container.image, container.state.text, container.state.color);
            });
            const view = "dashboard/page/themes/dashboardViewPlain";
            res.render(view, new DashboardData_1.DashboardData(containersViews));
        })));
    }
};
DashboardController = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.default.WebHandler)),
    __metadata("design:paramtypes", [WebHandler_1.WebHandler])
], DashboardController);
exports.DashboardController = DashboardController;
//# sourceMappingURL=DashboardController.js.map