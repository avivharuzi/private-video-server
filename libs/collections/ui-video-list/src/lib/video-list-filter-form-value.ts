import { VideoSortBy } from '@private-video-server/collections/data-access';

export interface VideoListFilterFormValue {
  searchTerm: string;
  sortBy: VideoSortBy;
}
