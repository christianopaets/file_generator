import {BodyParam, JsonController, Post, UploadedFile} from 'routing-controllers';
import {HandlebarsService} from '../services/handlebars.service';
import {PdfGeneratorService} from '../services/pdf-generator.service';
import {Service} from 'typedi';

@JsonController('/pdf')
@Service()
export class PdfController {

  constructor(private readonly handlebarsService: HandlebarsService,
              private readonly pdfService: PdfGeneratorService) {
    this.handlebarsService.registerHelpers();
  }

  @Post('/handlebars')
  generatePdf(@UploadedFile('template') file: Express.Multer.File, @BodyParam('data') data: Record<string, unknown>): Promise<Buffer> {
    const filename = file.originalname || file.filename || Date.now().toString();
    const template = this.handlebarsService.compile(file.buffer.toString('utf8'), data);
    return this.pdfService.createPdf(filename.replace('.hbs', ''), template);
  }
}
