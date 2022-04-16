import { BrowseDirectory } from './browse-directory';
import { BrowseFile } from './browse-file';

export interface Browse {
  size: number;
  directories: BrowseDirectory[];
  files: BrowseFile[];
}
