import "reflect-metadata";
import { Configuration } from "./model/Configuration";
declare const startHealthcheckerUiServer: (configuration: Configuration) => Promise<boolean>;
export { startHealthcheckerUiServer, Configuration };
