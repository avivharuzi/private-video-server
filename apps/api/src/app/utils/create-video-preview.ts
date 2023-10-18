import ffmpeg from 'fluent-ffmpeg';

export interface CreateVideoPreviewOptions {
  startTimeInSeconds: number;
  fragmentDurationInSeconds: number;
}

export const createVideoPreview = async (
  inputFilePath: string,
  outputFilePath: string,
  { startTimeInSeconds, fragmentDurationInSeconds }: CreateVideoPreviewOptions,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    return ffmpeg()
      .input(inputFilePath)
      .inputOptions([`-ss ${startTimeInSeconds}`])
      .outputOptions([`-t ${fragmentDurationInSeconds}`])
      .size('640x?')
      .videoBitrate(2000)
      .noAudio()
      .output(outputFilePath)
      .on('end', () => resolve(outputFilePath))
      .on('error', reject)
      .run();
  });
};
