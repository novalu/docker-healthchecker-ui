import {inject, injectable} from "inversify";
import express from "express";
import TYPES from "../di/types";
import {DashboardController} from "../routes/dashboard/DashboardController";
import {Logger} from "../utils/log/Logger";
import * as path from "path";
import * as http from "http";
import serveStatic from "serve-static";
import favicon from "serve-favicon";
import * as Joi from "@hapi/joi";
import { UiFileConfiguration } from "../model/UiFileConfiguration";
import {UiPlainConfiguration} from "../model/UiPlainConfiguration";

@injectable()
class ServerBoot {

    public expressApp: express.Application;

    constructor(
        @inject(TYPES.DashboardController) private dashboardController: DashboardController,
        @inject(TYPES.Logger) public logger: Logger
    ) {}

    private addListenCallback(server, callback: () => void) {
        server.on("listening", async () => {
            await callback();
        });
    }

    private addServerErrorCallback(server, uiConfiguration: UiFileConfiguration | UiPlainConfiguration) {
        server.on("error", (error: any) => {
            if (error.syscall !== "listen") {
                throw error;
            }
            switch (error.code) {
                case "EACCES":
                    this.logger.fatal(`Port ${uiConfiguration.port} requires elevated privileges`);
                    process.exit(1);
                    break;
                case "EADDRINUSE":
                    this.logger.fatal(`Port ${uiConfiguration.port} is already in use`);
                    process.exit(1);
                    break;
                default:
                    throw error;
            }
        });
    }

    public async createExpressApp(port: number) {
        this.expressApp = express();
        this.expressApp.set("port", port);
        this.expressApp.use(serveStatic(path.join(__dirname, "../../public/")));
        this.expressApp.use(favicon(path.join(__dirname, "../../public/", "images/favicon.ico")));
        this.expressApp.set("views", path.join(__dirname, "../../../src/routes"));
        console.log(path.join(__dirname, "../../../src/routes"));
        this.expressApp.set("view engine", "pug");
        this.expressApp.locals.pretty = true;
        this.expressApp.use("/", this.dashboardController.router);
    }

    private async postStart(uiConfiguration: UiFileConfiguration | UiPlainConfiguration) {
        this.logger.info(`Docker Healthchecker UI server listening at ${uiConfiguration.port}.`);
    }

    public async startServer(uiConfiguration: UiFileConfiguration | UiPlainConfiguration): Promise<boolean> {
        this.dashboardController.uiConfiguration = uiConfiguration;

        await this.createExpressApp(uiConfiguration.port);
        const server = http.createServer(this.expressApp);
        this.addListenCallback(server, async () => await this.postStart(uiConfiguration));
        this.addServerErrorCallback(server, uiConfiguration);

        const portResult = Joi.number().port().validate(uiConfiguration.port);
        if (portResult.error) {
            throw new Error("Provided port is not valid");
        }
        server.listen(uiConfiguration.port);

        return true;
    }

}

export { ServerBoot }