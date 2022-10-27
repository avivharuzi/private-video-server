import * as path from 'node:path';

import * as ffmpeg from 'fluent-ffmpeg';

export interface CreateHLSStreamOptions {
  name: string;
  targetDir: string;
}

export const createHLSStream = (
  inputFilePath: string,
  { name, targetDir }: CreateHLSStreamOptions
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const m3u8FileName = `${name}-master.m3u8`;
    const m3u8FilePath = path.join(targetDir, m3u8FileName);
    const hlsSegmentFilename = path.join(targetDir, `${name}-part-%03d.ts`);

    ffmpeg()
      .input(inputFilePath)
      .inputOptions(['-hide_banner', '-y'])
      .outputOptions([
        '-c copy',
        '-sc_threshold 0',
        '-g 48',
        '-keyint_min 48',
        '-hls_time 2',
        '-hls_playlist_type vod',
        `-hls_segment_filename ${hlsSegmentFilename}`,
      ])
      .output(m3u8FilePath)
      .on('end', () => {
        resolve(m3u8FileName);
      })
      .on('error', reject)
      .run();
  });
};
