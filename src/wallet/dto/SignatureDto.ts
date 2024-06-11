import { ApiProperty } from "@nestjs/swagger";

export class SignatureParamDto {

  @ApiProperty({
    type: String,
    required: true,
    description: "签名数据",
    example: "测试"
  })
  payload: string;
}

export class SignatureDto {
  @ApiProperty({
    type: String,
    required: true,
    description: "签名数据",
    example: "测试"
  })
  signedToken: string;
}