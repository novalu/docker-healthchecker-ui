import { ServerBoot } from "./manager/ServerBoot";
import { Logger } from "./utils/log/Logger";
import { Configuration } from "./model/Configuration";
import { ConfigurationValidator } from "./utils/ConfigurationValidator";
declare class Lib {
    private serverBoot;
    private configurationValidator;
    logger: Logger;
    constructor(serverBoot: ServerBoot, configurationValidator: ConfigurationValidator, logger: Logger);
    start(configuration: Configuration): Promise<boolean>;
}
export { Lib };
