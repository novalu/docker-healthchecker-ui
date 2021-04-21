"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UiFileConfiguration = void 0;
const docker_healthchecker_1 = require("docker-healthchecker");
class UiFileConfiguration extends docker_healthchecker_1.FileConfiguration {
    constructor(filePath, port = 8080, https, httpsCert, httpsKey, httpsCa, httpsPassphrase) {
        super(filePath, []);
        this.port = port;
        this.https = https;
        this.httpsCert = httpsCert;
        this.httpsKey = httpsKey;
        this.httpsCa = httpsCa;
        this.httpsPassphrase = httpsPassphrase;
    }
}
exports.UiFileConfiguration = UiFileConfiguration;
//# sourceMappingURL=UiFileConfiguration.js.map