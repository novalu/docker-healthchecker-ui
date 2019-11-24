import { Configuration } from "../model/Configuration";
import { Logger } from "./log/Logger";
declare class ConfigurationValidator {
    private logger;
    constructor(logger: Logger);
    check(configuration: Configuration): Promise<boolean>;
}
export { ConfigurationValidator };
