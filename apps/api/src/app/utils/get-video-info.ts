import * as ffmpeg from 'fluent-ffmpeg';

export interface VideoInfo {
  width: number;
  height: number;
  duration: number;
  size: number;
}

export const getVideoInfo = (inputFilePath: string): Promise<VideoInfo> => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(inputFilePath, (error, data) => {
      if (error) {
        return reject(error);
      }

      const { duration, size } = data.format;

      const videoInfo: VideoInfo = {
        width: 0,
        height: 0,
        duration: duration || 0,
        size: size || 0,
      };

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
