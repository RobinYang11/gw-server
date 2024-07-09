import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { AllExceptionsFilter } from './httpExceptionFilter';
import { join } from 'path';


const PORT = 3000;
async function bootstrap() {

  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );


  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs')
  app.enableCors({
    origin: '*', // 允许所有域
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 允许的HTTP方法
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })

  const config = new DocumentBuilder()
    .setTitle('钱包后台')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();

  // 配置自动api 文档 ,生成环境不需要
  // console.log(process.env)
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // 全局注入http状态吗
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  Logger.log(`接口文档自动生成地址:http://localhost:${PORT}/api`);

  await app.listen(PORT);
}
bootstrap();
