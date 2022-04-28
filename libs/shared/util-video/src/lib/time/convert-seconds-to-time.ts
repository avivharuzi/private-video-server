export const convertSecondsToTime = (seconds: number): string => {
  const totalSeconds = Math.floor(seconds);

  // If we less than 60 seconds we don't want to show 0 min, so it will be for example: 30 sec
  if (totalSeconds < 60) {
    return `${totalSeconds} sec`;
  }

  const totalMinutes = Math.floor(Math.floor(seconds) / 60);

  return `${totalMinutes} min`;
};
