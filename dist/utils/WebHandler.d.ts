import { Logger } from "./log/Logger";
declare class WebHandler {
    private logger;
    constructor(logger: Logger);
    await(middleware: any): (req: any, res: any, next: any) => Promise<void>;
}
export { WebHandler };
