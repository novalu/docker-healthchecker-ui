import {inject, injectable} from "inversify";
import TYPES from "../di/types";
import {DashboardController} from "../routes/dashboard/DashboardController";
import {Logger} from "../utils/log/Logger";
import * as path from "path";
import * as http from "http";
import * as Joi from "@hapi/joi";
import { UiFileConfiguration } from "../model/UiFileConfiguration";
import {UiPlainConfiguration} from "../model/UiPlainConfiguration";
import Koa from "koa";
import Pug from "koa-pug";
import Compress from "koa-compress";
import Favicon from "koa-favicon";
import Serve from "koa-static";
import Mount from "koa-mount";
import Router from "koa-router";
import Helmet from "koa-helmet";

@injectable()
class ServerBoot {

    public koa: Koa;

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

    public async createApp(port: number) {
        this.koa = new Koa();
        const pug = new Pug({
            viewPath: path.join(__dirname, "../../../src/routes"),
            pretty: true
        });
        pug.use(this.koa);
        this.koa.use(Compress());
        this.koa.use(Favicon(path.join(__dirname, "../../public/", "images/favicon.ico")));
        this.koa.use(Mount("/", Serve(path.join(__dirname, "../../public/"))));
        this.koa.use(Helmet());
    }

    private installRoutes() {
        const router: Router = new Router();
        this.dashboardController.install(router);
        this.koa.use(router.routes());
        this.koa.use(router.allowedMethods());
    }

    private async postStart(uiConfiguration: UiFileConfiguration | UiPlainConfiguration) {
        this.logger.info(`Docker Healthchecker UI server listening at ${uiConfiguration.port}.`);
    }

    public async startServer(uiConfiguration: UiFileConfiguration | UiPlainConfiguration): Promise<boolean> {
        this.dashboardController.uiConfiguration = uiConfiguration;

        await this.createApp(uiConfiguration.port);
        this.installRoutes();
        const server = http.createServer(this.koa.callback());
        this.addListenCallback(server, async () => this.postStart(uiConfiguration));
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