import moment from 'moment';

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

export const years = Array.from(Array(new Date().getFullYear() - 1969), (_, i) =>
  (i + 1970).toString()
);

export function displayUnixDate(unixTime) {
  if (!unixTime) return '';

  return moment.unix(unixTime).format('MMM Do, YYYY (dddd)');
}

export function getYearsFromNow(numberOfYearsFromNow) {
  let currentYear = new Date().getFullYear();
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

export function getCourseDisplayTime(durationInSeconds = 0) {
  const hours = Math.floor(durationInSeconds / (60 * 60));

  const divisor_for_minutes = durationInSeconds % (60 * 60);
  const minutes = Math.ceil(divisor_for_minutes / 60);

  const minsWithUnits = `${minutes} min${minutes < 2 ? '' : 's'}`;
  const hrsWithUnits = `${hours} hr${hours < 2 ? '' : 's'}`;

  if (hours == 0) return `${minsWithUnits}`;

  return `${hrsWithUnits} ${minsWithUnits}`;
}

export function secondsToHMS(secs, showHour = true) {
  const hours = ('0' + Math.floor(secs / (60 * 60))).substr(-2) || '00';

  const divisor_for_minutes = secs % (60 * 60);
  const minutes = ('0' + Math.floor(divisor_for_minutes / 60)).substr(-2) || '00';

  const divisor_for_seconds = divisor_for_minutes % 60;
  const seconds = ('0' + Math.ceil(divisor_for_seconds)).substr(-2) || '00';

  if (hours == '00' && showHour) return `${minutes}:${seconds}`;
  return `${hours}:${minutes}:${seconds}`;
}

export function displayMinToHMS(mins) {
  if (!mins) return '00 mins';
  if (mins < 60) return `${Math.ceil(mins)} mins`;

  const hours = ('0' + Math.floor(mins / 60)).substr(-2) || '00';
  const divisor_for_minutes = mins % 60;
  const minutes = ('0' + Math.floor(divisor_for_minutes / 60)).substr(-2) || '00';
  const divisor_for_seconds = divisor_for_minutes % 60;
  const seconds = ('0' + Math.ceil(divisor_for_seconds)).substr(-2) || '00';

  return `${hours}:${minutes}:${seconds} hrs`;
}

export const TableResponsiveRows = [
  {
    breakpoint: 1200,
    pageSize: 7
  },
  {
    breakpoint: 1500,
    pageSize: 7
  },
  {
    breakpoint: 1900,
    pageSize: 7
  }
];

export function getPageSizeBasedOnScreen() {
  const defaultPageSize = 7;
  if (!process.browser) return defaultPageSize;

  const screenWidth = window.screen.width;
  let pageSize = defaultPageSize;

  TableResponsiveRows.forEach((r) => {
    if (r.breakpoint <= screenWidth) pageSize = r.pageSize;
  });

  return pageSize;
}

// difficulty string to number mapping
export const DIFFICULTY = {
  Beginner: [1, 2, 3],
  Competent: [4, 5, 6, 7],
  Proficient: [8, 9, 10]
};

// ----- FULLSCREEN
/* View in fullscreen */
export function openFullscreen(elem) {
  if (elem?.requestFullscreen) return elem.requestFullscreen();

  /* Safari */
  if (elem?.webkitRequestFullscreen) return elem.webkitRequestFullscreen();

  /* IE11 */
  if (elem?.msRequestFullscreen) return elem.msRequestFullscreen();

  return false;
}

/* Close fullscreen */
export function closeFullscreen() {
  if (document.exitFullscreen) return document.exitFullscreen();

  /* Safari */
  if (document.webkitExitFullscreen) return document.webkitExitFullscreen();

  /* IE11 */
  if (document.msExitFullscreen) return document.msExitFullscreen();
}

// return true if switched to fullscreen otherwise false
export function toggleFullScreen(elem) {
  if (!document.fullscreenElement) {
    openFullscreen(elem);

    return true;
  }

  closeFullscreen();
  return false;
}

export function getUnixFromDate(dateObj = new Date()) {
  //implemented for unix timestamp
  if (!(dateObj instanceof Date)) return dateObj;

  const newDate = new Date(dateObj);

  return Math.floor(newDate.getTime() / 1000) || 0;
}

export async function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

export function limitValueInRange(value, min = 0, max = 100) {
  if (typeof value !== 'number') return 0;
  return Math.max(Math.min(value, max), min);
}

export async function generateVideoThumbnails(videoData, thumbnailsGap, duration) {
  let thumbnail = [];
  let fractions = [];
  for (let i = 0; i <= duration; i += thumbnailsGap) {
    fractions.push(Math.floor(i));
  }
  // fractions.map(async (time) => {
  //   let oneThums = await getVideoThumbnail(videoData, time);
  //   thumbnail.push(oneThums);
  // });
  return thumbnail;
}
async function getVideoThumbnail(videoData, videoTimeInSeconds) {
  return new Promise((resolve, reject) => {
    const SRC = `/api/overrideCors?filePath=${encodeURIComponent(videoData.videoSrc)}`;
    const video = document.createElement('video');

    var timeupdate = function () {
      if (snapImage()) {
        video.removeEventListener('timeupdate', timeupdate);
        video.pause();
      }
    };
    video.addEventListener('loadeddata', function () {
      if (snapImage()) {
        video.removeEventListener('timeupdate', timeupdate);
      }
    });
    var snapImage = function () {
      var canvas = document.createElement('canvas');
      var scaleFactor = 0.2;
      canvas.width = video.videoWidth * scaleFactor;
      canvas.height = video.videoHeight * scaleFactor;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
      var image = canvas.toDataURL();
      var success = image.length > 10000;
      if (success) {
        URL.revokeObjectURL(SRC);
        resolve(image);
      }
      return success;
    };
    video.addEventListener('timeupdate', timeupdate);
    video.preload = 'metadata';
    video.src = SRC;
    // Load video in Safari / IE11
    video.muted = true;
    video.playsInline = true;
    video.currentTime = videoTimeInSeconds;
    video.play();
    // console.log(video.currentTime, videoTimeInSeconds);
  });
}

export function getFileNameFromUrl(fileUrl) {
  if (!fileUrl) return '';

  return decodeURI(fileUrl?.split('?')?.[0]?.split('/')?.pop());
}

export function getEncodedFileNameFromUrl(fileUrl) {
  if (!fileUrl) return '';
  const fileName = fileUrl?.split('?')?.[0]?.split('/')?.pop();

  const decodedString = Buffer.from(decodeURI(fileName), 'base64')?.toString();
  const encodedString = Buffer.from(decodedString)?.toString('base64');

  // return decoded value if it is base64 encoded
  if (fileName === encodedString) return decodedString;

  return fileName;
}

// https://stackoverflow.com/a/23013574
export function downloadFileFromURI(uri, downloadFileName) {
  var link = document.createElement('a');

  link.setAttribute('download', downloadFileName);
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  link.remove();
  return true;
}

export function parseJson(stringifiedJson) {
  if (!stringifiedJson) return '';
  try {
    return JSON.parse(stringifiedJson);
  } catch (err) {
    console.log(err);
    return '';
  }
}

// https://stackoverflow.com/a/7195540/13419786
export function getUnixTimeAt(hours = 7, minutes = 0, seconds = 0) {
  const now = new Date();

  // now.setHours(hours);
  // now.setMinutes(minutes);
  // now.setSeconds(seconds);

  const unixTimestamp = Math.floor(now / 1000);
  return unixTimestamp;
}

export function getDateTimeFromUnix(unixTimestamp) {
  if (!+unixTimestamp) return '';
  // https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript#:~:text=let%20unix_timestamp%20%3D%201549312452,console.log(formattedTime)%3B
  const d = new Date(unixTimestamp * 1000);

  return `${d.toLocaleString()}`;
}

export function isWordIncluded(sentence = '', word = '') {
  return sentence?.trim()?.toLowerCase()?.includes(word?.trim()?.toLowerCase());
}

export function isWordSame(firstWord = '', secondWord = '') {
  if (!firstWord) return false;
  if (!secondWord) return false;

  return firstWord?.trim()?.toLowerCase() === secondWord?.trim()?.toLowerCase();
}

export function getMinCourseAssignDate(durationInSec = null) {
  let date = new Date().setDate(new Date().getDate() + 1);
  if (!durationInSec) return date;
  date = new Date(new Date().getTime() + durationInSec * 1000).setDate(new Date().getDate() + 1);
  return date;
}

export function isDatesSame(date1 = new Date(), date2 = new Date()) {
  if (date1?.getDate() !== date2?.getDate()) return false;
  if (date1?.getMonth() !== date2?.getMonth()) return false;
  if (date1?.getFullYear() !== date2?.getFullYear()) return false;

  return true;
}

export function getCurrentHost() {
  return process.browser && window?.location?.host ? window.location.host : 'zicops.com';
}

export function logger() {
  const pub = {};
  if (!process.browser) return null;
  if (!window?.consoleLog) window.consoleLog = console.log;

  pub.enableLogger = function enableLogger() {
    console.log = window?.consoleLog;
  };

  pub.disableLogger = function disableLogger() {
    if (!window?.consoleLog) window.consoleLog = console.log;
    console.log = function () {};
  };

  return pub;
}
