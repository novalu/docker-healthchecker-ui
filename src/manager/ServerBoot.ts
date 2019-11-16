import {inject, injectable} from "inversify";
import express from "express";
import TYPES from "../di/types";
import {DashboardController} from "../routes/dashboard/DashboardController";
import {Logger} from "../utils/log/Logger";
import * as path from "path";
import * as http from "http";
import serveStatic from "serve-static";
import favicon from "serve-favicon";
import {Configuration} from "../model/Configuration";

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

    private addServerErrorCallback(server, configuration: Configuration) {
        server.on("error", (error: any) => {
            if (error.syscall !== "listen") {
                throw error;
            }
            switch (error.code) {
                case "EACCES":
                    this.logger.fatal(`Port ${configuration.port} requires elevated privileges`);
                    process.exit(1);
                    break;
                case "EADDRINUSE":
                    this.logger.fatal(`Port ${configuration.port} is already in use`);
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
        this.expressApp.set("views", path.join(__dirname, "../../src/routes"));
        this.expressApp.use(serveStatic(path.join(__dirname, "../../public/")));
        this.expressApp.use(favicon(path.join(__dirname, "../../public/", "images/favicon.ico")));
        this.expressApp.set("view engine", "pug");
        this.expressApp.locals.pretty = true;
        this.expressApp.use("/", this.dashboardController.router);
    }

    private async postStart(configuration: Configuration) {
        this.logger.info(`Docker Healthchecker UI server listening at ${configuration.port}.`);
    }

    public async startServer(configuration: Configuration): Promise<boolean> {
        this.dashboardController.images = configuration.images;

        await this.createExpressApp(configuration.port);
        const server = http.createServer(this.expressApp);
        this.addListenCallback(server, async () => await this.postStart(configuration));
        this.addServerErrorCallback(server, configuration);
        server.listen(configuration.port);
        return true;
    }

}

export { ServerBoot }