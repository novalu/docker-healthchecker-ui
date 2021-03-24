import { UiFileConfiguration } from "../../model/UiFileConfiguration";
import { UiPlainConfiguration } from "../../model/UiPlainConfiguration";
import Router from "koa-router";
declare class DashboardController {
    router: Router;
    uiConfiguration: UiFileConfiguration | UiPlainConfiguration;
    private serve;
    install(router: Router, uiConfiguration: UiFileConfiguration | UiPlainConfiguration): void;
}
export { DashboardController };
