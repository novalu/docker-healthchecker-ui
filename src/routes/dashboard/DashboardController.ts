import {inject, injectable} from "inversify";
import * as express from "express";
import {WebHandler} from "../../utils/WebHandler";
import TYPES from "../../di/types";
import { containersHealth } from "docker-healthchecker";
import { DashboardData } from "./model/DashboardData";

@injectable()
class DashboardController {

    private readonly VIEW = "dashboard/page/dashboardView";

    public router;

    constructor(
        @inject(TYPES.WebHandler) private webHandler: WebHandler
    ) {
        this.router = express.Router();
        this.router.get(
            "/",
            this.webHandler.await(async (req, res, next) => {
                const containers = await containersHealth("test");
                res.render(
                    this.VIEW,
                    new DashboardData(JSON.stringify(containers))
                )
            }));
    }

}

export { DashboardController }