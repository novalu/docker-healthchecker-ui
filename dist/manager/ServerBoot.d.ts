import express from "express";
import { DashboardController } from "../routes/dashboard/DashboardController";
import { Logger } from "../utils/log/Logger";
import { Configuration } from "../model/Configuration";
declare class ServerBoot {
    private dashboardController;
    logger: Logger;
    expressApp: express.Application;
    constructor(dashboardController: DashboardController, logger: Logger);
    private addListenCallback;
    private addServerErrorCallback;
    createExpressApp(port: number): Promise<void>;
    private postStart;
    startServer(configuration: Configuration): Promise<boolean>;
}
export { ServerBoot };
