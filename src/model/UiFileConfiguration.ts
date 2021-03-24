import {Configuration, FileConfiguration, ConsoleConsumerOptions} from "docker-healthchecker";

class UiFileConfiguration extends FileConfiguration {
    constructor(
        filePath: string,
        public port: number = 8080
    ) {
        super(filePath, []);
    }
}

export { UiFileConfiguration }