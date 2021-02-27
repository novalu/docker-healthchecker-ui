import { Container } from "inversify";
import TYPES from "./types";
import { Logger } from "../utils/log/Logger";
import { SignaleLogger } from "../utils/log/impl/SignaleLogger";
import { Test } from "../test/Test";
import {App} from "../App";
import {DashboardController} from "../routes/dashboard/DashboardController";
import {WebHandler} from "../utils/WebHandler";
import {Lib} from "../lib/Lib";
import {ServerBoot} from "../manager/ServerBoot";

const container = new Container();

container
    .bind<Test>(TYPES.Test)
    .to(Test)
    .inSingletonScope();
container
    .bind<App>(TYPES.App)
    .to(App)
    .inSingletonScope();

container
    .bind<ServerBoot>(TYPES.ServerBoot)
    .to(ServerBoot)
    .inSingletonScope();

container
    .bind<DashboardController>(TYPES.DashboardController)
    .to(DashboardController)
    .inSingletonScope();

container
    .bind<WebHandler>(TYPES.WebHandler)
    .to(WebHandler)
    .inSingletonScope();

export default container;