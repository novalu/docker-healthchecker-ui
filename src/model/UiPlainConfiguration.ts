import {Configuration, ConsoleConsumerOptions, PlainConfiguration} from "docker-healthchecker";

class UiPlainConfiguration extends PlainConfiguration{
    constructor(
        images: string[],
        public port: number = 8080
    ) {
        super(images, [new ConsoleConsumerOptions(false)]);
    }
}

export { UiPlainConfiguration }