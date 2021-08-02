import {Get, JsonController} from 'routing-controllers';

@JsonController('/')
export class MainController {

  @Get()
  index(): string {
    return 'File generator works';
  }
}
