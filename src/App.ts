import { inject, injectable } from "inversify";
import TYPES from "./di/types";
import {Logger} from "./utils/log/Logger";
import container from "./di/container";
import {NoOpLogger} from "./utils/log/impl/NoOpLogger";
import {SignaleLogger} from "./utils/log/impl/SignaleLogger";
import {ServerBoot} from "./manager/ServerBoot";
import { UiConfiguration } from "./model/UiConfiguration";

@injectable()
class App {
    constructor(
        @inject(TYPES.ServerBoot) private serverBoot: ServerBoot,
        @inject(TYPES.Logger) public logger: Logger
    ) {}

    public async start(): Promise<boolean> {
        const configuration = new UiConfiguration(
            [ "test", "test1", "test2", "test3", "test4" ],
            undefined,
            8080
        );
        return this.serverBoot.startServer(configuration);
    }

}

export { App }