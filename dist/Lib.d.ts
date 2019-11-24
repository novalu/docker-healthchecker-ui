import { ServerBoot } from "./manager/ServerBoot";
import { Logger } from "./utils/log/Logger";
import { UiConfiguration } from "./model/UiConfiguration";
declare class Lib {
    private serverBoot;
    logger: Logger;
    constructor(serverBoot: ServerBoot, logger: Logger);
    start(uiConfiguration: UiConfiguration): Promise<boolean>;
}
export { Lib };
