import * as fs from 'node:fs';

import { Controller, Get, Headers, Param, Res } from '@nestjs/common';
import { Response } from 'express';

import { VideosService } from '../videos/videos.service';
import { StreamPathPipe } from './stream-path.pipe';
import { StreamService } from './stream.service';

@Controller('stream')
export class StreamController {
  constructor(
    private readonly videoService: VideosService,
    private readonly streamService: StreamService
  ) {}

  @Get('thumbnails/:path')
  thumbnails(
    @Param('path', StreamPathPipe) path: string,
    @Res() res: Response
  ) {
    return this.streamService.picture(path, res);
  }

  @Get('previews/:path')
  async previews(
    @Param('path', StreamPathPipe) path: string,
    @Headers() headers: Record<string, string>,
    @Res() res: Response
  ) {
    const videoStat = await fs.promises.stat(path);
    return this.streamService.video(path, res, {
      fileSize: videoStat.size,
      headers,
    });
  }

  @Get('video/:id')
  async video(
    @Param('id') id: string,
    @Headers() headers: Record<string, string>,
    @Res() res: Response
  ) {
    const video = await this.videoService.findOne(id);
    return this.streamService.video(video.filePath, res, {
      fileSize: video.info.size,
      headers,
    });
  }
}
