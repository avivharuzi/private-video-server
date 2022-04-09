import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VideosModule } from '../videos';
import { CollectionEntity } from './collection.entity';
import { CollectionsController } from './collections.controller';
import { CollectionsService } from './collections.service';

@Module({
  imports: [TypeOrmModule.forFeature([CollectionEntity]), VideosModule],
  providers: [CollectionsService],
  controllers: [CollectionsController],
  exports: [TypeOrmModule],
})
export class CollectionsModule {}
