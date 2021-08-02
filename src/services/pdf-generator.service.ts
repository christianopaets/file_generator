import {existsSync, mkdirSync} from 'fs';
import {Browser, launch} from 'puppeteer';
import {Inject, Service} from 'typedi';
import {PUBLIC_DIRECTORY} from '../shared/injectors';

@Service()
export class PdfGeneratorService {

  private _browser: Browser;

  constructor(@Inject(PUBLIC_DIRECTORY) private readonly dir: string) {
  }

  async createPdf(filename: string, template: string): Promise<Buffer> {
    await this._init();
    this._checkForDirectory();
    const page = await this._browser.newPage();
    await page.setContent(template);
    const file = await page.pdf({
      path: `${this.dir}/compiled/handlebars/${filename}.pdf`,
      format: 'a4',
      printBackground: true,
      preferCSSPageSize: true
    });
    await page.close();
    return file;
  }

  private async _init(): Promise<void> {
    if (this._browser) {
      return;
    }
    this._browser = await launch();
  }


  protected _checkForDirectory(): void {
    if (!existsSync(`${this.dir}/compiled`)) {
      mkdirSync(`${this.dir}/compiled`);
    }
  }
}
