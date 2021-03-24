import { FileConfiguration } from "docker-healthchecker";
declare class UiFileConfiguration extends FileConfiguration {
    port: number;
    constructor(filePath: string, port?: number);
}
export { UiFileConfiguration };
