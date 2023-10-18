import * as fs from 'node:fs';

export const recreateDirectory = async (
  targetDirectory: string,
): Promise<void> => {
  let isExist = true;

  try {
    await fs.promises.access(targetDirectory, fs.constants.R_OK);
  } catch (_) {
    isExist = false;
  }

  if (isExist) {
    await fs.promises.rm(targetDirectory, { recursive: true, force: true });
  }

  await fs.promises.mkdir(targetDirectory, {
    recursive: true,
  });
};
