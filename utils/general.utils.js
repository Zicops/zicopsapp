// ----- FULLSCREEN

import { queryClient } from '@/api/Queries';

// return true if switched to fullscreen otherwise false
export function toggleFullScreen(elem) {
  if (!document.fullscreenElement) {
    openFullscreen(elem);
    return true;
  }

  closeFullscreen();
  return false;
}

// View in fullscreen
export function openFullscreen(elem) {
  if (elem?.requestFullscreen) return elem.requestFullscreen();
  if (elem?.webkitRequestFullscreen) return elem.webkitRequestFullscreen();
  if (elem?.msRequestFullscreen) return elem.msRequestFullscreen();

  return false;
}

// Close fullscreen
export function closeFullscreen() {
  if (document.exitFullscreen) return document.exitFullscreen();
  if (document.webkitExitFullscreen) return document.webkitExitFullscreen();
  if (document.msExitFullscreen) return document.msExitFullscreen();
}

export function handleCacheUpdate(
  QUERY = null,
  variables = {},
  callbackFunc = (d) => d,
  client = queryClient,
) {
  try {
    client?.cache?.updateQuery({ query: QUERY, variables: variables }, callbackFunc);
  } catch (error) {
    console.error(`Error while updating cache: ${error}`);
  }
}
