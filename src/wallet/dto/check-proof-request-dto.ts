import { ApiProperty } from "@nestjs/swagger";
import { CHAIN } from "@tonconnect/ui";

export class CheckProofRequestDto {

  @ApiProperty({
    name: "address",
    type: String
  })
  address: string;

  @ApiProperty({
    required: true,
    type: String
  })
  network: CHAIN.MAINNET | CHAIN.TESTNET;

  @ApiProperty({
    required: true,
    type: String
  })
  public_key: string;

  @ApiProperty({
    required: true,
    type: `{
      timestamp: number,
      domain: {
        lengthBytes: number;
        value: string;
      };
      payload: string;
      signature: string;
      state_init: string;
    }`
  })
  proof: {
    timestamp: number,
    domain: {
      lengthBytes: number;
      value: string;
    };
    payload: string;
    signature: string;
    state_init: string;
  }
}