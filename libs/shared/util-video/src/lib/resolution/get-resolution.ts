import { DEFAULT_RESOLUTIONS } from './default-resolutions';
import { Resolution } from './resolution';

export const getResolution = (width: number, height: number): Resolution => {
  let i = 0;

  while (
    height > ((DEFAULT_RESOLUTIONS[i] && DEFAULT_RESOLUTIONS[i]?.height) || 0)
  ) {
    i++;
  }

  while (
    width > ((DEFAULT_RESOLUTIONS[i] && DEFAULT_RESOLUTIONS[i]?.width) || 0)
  ) {
    i++;
  }

  return DEFAULT_RESOLUTIONS[i] as Resolution;
};
