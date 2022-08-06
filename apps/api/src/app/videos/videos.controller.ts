import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

import { VideoQueryParams } from '@private-video-server/collections/data-access';

import { VideosService } from './videos.service';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get()
  findAll(@Query() query: Partial<VideoQueryParams>) {
    return this.videosService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videosService.findOne(id);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.videosService.deleteOne(id);
  }

  @Post(':id/change-cover-thumbnail')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'coverThumbnail', maxCount: 1 }])
  )
  changeCoverThumbnail(
    @Param('id') id: string,
    @UploadedFiles()
    files?: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      coverThumbnail?: Express.Multer.File[];
    }
  ) {
    const coverThumbnail =
      files && files.coverThumbnail && files.coverThumbnail[0];

    if (!coverThumbnail) {
      throw new BadRequestException('Cover image is required');
    }

    return this.videosService.changeCoverThumbnail(id, coverThumbnail);
  }
}
