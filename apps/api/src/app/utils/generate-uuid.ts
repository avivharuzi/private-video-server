import * as uuid from 'uuid';

export const generateUUID = (): string => {
  return uuid.v4();
};
