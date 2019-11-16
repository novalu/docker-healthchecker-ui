import yargs from "yargs";
import container from "./di/container";

import { inject, injectable } from "inversify";
import TYPES from "./di/types";
import { Logger } from "./utils/log/Logger";
import * as path from "path";
import {DashboardController} from "./routes/dashboard/DashboardController";
import * as http from "http";
import {ServerBoot} from "./manager/ServerBoot";

@injectable()
class Cli {
    constructor(
        @inject(TYPES.ServerBoot) private serverBoot: ServerBoot,
        @inject(TYPES.Logger) public logger: Logger
    ) {}

    public async start(): Promise<boolean> {
        // construct params from cli args
        const images = [ "test1", "test2" ];
        return this.serverBoot.startServer(...images);
    }

}

export { Cli }