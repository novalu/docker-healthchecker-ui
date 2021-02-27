import yargs from "yargs";
import container from "./di/container";

import { inject, injectable } from "inversify";
import TYPES from "./di/types";
import { Logger } from "./utils/log/Logger";
import * as path from "path";
import {DashboardController} from "./routes/dashboard/DashboardController";
import * as http from "http";
import {ServerBoot} from "./manager/ServerBoot";
import { UiFileConfiguration } from "./model/UiFileConfiguration";
import { Configuration } from "docker-healthchecker";
import { UiPlainConfiguration } from "./model/UiPlainConfiguration";

@injectable()
class App {
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

        let configuration: UiPlainConfiguration | UiFileConfiguration;
        if (argv.image !== undefined) {
            configuration = new UiPlainConfiguration(argv.image as string[], argv.port);
        } else if (argv.imagesFile !== undefined) {
            configuration = new UiFileConfiguration(argv.imagesFile as string, argv.port);
        } else {
            console.log("Image or imagesFile parameter should be provided.");
            return;
        }

        return this.serverBoot.startServer(configuration);
    }

}

export { App }