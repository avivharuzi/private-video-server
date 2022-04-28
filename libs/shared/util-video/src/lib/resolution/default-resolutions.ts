import { Resolution } from './resolution';

export const DEFAULT_RESOLUTIONS: Resolution[] = [
  {
    name: '240p',
    quality: 'VHS',
    width: 426,
    height: 240,
  },
  {
    name: '360p',
    quality: 'LD',
    width: 640,
    height: 360,
  },
  {
    name: '480p',
    quality: 'SD',
    width: 854,
    height: 480,
  },
  {
    name: '720p',
    quality: 'HD',
    width: 1280,
    height: 720,
  },
  {
    name: '1080p',
    quality: 'FHD',
    width: 1920,
    height: 1080,
  },
  {
    name: '1440p',
    quality: '2K',
    width: 2560,
    height: 1440,
  },
  {
    name: '2160p',
    quality: '4K',
    width: 4096,
    height: 2160,
  },
  {
    name: '4320p',
    quality: '8K',
    width: 7680,
    height: 4320,
  },
];
