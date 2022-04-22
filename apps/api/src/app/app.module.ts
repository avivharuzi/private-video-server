import * as path from 'node:path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BrowseModule } from './browse';
import { CollectionsModule } from './collections';
import { StreamModule } from './stream';
import { VideosModule } from './videos';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'web', 'browser'),
      exclude: ['/api*'],
    }),
    BrowseModule,
    CollectionsModule,
    VideosModule,
    StreamModule,
  ],
})
export class AppModule {}
