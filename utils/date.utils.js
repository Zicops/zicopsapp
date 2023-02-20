import moment from 'moment/moment';

export function displayDateTimeFromUnix(unixTime) {
  return moment.unix(unixTime).format('LLL');
}

export function displayDateFromUnix(unixTime) {
  return moment.unix(unixTime).format('dddd, MMMM Do - YYYY');
}

export function getSecondsToHMS(seconds = 0) {
  const hrs = ('0' + Math.floor(seconds / (60 * 60))).substr(-2) || '00';

  const divisorForMinutes = seconds % (60 * 60);
  const mins = ('0' + Math.floor(divisorForMinutes / 60)).substr(-2) || '00';

  const divisorForSeconds = divisorForMinutes % 60;
  const sec = ('0' + Math.ceil(divisorForSeconds)).substr(-2) || '00';

  return `${hrs}:${mins}:${sec}`;
}
