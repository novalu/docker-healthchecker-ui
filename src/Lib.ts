import {inject, injectable} from "inversify";
import TYPES from "./di/types";
import {ServerBoot} from "./manager/ServerBoot";
import {Logger} from "./utils/log/Logger";
import { UiConfiguration } from "./model/UiConfiguration";

@injectable()
class Lib {

    constructor(
        @inject(TYPES.ServerBoot) private serverBoot: ServerBoot,
        @inject(TYPES.Logger) public logger: Logger
    ) {}

    public async start(uiConfiguration: UiConfiguration): Promise<boolean> {
        return this.serverBoot.startServer(uiConfiguration);
    }

}

export { Lib }