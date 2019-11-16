import "reflect-metadata";
import container from "./di/container";
import { Logger } from "./utils/log/Logger";
import TYPES from "./di/types";
import { NoOpLogger } from "./utils/log/impl/NoOpLogger";
import { Lib } from "./Lib";
import {ConsoleLogger} from "./utils/log/impl/ConsoleLogger";

export async function startHealthcheckerUiServer(): Promise<boolean> {
    container.bind<Logger>(TYPES.Logger).to(ConsoleLogger).inSingletonScope();

    const lib = container.get<Lib>(TYPES.Lib);
    return await lib.start();
}