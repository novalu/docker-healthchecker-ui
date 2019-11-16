import {inject, injectable} from "inversify";
import express from "express";
import TYPES from "../di/types";
import {DashboardController} from "../routes/dashboard/DashboardController";
import {Logger} from "../utils/log/Logger";
import * as path from "path";
import * as http from "http";
import serveStatic from "serve-static";

@injectable()
class ServerBoot {

    public expressApp: express.Application;

    constructor(
        @inject(TYPES.DashboardController) private dashboardController: DashboardController,
        @inject(TYPES.Logger) public logger: Logger
    ) {}

    private readonly PORT = 8080;

    private addListenCallback(server, callback: () => void) {
        server.on("listening", async () => {
            await callback();
        });
    }

    private addServerErrorCallback(server) {
        server.on("error", (error: any) => {
            if (error.syscall !== "listen") {
                throw error;
            }
            const port = server.address().port;
            switch (error.code) {
                case "EACCES":
                    this.logger.fatal(`Port ${port} requires elevated privileges`);
                    process.exit(1);
                    break;
                case "EADDRINUSE":
                    this.logger.fatal(`Port ${port} is already in use`);
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
        this.expressApp.set("views", path.join(__dirname, "../src/routes"));
        this.expressApp.use(serveStatic(path.join(__dirname, "../public/")));
        //const faviconPath = path.join(__dirname, "../public/", "images/favicon.ico"); // TODO
        //this.expressApp.use(favicon(faviconPath));
        this.expressApp.set("view engine", "pug");
        this.expressApp.locals.pretty = true;
        this.expressApp.use("/", this.dashboardController.router);
    }

    private async postStart() {
        this.logger.info(`Server listening at ${this.PORT}`);
    }

    public async startServer(): Promise<boolean> {
        await this.createExpressApp(this.PORT);
        const server = http.createServer(this.expressApp);
        this.addListenCallback(server, async () => await this.postStart());
        this.addServerErrorCallback(server);
        server.listen(this.PORT);
        return true;
    }

}

export { ServerBoot }