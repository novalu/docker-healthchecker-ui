import { Logger } from "./utils/log/Logger";
declare class App {
    private logger;
    constructor(logger: Logger);
    start(images: string[]): Promise<boolean>;
}
export { App };
