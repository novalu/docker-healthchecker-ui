import { WebHandler } from "../../utils/WebHandler";
import { UiConfiguration } from "../../model/UiConfiguration";
declare class DashboardController {
    private webHandler;
    router: any;
    uiConfiguration: UiConfiguration;
    constructor(webHandler: WebHandler);
}
export { DashboardController };
