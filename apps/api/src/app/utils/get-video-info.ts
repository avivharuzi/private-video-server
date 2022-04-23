import { Logger } from '@nestjs/common';
import * as ffmpeg from 'fluent-ffmpeg';

export interface VideoInfo {
  width: number;
  height: number;
  duration: number;
  size: number;
}

export const getVideoInfo = (inputFilePath: string): Promise<VideoInfo> => {
  return new Promise((resolve) => {
    ffmpeg.ffprobe(inputFilePath, (error, data) => {
      const videoInfo: VideoInfo = {
        width: 0,
        height: 0,
        duration: 0,
        size: 0,
      };

      if (error) {
        Logger.error(error, `getVideoInfo, ${inputFilePath}`);

        return resolve(videoInfo);
      }

      const { duration, size } = data.format;

      if (duration) {
        videoInfo.duration = duration;
      }

      if (size) {
        videoInfo.size = size;
      }

      for (const stream of data.streams) {
        if (stream.codec_type !== 'video') {
          continue;
        }

        videoInfo.width = stream.width || 0;
        videoInfo.height = stream.height || 0;
        break;
      }

      resolve(videoInfo);
    });
  });
};
