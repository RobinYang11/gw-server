import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WalletModule } from './wallet/wallet.module';
import { DemoModule } from './demo/demo.module';

@Module({
  imports: [WalletModule, DemoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
