"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UiConfiguration = void 0;
const docker_healthchecker_1 = require("docker-healthchecker");
class UiConfiguration extends docker_healthchecker_1.Configuration {
    constructor(images = [], imagesDef, port = 8080) {
        super(images, imagesDef);
        this.port = port;
    }
}
exports.UiConfiguration = UiConfiguration;
//# sourceMappingURL=UiConfiguration.js.map