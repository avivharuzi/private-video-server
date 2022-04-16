import * as path from 'node:path';

import * as ffmpeg from 'fluent-ffmpeg';

import { generateUUID } from './generate-uuid';

export const saveVideoCoverImage = (
  inputFilePath: string,
  directory: string
): Promise<string | null> => {
  return new Promise((resolve) => {
    const command = ffmpeg(inputFilePath);

    command.ffprobe((err, data) => {
      if (err) {
        return resolve(null);
      }

      const imagesStreams = data.streams.filter((stream) => {
        return stream.disposition && stream.disposition.attached_pic;
      });

      if (imagesStreams.length === 0) {
        return resolve(null);
      }

      const imageStream = imagesStreams[0];
      if (!imageStream) {
        return resolve(null);
      }

      const outputFilePath = path.join(
        directory,
        `${generateUUID()}-cover.jpg`
      );

      command
        .on('end', () => {
          resolve(outputFilePath);
        })
        .on('error', () => {
          resolve(null);
        })
        .addOptions('-map 0:' + imageStream.index)
        .saveToFile(outputFilePath);
    });
  });
};
