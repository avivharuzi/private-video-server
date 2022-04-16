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
}
