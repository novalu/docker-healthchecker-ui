import "reflect-metadata";
import { UiFileConfiguration } from "../model/UiFileConfiguration";
import { UiPlainConfiguration } from "../model/UiPlainConfiguration";
declare const startHealthcheckerUiServer: (uiConfiguration: UiFileConfiguration) => Promise<boolean>;
export { startHealthcheckerUiServer, UiFileConfiguration, UiPlainConfiguration };
