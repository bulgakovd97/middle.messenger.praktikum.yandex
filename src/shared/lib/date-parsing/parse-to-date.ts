const months = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

export const parseToDate = (date: string | null | undefined) => {
  if (!date) return '';

  const day = new Date(date).getDate();

  const month = months[new Date(date).getMonth()];

  return `${day} ${month}`;
};
