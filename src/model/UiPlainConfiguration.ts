import {PlainConfiguration} from "docker-healthchecker";

class UiPlainConfiguration extends PlainConfiguration {
  constructor(
    images: string[],
    public port: number = 8080,
    public https: boolean,
    public httpsCert: string,
    public httpsKey: string,
    public httpsCa: string[],
    public httpsPassphrase: string
  ) {
    super(images, []);
  }
}

export {UiPlainConfiguration}