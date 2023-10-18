import * as path from 'node:path';

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';
import helmet from 'helmet';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(
    path.join(process.env['API_MEDIA_DIRECTORY'] || '', 'hls'),
    {
      prefix: '/api/videos/hls',
    },
  );

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );
  app.use(compression());

  if (!environment.production) {
    const documentBuilder = new DocumentBuilder()
      .setTitle('Private Video Server API')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, documentBuilder);
    SwaggerModule.setup('api', app, document);
  }

  const { API_PORT } = process.env;
  const port = API_PORT || 3333;
  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
})();
