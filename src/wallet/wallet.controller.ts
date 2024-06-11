import { Body, Controller, Get, Post } from '@nestjs/common';
import { SignatureDto } from './dto/SignatureDto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("钱包相关接口")
@Controller('wallet')
export class WalletController {

  @Post("/signature")
  getSignature(@Body() param: SignatureDto): SignatureDto {
    return { payload: "test" }
  }

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

  // @Get

}
