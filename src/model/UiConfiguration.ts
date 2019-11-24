import {Configuration, ContainerRequest} from "docker-healthchecker";

class UiConfiguration extends Configuration{
    constructor(
        images: Array<string | ContainerRequest> = [],
        imagesFile: string,
        public port: number = 8080
    ) {
        super(images, imagesFile);
    }
}

export { UiConfiguration }