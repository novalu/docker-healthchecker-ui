import { inject, injectable } from "inversify";
import { Logger } from "./log/Logger";
import TYPES from "../di/types";

@injectable()
class WebHandler {
    constructor(@inject(TYPES.Logger) private logger: Logger) {}

    public await(middleware) {
        return async (req, res, next) => {
            try {
                await middleware(req, res, next);
            } catch (error) {
                this.logger.error("Error caught by WebHandler", error);
                next(error);
            }
        };
    }
}

export { WebHandler };
