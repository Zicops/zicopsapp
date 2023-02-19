import moment from 'moment/moment';

export function displayDateTimeFromUnix(unixTime) {
  return moment.unix(unixTime).format('LLL');
}

export function displayDateFromUnix(unixTime) {
  return moment.unix(unixTime).format('dddd, MMMM Do - YYYY');
}
