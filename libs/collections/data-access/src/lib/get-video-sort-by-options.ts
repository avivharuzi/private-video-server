import { VideoSortBy, VideoSortByOption } from './video';

export const getVideoSortByOptions = (): VideoSortByOption[] => [
  {
    label: 'New',
    value: VideoSortBy.CreationDateDesc,
  },
  {
    label: 'Old',
    value: VideoSortBy.CreationAtAsc,
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
