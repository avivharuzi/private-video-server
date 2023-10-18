import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';

import { Injectable } from '@nestjs/common';

import { Browse } from '@private-video-server/shared/data-access-browse';

@Injectable()
export class BrowseService {
  async findAll(startPath = '/', includingFiles = true): Promise<Browse> {
    if (startPath === '/' && os.platform() === 'win32') {
      startPath = `${process.cwd().split(path.sep)[0]}//`;
    }

    const browse: Browse = {
      size: 0,
      directories: [],
      files: [],
    };

    const directories = await fs.promises.readdir(
      path.join(decodeURIComponent(startPath)),
    );

    for (const directory of directories) {
      const directoryPath = path.join(startPath, directory);

      let stat;

      try {
        stat = await fs.promises.lstat(directoryPath);
      } catch (_) {
        // Probably the directory does not exist anymore...
        continue;
      }

      // In case we don't want to include files.
      if (!stat.isDirectory() && !includingFiles) {
        continue;
      }

      try {
        await fs.promises.access(directoryPath, fs.constants.R_OK);
      } catch (_) {
        // Directory or file is not readable...
        continue;
      }

      browse.size++;

      const name = path.basename(directoryPath);

      const browseCommonProperties = {
        name,
        path: directoryPath,
      };

      if (stat.isDirectory()) {
        browse.directories.push({ ...browseCommonProperties });
      } else {
        browse.files.push({ ...browseCommonProperties });
      }
    }

    return browse;
  }
}
