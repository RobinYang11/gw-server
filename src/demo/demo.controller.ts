import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("演示相关接口")
@Controller('demo')
export class DemoController {
  @Get("/getDemo")
  getDemo(): string {
    return "this is demo";
  }
}
