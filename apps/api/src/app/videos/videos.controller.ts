import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

import { VideosService } from './videos.service';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videosService.findOne(id);
  }

  @Post(':id/change-cover-thumbnail')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'coverThumbnail', maxCount: 1 }])
  )
  uploadFile(
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
