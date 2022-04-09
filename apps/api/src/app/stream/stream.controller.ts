import {
  BadRequestException,
  Controller,
  Get,
  Headers,
  Param,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'node:fs';
import * as stream from 'node:stream';

import { VideosService } from '../videos/videos.service';
import { StreamPathPipe } from './stream-path.pipe';

@Controller('stream')
export class StreamController {
  constructor(private readonly videoService: VideosService) {}

  @Get('thumbnails/:path')
  thumbnails(
    @Param('path', StreamPathPipe) path: string,
    @Res() res: Response
  ) {
    return this.streamPicture(path, res);
  }

  @Get('previews/:path')
  async previews(
    @Param('path', StreamPathPipe) path: string,
    @Headers() headers: Record<string, string>,
    @Res() res: Response
  ) {
    const videoStat = await fs.promises.stat(path);
    return this.streamVideo(path, res, {
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
    return this.streamVideo(video.filePath, res, {
      fileSize: video.info.size,
      headers,
    });
  }

  private streamPicture(path: string, res: Response) {
    const r = fs.createReadStream(path);
    const ps = new stream.PassThrough();
    stream.pipeline(r, ps, (err) => {
      if (err) {
        throw new BadRequestException();
      }

      return;
    });

    return ps.pipe(res);
  }

  private streamVideo(
    path: string,
    res: Response,
    {
      fileSize,
      headers,
    }: {
      fileSize: number;
      headers: Record<string, string>;
    }
  ) {
    const { range } = headers;
    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0] || '', 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = end - start + 1;
      const file = fs.createReadStream(path, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(206, head);
      file.pipe(res);
      return res;
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(200, head);
      fs.createReadStream(path).pipe(res);
      return res;
    }
  }
}
