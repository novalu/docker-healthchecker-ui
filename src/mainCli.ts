#!/usr/bin/env node

import "reflect-metadata";
import container from "./di/container";
import TYPES from "./di/types";
import PrettyError from "pretty-error";
import {Cli} from "./Cli";
import {Logger} from "./utils/log/Logger";
import {NoOpLogger} from "./utils/log/impl/NoOpLogger";
import * as http from "http";
import {SignaleLogger} from "./utils/log/impl/SignaleLogger";

const PORT = 8080;

function addListenCallback(server, startCallback: () => void) {
    server.on("listening", async () => {
        await startCallback();
    });
}

function addServerErrorCallback(server, app: Cli) {
    server.on("error", (error: any) => {
        if (error.syscall !== "listen") {
            throw error;
        }
        const port = server.address().port;
        switch (error.code) {
            case "EACCES":
                app.logger.fatal(`Port ${port} requires elevated privileges`);
                process.exit(1);
                break;
            case "EADDRINUSE":
                app.logger.fatal(`Port ${port} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    });
}

async function start(): Promise<Cli> {
    const app = container.get<Cli>(TYPES.Cli);
    await app.init(PORT);
    const appServer = http.createServer(app.expressApp);
    addListenCallback(appServer, async () => {
        app.logger.info(`Server listening`);
        await app.start();
    });
    addServerErrorCallback(appServer, app);
    appServer.listen(PORT);
    return app;
}

(async () => {
    let app;
    try {
        container.bind<Logger>(TYPES.Logger).to(SignaleLogger);
        app = await start();
    } catch (err) {
        const msg = "Cannot start application";
        if (app) {
            app.logger.fatal(msg, err);
        } else {
            const pe = new PrettyError();
            // tslint:disable-next-line:no-console
            console.error(`${msg}, error: ${pe.render(err)}`);
        }
    }
})();