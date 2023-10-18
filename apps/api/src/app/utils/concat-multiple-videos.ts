import * as os from 'node:os';

import ffmpeg from 'fluent-ffmpeg';

export const concatMultipleVideos = (
  inputFilePaths: string[],
  outputFilePath: string,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (inputFilePaths.length === 0) {
      return reject('inputFilePaths must have at least one input file path');
    }

    let command = ffmpeg(inputFilePaths[0]);

    if (inputFilePaths.length > 1) {
      inputFilePaths.forEach((inputFilePath, index) => {
        if (index === 0) {
          return;
        }

        command = command.input(inputFilePath);
      });
    }

    command
      .on('error', reject)
      .on('end', resolve)
      .mergeToFile(outputFilePath, os.tmpdir());
  });
};
