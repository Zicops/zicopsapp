// ----- FULLSCREEN
// return true if switched to fullscreen otherwise false
export function toggleFullScreen(elem) {
  if (!document.fullscreenElement) {
    openFullscreen(elem);
    return true;
  }

  closeFullscreen();
  return false;
}

/* View in fullscreen */
export function openFullscreen(elem) {
  if (elem?.requestFullscreen) return elem.requestFullscreen();
  if (elem?.webkitRequestFullscreen) return elem.webkitRequestFullscreen();
  if (elem?.msRequestFullscreen) return elem.msRequestFullscreen();

  return false;
}

/* Close fullscreen */
export function closeFullscreen() {
  if (document.exitFullscreen) return document.exitFullscreen();
  if (document.webkitExitFullscreen) return document.webkitExitFullscreen();
  if (document.msExitFullscreen) return document.msExitFullscreen();
}
