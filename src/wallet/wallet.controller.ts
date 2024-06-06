import { Controller, Get } from '@nestjs/common';

@Controller('wallet')
export class WalletController {



  @Get("/getHello")
  getHello(): string {
    console.log("name",abc);
    return 'Hello World!';
  }

  @Get("/json")
  getJson(): object{
    return {
      "name": "robin"
    }
  }
}
