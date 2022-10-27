import { Collection } from './collection';
import { VideoInfo } from './video-info';

export interface Video {
  id: string;
  title: string;
  filePath: string;
  info: VideoInfo;
  mediaDirectory: string;
  coverThumbnail: string | null;
  defaultThumbnail: string;
  thumbnails: string[];
  defaultPreview: string;
  previews: string[];
  collection: Collection;
  createdAt: Date;
  updatedAt: Date;
}

export interface VideoQueryParams {
  searchTerm: string;
  limit: number;
}

export enum VideoSortBy {
  TitleAsc = 'title-asc',
  TitleDesc = 'title-desc',
  CreatedAtAsc = 'created-at-asc',
  CreatedAtDesc = 'created-at-desc',
}

export interface VideoSortByOption {
  label: string;
  value: VideoSortBy;
}

export interface VideoHLS {
  src: string;
}
