import express from "express";
import { DashboardController } from "../routes/dashboard/DashboardController";
import { Logger } from "../utils/log/Logger";
import { UiFileConfiguration } from "../model/UiFileConfiguration";
import { UiPlainConfiguration } from "../model/UiPlainConfiguration";
declare class ServerBoot {
    private dashboardController;
    logger: Logger;
    expressApp: express.Application;
    constructor(dashboardController: DashboardController, logger: Logger);
    private addListenCallback;
    private addServerErrorCallback;
    createExpressApp(port: number): Promise<void>;
    private postStart;
    startServer(uiConfiguration: UiFileConfiguration | UiPlainConfiguration): Promise<boolean>;
}
export { ServerBoot };
