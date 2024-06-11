import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { SignatureDto } from './dto/SignatureDto';
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createAuthToken, createPayloadToken, verifyToken } from '../utils';
import { CheckProofRequestDto } from './dto/check-proof-request-dto';
import { WalletService } from './wallet.service';

@ApiTags("钱包相关接口")
@Controller('wallet')
export class WalletController {

  constructor(private walletService: WalletService) { }

  @Post("/signature")
  @ApiResponse({
    description: "加密数据",
    type: SignatureDto
  })
  async getSignature(): Promise<SignatureDto> {
    const payload = this.walletService.generatePayload();
    const token = await createPayloadToken({ payload: payload });
    return {
      signedToken: token
    };
  }

  @ApiQuery({
    type: String,
    name: "token",
    description: "token"
  })
  @Get("/verify")
  async verifyToken(@Param() token: string) {
    const msg = await verifyToken(token)
    return msg;
  }


  @ApiBody({
    type: CheckProofRequestDto
  })
  @Post("/checkProof")
  async checkProof(@Body() body: CheckProofRequestDto) {

    try {
      const isValid = await this.walletService.checkProof(body, address => this.walletService.getWalletPublicKey(address));
      const payloadToken = body.proof.payload;

      if (!isValid) {
        throw new Error(`wallet is not valid!`)
      }

      if (!await verifyToken(payloadToken)) {
        throw new Error('token is not valid')
      }
      const token = await createAuthToken({ address: body.address, network: body.network });
      return {
        token
      }
    } catch (e) {
      Logger.error('error', e)
      return {
        message: "参数错误:" + e
      }
    }
  }
}
