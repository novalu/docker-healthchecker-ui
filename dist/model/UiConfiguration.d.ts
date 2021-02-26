import { Configuration, ContainerRequest } from "docker-healthchecker";
declare class UiConfiguration extends Configuration {
    port: number;
    constructor(images: Array<string | ContainerRequest>, imagesDef: string, port?: number);
}
export { UiConfiguration };
