import { Controller, Get } from '@nestjs/common';

@Controller('wallet')
export class WalletController {

  @Get("/getHello")
  getHello(): string {
    const unused = ""
    return 'Hello World!';
  }

  @Get("/json")
  getJson(): object {
    return {
      "name": "robin"
    }
  }
}
