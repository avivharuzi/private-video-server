export const getFileNumber = (num: number): string => {
  return `${num + 1}`.padStart(4, '0');
};
