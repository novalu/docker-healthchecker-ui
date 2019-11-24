import yargs from "yargs";
import container from "./di/container";

import { inject, injectable } from "inversify";
import TYPES from "./di/types";
import { Logger } from "./utils/log/Logger";
import * as path from "path";
import {DashboardController} from "./routes/dashboard/DashboardController";
import * as http from "http";
import {ServerBoot} from "./manager/ServerBoot";
import { UiConfiguration } from "./model/UiConfiguration";

@injectable()
class Cli {
    constructor(
        @inject(TYPES.ServerBoot) private serverBoot: ServerBoot,
        @inject(TYPES.Logger) public logger: Logger
    ) {}

    public async start(): Promise<boolean> {
        const argv = yargs
            .help("h")
            .alias("h", "help")

            .group("image", "Images:")
            .alias("i", "image")
            .describe("image", "Docker image to check. Could be defined more times.")
            .array("image")
            .string("image")

            .describe("images-def", "JSON file with image definition in format [{image: string, alias: string}, ...]")
            .string("images-def")

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
        const imagesDef = argv.imagesDef as string;
        const uiConfiguration = new UiConfiguration(images, imagesDef, argv.port);

        return this.serverBoot.startServer(uiConfiguration);
    }

}

export { Cli }