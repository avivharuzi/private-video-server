import * as path from 'node:path';

import ffmpeg from 'fluent-ffmpeg';

import { generateUUID } from './generate-uuid';
import { getFileNumber } from './get-file-number';

export interface TakeScreenshotsOptions {
  count: number;
  directory: string;
  startPositionPercent: number;
  endPositionPercent: number;
}

export const takeScreenshots = async (
  filePath: string,
  {
    count,
    directory,
    startPositionPercent,
    endPositionPercent,
  }: TakeScreenshotsOptions,
): Promise<string[]> => {
  const timestamps: string[] = [];
  if (count < 2) {
    timestamps.push(`${startPositionPercent}%`);
  } else {
    const addPercent = Math.floor(
      (endPositionPercent - startPositionPercent) / (count - 1),
    );

    let i = 0;
    while (i < count) {
      timestamps.push(`${startPositionPercent + addPercent * i}%`);
      i = i + 1;
    }
  }

  const promises = timestamps.map((timestamp, index) => {
    return takeScreenshot(filePath, {
      timestamp,
      directory,
      outputFileName: `${generateUUID()}-${getFileNumber(index)}.jpg`,
    });
  });

  return Promise.all(promises);
};

export interface TakeScreenshotOptions {
  timestamp: string;
  directory: string;
  outputFileName: string;
}

export const takeScreenshot = (
  file: string,
  { timestamp, directory, outputFileName }: TakeScreenshotOptions,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    ffmpeg(file)
      .on('end', () => {
        resolve(path.join(directory, outputFileName));
      })
      .on('error', (err) => {
        reject(err);
      })
      .screenshots({
        count: 1,
        timemarks: [timestamp],
        folder: directory,
        filename: outputFileName,
      });
  });
};
