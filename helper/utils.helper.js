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

export function getYearsFromNow(numberOfYearsFromNow) {
  const currentYear = new Date().getFullYear();
  const years = [currentYear];
  for (let i = 0; i < numberOfYearsFromNow; i++) {
    years.push(++currentYear);
  }

  return years;
}

export function secondsToMinutes(seconds) {
  const min = ('0' + Math.floor(seconds / 60)).substr(-2);
  const sec = ('0' + Math.floor(seconds - min * 60)).substr(-2);

  // if seconds less than 60
  if (seconds < 60) return { minute: 0, second: Math.floor(seconds) };

  return { minute: min, second: sec };
}

export const TableResponsiveRows = [
  {
    breakpoint: 1200,
    pageSize: 5
  },
  {
    breakpoint: 1500,
    pageSize: 7
  },
  {
    breakpoint: 1900,
    pageSize: 12
  }
];

export function getPageSizeBasedOnScreen() {
  if (!process.browser) return 6;

  const screenWidth = window.screen.width;
  let pageSize = 6;

  TableResponsiveRows.forEach((r) => {
    if (r.breakpoint <= screenWidth) pageSize = r.pageSize;
  });

  return pageSize;
}

// difficulty string to number mapping
export const DIFFICULTY = {
  Beginner: [0, 1, 2, 3],
  Competent: [4, 5, 6, 7],
  Proficient: [8, 9, 10]
};
