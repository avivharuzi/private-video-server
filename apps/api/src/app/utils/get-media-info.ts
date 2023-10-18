import * as fs from 'node:fs';

import MediaInfoFactory from 'mediainfo.js';
import { FormatType, MediaInfo, ReadChunkFunc } from 'mediainfo.js';

export interface MediaInfoOptions {
  coverData: boolean;
  format: FormatType;
  full: boolean;
}

export const getDefaultMediaInfoOptions = (): MediaInfoOptions => {
  return {
    coverData: false,
    format: 'JSON',
    full: false,
  };
};

export type MediaInfoFormatted = Record<string, Record<string, string>>;

export const getMediaInfo = async (
  inputFilePath: string,
  options: Partial<MediaInfoOptions> = {},
) => {
  const mergedOptions: MediaInfoOptions = {
    ...getDefaultMediaInfoOptions(),
    ...options,
  };

  let fileHandle: fs.promises.FileHandle | undefined;
  let fileSize: number;
  let mediainfo: MediaInfo | undefined;
  let result: string;

  const readChunk: ReadChunkFunc = async (size, offset) => {
    const buffer = new Uint8Array(size);
    await (fileHandle as fs.promises.FileHandle).read(buffer, 0, size, offset);
    return buffer;
  };

  try {
    fileHandle = await fs.promises.open(inputFilePath, 'r');
    fileSize = (await fileHandle.stat()).size;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mediainfo = await MediaInfoFactory(mergedOptions);
    result = (await mediainfo?.analyzeData(
      () => fileSize,
      readChunk,
    )) as string;
  } finally {
    fileHandle && (await fileHandle.close());
    mediainfo && mediainfo.close();
  }

  return result;
};

export const getMediaInfoFormatted = async (
  inputFilePath: string,
): Promise<MediaInfoFormatted> => {
  const text = await getMediaInfo(inputFilePath, {
    format: 'text',
  });

  let hasToCheckGroup = true;
  let lastGroupName = '';
  const result: MediaInfoFormatted = {};

  const lines = text.split('\n');

  lines.forEach((line) => {
    const lineText = line.trim();

    if (lineText === '') {
      hasToCheckGroup = true;
      return;
    }

    if (hasToCheckGroup) {
      lastGroupName = lineText;
      result[lastGroupName] = {};
      hasToCheckGroup = false;
      return;
    }

    const textValues = lineText.split(': ');

    if (textValues.length !== 2) {
      return;
    }

    const key = (textValues[0] as string).trim();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    result[lastGroupName][key] = (textValues[1] as string).trim();
  });

  return result;
};
