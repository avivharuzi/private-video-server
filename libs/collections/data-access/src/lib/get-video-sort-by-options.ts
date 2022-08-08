import { VideoSortBy, VideoSortByOption } from './video';

export const getVideoSortByOptions = (): VideoSortByOption[] => [
  {
    label: 'New',
    value: VideoSortBy.CreatedAtDesc,
  },
  {
    label: 'Old',
    value: VideoSortBy.CreatedAtAsc,
  },
  {
    label: 'A-Z',
    value: VideoSortBy.TitleAsc,
  },
  {
    label: 'Z-A',
    value: VideoSortBy.TitleDesc,
  },
];
