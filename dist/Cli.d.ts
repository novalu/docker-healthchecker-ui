import { Logger } from "./utils/log/Logger";
import { DashboardController } from "./routes/dashboard/DashboardController";
import express from "express";
declare class Cli {
    private dashboardController;
    logger: Logger;
    expressApp: express.Application;
    constructor(dashboardController: DashboardController, logger: Logger);
    init(port: number): Promise<boolean>;
    start(): Promise<void>;
}
export { Cli };
