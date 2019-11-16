import { Logger } from "./utils/log/Logger";
import { ServerBoot } from "./manager/ServerBoot";
import { ConfigurationValidator } from "./utils/ConfigurationValidator";
declare class Cli {
    private serverBoot;
    private configurationValidator;
    logger: Logger;
    constructor(serverBoot: ServerBoot, configurationValidator: ConfigurationValidator, logger: Logger);
    start(): Promise<boolean>;
}
export { Cli };
