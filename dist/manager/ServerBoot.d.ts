import express from "express";
import { DashboardController } from "../routes/dashboard/DashboardController";
import { Logger } from "../utils/log/Logger";
declare class ServerBoot {
    private dashboardController;
    logger: Logger;
    expressApp: express.Application;
    constructor(dashboardController: DashboardController, logger: Logger);
    private readonly PORT;
    private addListenCallback;
    private addServerErrorCallback;
    createExpressApp(port: number): Promise<void>;
    private postStart;
    startServer(): Promise<boolean>;
}
export { ServerBoot };
