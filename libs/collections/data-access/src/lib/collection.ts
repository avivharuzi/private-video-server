import { Video } from './video';

export interface Collection {
  id: string;

  name: string;

  directories: string[];

  videos: Video[];
}
