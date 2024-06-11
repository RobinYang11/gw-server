
import { Test, TestingModule } from '@nestjs/testing';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { createPayloadToken } from '../utils';
import { SignatureDto } from './dto/SignatureDto';

jest.mock('../utils', () => ({
  createPayloadToken: jest.fn().mockResolvedValue(null),
}));

describe('WalletController', () => {
  let controller: WalletController;
  let walletService: WalletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletController],
      providers: [WalletService],
    }).compile();

    controller = module.get<WalletController>(WalletController);
    walletService = module.get<WalletService>(WalletService);
  });

  describe('getSignature', () => {

    it('should return an empty object when createPayloadToken returns null', async () => {
      const generatePayloadSpy = jest.spyOn(walletService, 'generatePayload').mockReturnValue('testPayload');

      const result = await controller.getSignature();

      expect(generatePayloadSpy).toHaveBeenCalledTimes(1);
      expect(createPayloadToken).toHaveBeenCalledWith({ payload: 'testPayload' });
      expect(result).toEqual({ signedToken: null });
    });

    it('should return a SignatureDto object when createPayloadToken returns a valid token', async () => {
      const generatePayloadSpy = jest.spyOn(walletService, 'generatePayload').mockReturnValue('testPayload');
      (createPayloadToken as jest.Mock).mockResolvedValue('validToken');

      const result = await controller.getSignature();

      expect(generatePayloadSpy).toHaveBeenCalledTimes(1);
      expect(createPayloadToken).toHaveBeenCalledWith({ payload: 'testPayload' });
      expect(result).toEqual({ signedToken: 'validToken' });
    });
  });
});