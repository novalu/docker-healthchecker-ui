import {injectable} from "inversify";
import {containersHealth} from "docker-healthchecker";
import {DashboardData} from "./model/DashboardData";
import * as lodash from "lodash";
import {ContainerView} from "./model/ContainerView";
import {UiFileConfiguration} from "../../model/UiFileConfiguration";
import {UiPlainConfiguration} from "../../model/UiPlainConfiguration";
import Router from "koa-router";
import Koa from "koa";

@injectable()
class DashboardController {

  public router: Router;

  public uiConfiguration: UiFileConfiguration | UiPlainConfiguration;

  private async serve(ctx: Koa.Context) {
    const containers = await containersHealth(this.uiConfiguration);
    const containersViews = lodash.map(containers, (container) => {
      return new ContainerView(
        container.alias,
        container.state.text,
        container.state.color
      );
    });
    const view = "dashboard/page/themes/dashboardViewPlain";
    const data = new DashboardData(containersViews);
    await ctx.render(view, data);
  }

  public install(router: Router, uiConfiguration: UiFileConfiguration | UiPlainConfiguration) {
    this.router = router;
    this.uiConfiguration = uiConfiguration;

    router.get("/", async (ctx, next) => {
      await this.serve(ctx);
    })
  }

}

export {DashboardController}