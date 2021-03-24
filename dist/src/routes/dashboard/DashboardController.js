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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const inversify_1 = require("inversify");
const docker_healthchecker_1 = require("docker-healthchecker");
const DashboardData_1 = require("./model/DashboardData");
const lodash = __importStar(require("lodash"));
const ContainerView_1 = require("./model/ContainerView");
let DashboardController = class DashboardController {
    serve(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const containers = yield docker_healthchecker_1.containersHealth(this.uiConfiguration);
            const containersViews = lodash.map(containers, (container) => {
                return new ContainerView_1.ContainerView(container.alias, container.state.text, container.state.color);
            });
            const view = "dashboard/page/themes/dashboardViewPlain";
            const data = new DashboardData_1.DashboardData(containersViews);
            yield ctx.render(view, data);
        });
    }
    install(router, uiConfiguration) {
        this.router = router;
        this.uiConfiguration = uiConfiguration;
        router.get("/", (ctx, next) => __awaiter(this, void 0, void 0, function* () {
            yield this.serve(ctx);
        }));
    }
};
DashboardController = __decorate([
    inversify_1.injectable()
], DashboardController);
exports.DashboardController = DashboardController;
//# sourceMappingURL=DashboardController.js.map