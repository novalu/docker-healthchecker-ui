import yargs from "yargs";
import container from "./di/container";

import { inject, injectable } from "inversify";
import TYPES from "./di/types";
import { Logger } from "./utils/log/Logger";
import * as path from "path";
import {DashboardController} from "./routes/dashboard/DashboardController";
import express from "express";
import serveStatic from "serve-static";

@injectable()
class Cli {
    public expressApp: express.Application;

    constructor(
        @inject(TYPES.DashboardController) private dashboardController: DashboardController,
        @inject(TYPES.Logger) public logger: Logger
    ) {}

    public async init(port: number): Promise<boolean> {
        this.expressApp = express();
        this.expressApp.set("port", port);
        this.expressApp.set(
            "views",
            path.join(__dirname, "../src/routes")
        );
        const publicPath = path.join(__dirname, "../public/");
        //const faviconPath = path.join(__dirname, "../public/", "images/favicon.ico");
        this.expressApp.use(serveStatic(publicPath));
        //this.expressApp.use(favicon(faviconPath));
        this.expressApp.set("view engine", "pug");
        this.expressApp.locals.pretty = true;
        this.expressApp.use("/", this.dashboardController.router);
        return true;
    }

    public async start() {

    }

}

export { Cli }