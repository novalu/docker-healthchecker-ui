import { ServerBoot } from "./manager/ServerBoot";
import { Logger } from "./utils/log/Logger";
import { UiFileConfiguration } from "./model/UiFileConfiguration";
declare class Lib {
    private serverBoot;
    logger: Logger;
    constructor(serverBoot: ServerBoot, logger: Logger);
    start(uiConfiguration: UiFileConfiguration): Promise<boolean>;
}
export { Lib };
