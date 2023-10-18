import * as fs from 'node:fs';
import * as stream from 'node:stream';

import { BadRequestException, Injectable } from '@nestjs/common';

import { Response } from 'express';

import { StreamVideoOptions } from './stream-video-options';

@Injectable()
export class StreamService {
  picture(path: string, res: Response) {
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

  video(
    path: string,
    res: Response,
    { fileSize, headers }: StreamVideoOptions,
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
