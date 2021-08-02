import {compile, HelperOptions, registerHelper} from 'handlebars';
import {Service} from 'typedi';

@Service()
export class HandlebarsService {

  compile(content: string, body: Record<string, unknown>): string {
    const template = compile(content);
    return template(body);
  }

  registerHelpers(): void {
    this._registerEqualsHelper();
  }

  protected _registerEqualsHelper(): void {
    registerHelper('if_eq', function(a, b, opts: HelperOptions) {
      if (a === b) {
        return opts.fn(this);
      } else {
        return opts.inverse(this);
      }
    });
  }
}
