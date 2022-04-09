import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VideoEntity } from './video.entity';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';

@Module({
  imports: [TypeOrmModule.forFeature([VideoEntity])],
  providers: [VideosService],
  controllers: [VideosController],
  exports: [TypeOrmModule],
})
export class VideosModule {}
