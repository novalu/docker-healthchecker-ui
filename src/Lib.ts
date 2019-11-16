import {inject, injectable} from "inversify";
import TYPES from "./di/types";
import {ServerBoot} from "./manager/ServerBoot";
import {Logger} from "./utils/log/Logger";
import {Configuration} from "./model/Configuration";
import {ConfigurationValidator} from "./utils/ConfigurationValidator";

@injectable()
class Lib {

    constructor(
        @inject(TYPES.ServerBoot) private serverBoot: ServerBoot,
        @inject(TYPES.ConfigurationValidator) private configurationValidator: ConfigurationValidator,
        @inject(TYPES.Logger) public logger: Logger
    ) {}

    public async start(configuration: Configuration): Promise<boolean> {
        const validateResult = await this.configurationValidator.check(configuration);
        if (validateResult) {
            return this.serverBoot.startServer(configuration);
        }
    }

}

export { Lib }