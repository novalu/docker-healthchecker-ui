import { WebHandler } from "../../utils/WebHandler";
import { UiFileConfiguration } from "../../model/UiFileConfiguration";
import { UiPlainConfiguration } from "../../model/UiPlainConfiguration";
declare class DashboardController {
    private webHandler;
    router: any;
    uiConfiguration: UiFileConfiguration | UiPlainConfiguration;
    constructor(webHandler: WebHandler);
}
export { DashboardController };
