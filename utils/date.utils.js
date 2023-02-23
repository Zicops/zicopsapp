import moment from 'moment/moment';

export function displayDateTimeFromUnix(unixTime) {
  return moment.unix(unixTime).format('LLL');
}

export function displayDateFromUnix(unixTime) {
  return moment.unix(unixTime).format('dddd, MMMM Do - YYYY');
}

// output 01:02:40
export function getSecondsToHMS(seconds = 0) {
  const hrs = ('0' + Math.floor(seconds / (60 * 60))).substr(-2) || '00';

  const divisorForMinutes = seconds % (60 * 60);
  const mins = ('0' + Math.floor(divisorForMinutes / 60)).substr(-2) || '00';

  const divisorForSeconds = divisorForMinutes % 60;
  const sec = ('0' + Math.ceil(divisorForSeconds)).substr(-2) || '00';

  return `${hrs}:${mins}:${sec}`;
}

// returns
// 23m 40s
// 02h 23m 40s
export function getCourseDisplayTime(durationInSeconds = 0) {
  const hours = `0${Math.floor(durationInSeconds / (60 * 60))}`.substr(-2) || '00';

  const divisorForMinutes = durationInSeconds % (60 * 60);
  const minutes = `0${Math.floor(divisorForMinutes / 60)}`.substr(-2) || '00';

  const divisorForSeconds = divisorForMinutes % 60;
  const seconds = `0${Math.ceil(divisorForSeconds)}`.substr(-2) || '00';

  const displayTime = `${minutes}m ${seconds}s`;
  const hrsWithUnits = `${hours}h `;

  if (hours == 0) return `${displayTime}`;

  return `${hrsWithUnits} ${displayTime}`;
}
