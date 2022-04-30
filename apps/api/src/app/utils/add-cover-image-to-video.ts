import * as ffmpeg from 'fluent-ffmpeg';

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
      .addOutputOption('-y')
      .addOutputOption('-disposition:v:1', 'attached_pic')
      .on('end', () => {
        resolve(outputFilePath);
      })
      .on('error', reject)
      .saveToFile(outputFilePath);
  });
};
