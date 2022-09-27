export type MediaInfoFormatted = Record<string, Record<string, string>>;

export type MediaInfo = MediaInfoGroup[];

export interface MediaInfoGroup {
  name: string;
  details: MediaInfoDetail[];
}

export interface MediaInfoDetail {
  key: string;
  value: string;
}
