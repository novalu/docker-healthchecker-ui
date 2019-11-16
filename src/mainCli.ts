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
import {ConsoleLogger} from "./utils/log/impl/ConsoleLogger";

async function startCli(): Promise<Cli> {
    container.bind<Logger>(TYPES.Logger).to(ConsoleLogger).inSingletonScope();

    const cli = container.get<Cli>(TYPES.Cli);
    const started = await cli.start();
    return started ? cli : undefined;
}

(async () => {
    let cli;
    try {
        cli = await startCli();
    } catch (err) {
        const msg = "Cannot start application";
        if (cli) {
            cli.logger.fatal(msg, err);
        } else {
            const pe = new PrettyError();
            // tslint:disable-next-line:no-console
            console.error(`${msg}, error: ${pe.render(err)}`);
        }
    }
})();