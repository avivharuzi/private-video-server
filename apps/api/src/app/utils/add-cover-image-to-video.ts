import * as fs from 'node:fs';
import * as path from 'node:path';

import * as ffmpeg from 'fluent-ffmpeg';

import { generateUUID } from './generate-uuid';

export interface AddCoverImageToVideoWithBufferOptions {
  coverImage: string | Buffer;
  coverImageFileName: string;
  coverImageDirectory: string;
}

export const addCoverImageToVideo = (
  inputFilePath: string,
  outputFilePath: string,
  coverImageFilePath: string
) => {
  return new Promise((resolve, reject) => {
    ffmpeg(inputFilePath)
      .addOutputOption('-i', coverImageFilePath)
      .addOutputOption('-map', '0')
      .addOutputOption('-map', '1')
      .addOutputOption('-c', 'copy')
      .addOutputOption('-disposition:v:1', 'attached_pic')
      .on('end', () => {
        resolve(outputFilePath);
      })
      .on('error', reject)
      .saveToFile(outputFilePath);
  });
};

export const addCoverImageToVideoWithBuffer = async (
  inputFilePath: string,
  {
    coverImage,
    coverImageFileName,
    coverImageDirectory,
  }: AddCoverImageToVideoWithBufferOptions
): Promise<void> => {
  const inputFilePathParse = path.parse(inputFilePath);

  const outputFilePath = path.join(
    inputFilePathParse.dir,
    `${generateUUID()}-temp-${inputFilePathParse.base}`
  );

  let coverImageFilePath: string;
  if (typeof coverImage === 'string') {
    coverImageFilePath = coverImage;
  } else {
    coverImageFilePath = path.join(
      coverImageDirectory,
      `${generateUUID()}-temp-${coverImageFileName}`
    );
    await fs.promises.writeFile(coverImageFilePath, coverImage);
  }

  await addCoverImageToVideo(inputFilePath, outputFilePath, coverImageFilePath);

  await fs.promises.rename(outputFilePath, inputFilePath);

  await fs.promises.rm(coverImageFilePath);
};
