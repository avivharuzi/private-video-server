import * as fs from 'node:fs';

export const isFileExists = (filePath: string): Promise<boolean> => {
  return fs.promises
    .access(filePath, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);
};
