import { VideoInfo } from './video-info';

export interface Video {
  title: string;
  filePath: string;
  info: VideoInfo;
  mediaDirectory: string;
  defaultThumbnail: string;
  thumbnails: string[];
  defaultPreview: string;
  previews: string[];
}
