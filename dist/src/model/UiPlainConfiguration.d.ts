import { PlainConfiguration } from "docker-healthchecker";
declare class UiPlainConfiguration extends PlainConfiguration {
    port: number;
    constructor(images: string[], port?: number);
}
export { UiPlainConfiguration };
