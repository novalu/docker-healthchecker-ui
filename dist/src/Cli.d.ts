import { Logger } from "./utils/log/Logger";
import { ServerBoot } from "./manager/ServerBoot";
declare class Cli {
    private serverBoot;
    logger: Logger;
    constructor(serverBoot: ServerBoot, logger: Logger);
    start(): Promise<boolean>;
}
export { Cli };
