import {inject, injectable} from "inversify";
import * as express from "express";
import {WebHandler} from "../../utils/WebHandler";
import TYPES from "../../di/types";
import { containersHealth, Container, ContainerState } from "docker-healthchecker";
import { DashboardData } from "./model/DashboardData";
import * as lodash from "lodash";
import {ContainerView} from "./model/ContainerView";

@injectable()
class DashboardController {

    public router;

    public images: string[];

    constructor(
        @inject(TYPES.WebHandler) private webHandler: WebHandler
    ) {
        this.router = express.Router();
        this.router.get(
            "/",
            this.webHandler.await(async (req, res, next) => {
                const containers = await containersHealth(...this.images);
                const containersViews = lodash.map(containers, (container) => {
                    return new ContainerView(
                        container.image,
                        container.state.text,
                        container.state.color
                    );
                });
                const view = "dashboard/page/themes/dashboardViewPlain";
                res.render(
                    view,
                    new DashboardData(containersViews)
                )
            }));
    }

}

export { DashboardController }