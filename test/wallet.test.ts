import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET:测试/wallet/json接口', () => {
    return request(app.getHttpServer())
      .get('/wallet/json')
      .expect(200)
      .expect({ "name": "robin" });
  });

  it('GET:测试/wallet/getHello接口', () => {
    return request(app.getHttpServer())
      .get('/wallet/getHello')
      .expect(200)
      .expect('Hello World!');
  });
});
