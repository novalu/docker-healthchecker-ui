import { inject, injectable } from "inversify";
import TYPES from "./di/types";
import {Logger} from "./utils/log/Logger";
import container from "./di/container";
import {NoOpLogger} from "./utils/log/impl/NoOpLogger";
import {SignaleLogger} from "./utils/log/impl/SignaleLogger";

@injectable()
class App {
    constructor(
        @inject(TYPES.Logger) private logger: Logger
    ) {}

    public async start(images: string[]): Promise<boolean> {

        return true;
    }

}

export { App }