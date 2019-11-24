import "reflect-metadata";
import { UiConfiguration } from "./model/UiConfiguration";
declare const startHealthcheckerUiServer: (uiConfiguration: UiConfiguration) => Promise<boolean>;
export { startHealthcheckerUiServer, UiConfiguration };
