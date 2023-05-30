export const parseToTime = (time: string | null | undefined) => {
  if (!time) return '';

  const hours = new Date(time).getHours();
  const minutes = new Date(time).getMinutes();
  const resultMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours}:${resultMinutes}`;
};
