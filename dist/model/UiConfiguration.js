"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const docker_healthchecker_1 = require("docker-healthchecker");
class UiConfiguration extends docker_healthchecker_1.Configuration {
    constructor(images = [], imagesFile, port = 8080) {
        super(images, imagesFile);
        this.port = port;
    }
}
exports.UiConfiguration = UiConfiguration;
//# sourceMappingURL=UiConfiguration.js.map