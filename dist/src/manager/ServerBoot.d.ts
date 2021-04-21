import { DashboardController } from "../routes/dashboard/DashboardController";
import { Logger } from "../utils/log/Logger";
import { UiFileConfiguration } from "../model/UiFileConfiguration";
import { UiPlainConfiguration } from "../model/UiPlainConfiguration";
import Koa from "koa";
declare class ServerBoot {
    private dashboardController;
    logger: Logger;
    koa: Koa;
    constructor(dashboardController: DashboardController, logger: Logger);
    private addListenCallback;
    private addServerErrorCallback;
    createApp(port: number): Promise<void>;
    private installRoutes;
    private postStart;
    startServer(conf: UiFileConfiguration | UiPlainConfiguration): Promise<boolean>;
}
export { ServerBoot };
