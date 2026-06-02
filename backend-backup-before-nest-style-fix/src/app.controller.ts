import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {

  @Get('saludo')
  getSaludo(): string {
    return 'Hola desde Nest 🚀';
  }

}