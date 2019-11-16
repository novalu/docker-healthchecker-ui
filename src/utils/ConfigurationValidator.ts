import {Configuration} from "../model/Configuration";
import * as Joi from "@hapi/joi";
import {inject, injectable} from "inversify";
import TYPES from "../di/types";
import {Logger} from "./log/Logger";

@injectable()
class ConfigurationValidator {

    constructor(
        @inject(TYPES.Logger) private logger: Logger
    ) {}

    public async check(configuration: Configuration): Promise<boolean> {
        try {
            const imagesResult = await Joi.array().items(Joi.string()).validateAsync(configuration.images);
        } catch (err) {
            this.logger.error("Provided images are not valid", err);
            return false;
        }

        try {
            const portResult = await Joi.number().port().validateAsync(configuration.port);
        } catch (err) {
            this.logger.error("Provided port is not valid", err);
            return false;
        }

        return true;
    }

}

export { ConfigurationValidator }