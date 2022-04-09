import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    CollectionsModule,
    VideosModule,
    StreamModule,
  ],
})
export class AppModule {}
