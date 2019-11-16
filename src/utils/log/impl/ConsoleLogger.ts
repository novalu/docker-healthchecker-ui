import { injectable } from "inversify";
import PrettyError from "pretty-error";
import signale, { Signale } from "signale";
import { Logger } from "../Logger";

@injectable()
class ConsoleLogger implements Logger {

  private pe: PrettyError;

  private logExtra(op: (extra) => void, extra: any) {
    if (extra instanceof Error) {
      op(this.pe.render(extra))
    } else {
      op(extra);
    }
  }

  public debug(body: string, extra?: any) {
    console.log(body);
    if (extra) this.logExtra((extraParam) => console.log(extraParam), extra);
  }

  public error(body: string, extra?: any) {
    console.log(body);
    if (extra) this.logExtra((extraParam) => console.log(extraParam), extra);
  }

  public info(body: string, extra?: any) {
    console.log(body);
    if (extra) this.logExtra((extraParam) => console.log(extraParam), extra);
  }

  public trace(body: string, extra?: any) {
    console.log(body);
    if (extra) this.logExtra((extraParam) => console.log(extraParam), extra);
  }

  public warn(body: string, extra?: any) {
    console.log(body);
    if (extra) this.logExtra((extraParam) => console.log(extraParam), extra);
  }

  public fatal(body: string, extra?: any) {
    console.log(body);
    if (extra) this.logExtra((extraParam) => console.log(extraParam), extra);
  }
}

export { ConsoleLogger };
