import {inject, injectable} from "inversify";
import * as express from "express";
import {WebHandler} from "../../utils/WebHandler";
import TYPES from "../../di/types";
import {DashboardData} from "./DashboardData";

@injectable()
class DashboardController {

    private readonly VIEW = "dashboard/dashboardView";

    public router;

    constructor(
        @inject(TYPES.WebHandler) private webHandler: WebHandler
    ) {
        this.router = express.Router();
        this.router.get(
            "/",
            this.webHandler.await(async (req, res, next) => {
                res.render(
                    this.VIEW,
                    new DashboardData()
                )
            }));
    }

}

export { DashboardController }