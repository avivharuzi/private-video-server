import {
  Browse,
  BrowseDirectory,
} from '@private-video-server/shared/data-access-browse';

export interface BrowseData {
  root?: Browse | undefined;
  current?: Browse | undefined;
  currentRootDirectory?: BrowseDirectory | undefined;
  currentDirectory?: BrowseDirectory | undefined;
  isCurrentDirectoryBelongToRoot?: boolean | undefined;
  history?: BrowseDirectory[] | undefined;
}
