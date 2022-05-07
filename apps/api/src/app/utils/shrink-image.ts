import * as sharp from 'sharp';

export const shrinkImage = async (
  source: string | Buffer,
  outputFilePath: string
) => {
  return sharp(source)
    .jpeg({
      quality: 80,
    })
    .toFile(outputFilePath);
};
