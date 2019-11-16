import {inject, injectable} from "inversify";
import TYPES from "./di/types";
import {ServerBoot} from "./manager/ServerBoot";
import {Logger} from "./utils/log/Logger";

@injectable()
class Lib {

    constructor(
        @inject(TYPES.ServerBoot) private serverBoot: ServerBoot,
        @inject(TYPES.Logger) public logger: Logger
    ) {}

    public async start(): Promise<boolean> {
        // pass params from argument
        return this.serverBoot.startServer();
    }

}

export { Lib }