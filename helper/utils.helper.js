export const years = [
  '2025',
  '2024',
  '2023',
  '2022',
  '2021',
  '2020',
  '2019',
  '2018',
  '2017',
  '2016',
  '2015'
];

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export function secondsToMinutes(seconds) {
  const min = ('0' + Math.floor(seconds / 60)).substr(-2);
  const sec = ('0' + Math.floor(seconds - min * 60)).substr(-2);

  // if seconds less than 60
  if (seconds < 60) return { minute: 0, second: Math.floor(seconds) };

  return { minute: min, second: sec };
}