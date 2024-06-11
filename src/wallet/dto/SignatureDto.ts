import { ApiProperty } from "@nestjs/swagger";



export class SignatureDto {

  @ApiProperty({
    required: true,
    description: "签名数据",
    example: "测试"
  })
  payload: string;
}