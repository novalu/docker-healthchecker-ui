import yargs from "yargs";
import container from "./di/container";

import { inject, injectable } from "inversify";
import TYPES from "./di/types";
import { Logger } from "./utils/log/Logger";
import * as path from "path";
import {DashboardController} from "./routes/dashboard/DashboardController";
import * as http from "http";
import {ServerBoot} from "./manager/ServerBoot";
import {Configuration} from "./model/Configuration";
import {ConfigurationValidator} from "./utils/ConfigurationValidator";

@injectable()
class Cli {
    constructor(
        @inject(TYPES.ServerBoot) private serverBoot: ServerBoot,
        @inject(TYPES.ConfigurationValidator) private configurationValidator: ConfigurationValidator,
        @inject(TYPES.Logger) public logger: Logger
    ) {}

    public async start(): Promise<boolean> {
        const argv = yargs
            .help("h")
            .alias("h", "help")

            //.group("image", "Main:")
            .alias("i", "image")
            .describe("image", "Docker image to check. Could be defined more times.")
            .array("image")
            .string("image")
            .demandOption("image", "At least one image is required")

            .alias("p", "port")
            .describe("port", "Port, on which will server run")
            .number("port")
            .default("port", 8080)

            .fail((msg, err) => {
                console.error(msg)
                process.exit(1)
            })

            .argv;

        const images = argv.image as string[];
        const configuration = new Configuration(images, argv.port);

        const validateResult = await this.configurationValidator.check(configuration);
        if (validateResult) {
            return this.serverBoot.startServer(configuration);
        }
    }

}

export { Cli }