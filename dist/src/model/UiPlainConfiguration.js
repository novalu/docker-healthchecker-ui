"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UiPlainConfiguration = void 0;
const docker_healthchecker_1 = require("docker-healthchecker");
class UiPlainConfiguration extends docker_healthchecker_1.PlainConfiguration {
    constructor(images, port = 8080) {
        super(images, [new docker_healthchecker_1.ConsoleConsumerOptions(false)]);
        this.port = port;
    }
}
exports.UiPlainConfiguration = UiPlainConfiguration;
//# sourceMappingURL=UiPlainConfiguration.js.map