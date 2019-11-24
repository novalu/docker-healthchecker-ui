import { Configuration, ContainerRequest } from "docker-healthchecker";
declare class UiConfiguration extends Configuration {
    port: number;
    constructor(images: Array<string | ContainerRequest>, imagesFile: string, port?: number);
}
export { UiConfiguration };
