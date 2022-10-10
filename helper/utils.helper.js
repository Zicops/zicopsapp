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
  if (mins < 60) return `${mins} mins`;

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
  fractions.map(async (time) => {
    let oneThums = await getVideoThumbnail(videoData, time);
    thumbnail.push(oneThums);
  });
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
    console.log(video.currentTime, videoTimeInSeconds);
  });
}

export function getFileNameFromUrl(fileUrl) {
  if (!fileUrl) return '';

  return decodeURI(fileUrl?.split('?')?.[0]?.split('/')?.pop());
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
