import {inject, injectable} from "inversify";
import TYPES from "../di/types";
import {Logger} from "../utils/log/Logger";
import {ServerBoot} from "../manager/ServerBoot";
import {UiPlainConfiguration} from "../model/UiPlainConfiguration";

@injectable()
class Test {
  constructor(
    @inject(TYPES.ServerBoot) private serverBoot: ServerBoot,
    @inject(TYPES.Logger) public logger: Logger
  ) {
  }

  public async start(): Promise<boolean> {
    const configuration = new UiPlainConfiguration(
      ["test", "test1", "test2", "test3", "test4"],
      8082,
      false,
      "",
      "",
      [],
      ""
    );
    return this.serverBoot.startServer(configuration);
  }

}

export {Test}