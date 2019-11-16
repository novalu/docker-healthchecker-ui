import { ServerBoot } from "./manager/ServerBoot";
import { Logger } from "./utils/log/Logger";
declare class Lib {
    private serverBoot;
    logger: Logger;
    constructor(serverBoot: ServerBoot, logger: Logger);
    start(): Promise<boolean>;
}
export { Lib };
