import * as path from 'node:path';

import { concatMultipleVideos } from './concat-multiple-videos';
import { createVideoPreview } from './create-video-preview';
import { generateUUID } from './generate-uuid';
import { getFileNumber } from './get-file-number';
import { VideoInfo } from './get-video-info';

export interface CreateFullVideoPreviewOptions {
  videoInfo: VideoInfo;
  startPositionPercent: number;
  endPositionPercent: number;
  numberOfParts: number;
  eachPartTimeInSeconds: number;
  directory: string;
}

export interface CreateFullVideoPreviewOutput {
  filePaths: string[];
  videoPreviewFilePath: string;
}

export const createFullVideoPreview = async (
  inputFilePath: string,
  {
    videoInfo,
    startPositionPercent,
    endPositionPercent,
    numberOfParts,
    eachPartTimeInSeconds,
    directory,
  }: CreateFullVideoPreviewOptions
): Promise<CreateFullVideoPreviewOutput> => {
  const totalSeconds = Math.floor(videoInfo.duration); // 2000
  const minStartInSeconds = totalSeconds * (startPositionPercent / 100); // 100
  const maxEndInSeconds = totalSeconds * (endPositionPercent / 100); // 1900
  const eachFragmentInSeconds = Math.floor(
    (maxEndInSeconds - minStartInSeconds) / (numberOfParts - 1)
  ); // 180
  const fragments = Array(numberOfParts)
    .fill(null)
    .map((_, i) => minStartInSeconds + eachFragmentInSeconds * i); // [100, 280, ..., 1900]

  const createVideoPreviewPromises = fragments.map(
    (fragmentInSeconds, index) => {
      const outputFilePath = path.join(
        directory,
        `${generateUUID()}-${getFileNumber(index)}.mp4`
      );

      return createVideoPreview(inputFilePath, outputFilePath, {
        fragmentDurationInSeconds: eachPartTimeInSeconds,
        startTimeInSeconds: fragmentInSeconds,
      });
    }
  );

  const filePaths = await Promise.all(createVideoPreviewPromises);

  const videoPreviewFilePath = path.join(directory, `${generateUUID()}.mp4`);

  await concatMultipleVideos(filePaths, videoPreviewFilePath);

  return {
    filePaths,
    videoPreviewFilePath,
  };
};
