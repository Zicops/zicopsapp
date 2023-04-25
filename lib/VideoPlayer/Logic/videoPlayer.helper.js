export function getPlayerState(data) {
  return {
    videoSrc: data?.videoSrc || '',
    videoType: data?.videoType || 'mp4',

    isPlaying: data?.isPlaying || false,
    isMuted: data?.isMuted || false,
    isFullScreen: data?.isFullScreen || false,

    volume: data?.volume || 0.7,
    speed: data?.speed || 1,

    progressPercent: data?.progressPercent || 0,
    timestamp: data?.timestamp || '00:00',
    duration: data?.duration || 0,
  };
}

export function playerStateReducer(state, action) {
  if (action.type?.includes('updateVideoData')) {
    return {
      ...state,
      videoSrc: action.payload.videoSrc,
      videoType: action.payload.videoType,
    };
  }

  if (action.type?.includes('updateProgress')) {
    return { ...state, ...action.payload };
  }

  if (action.type?.includes('togglePlaying')) {
    let _isPlaying = !state.isPlaying;

    if (typeof action?.payload === 'boolean') _isPlaying = action.payload;
    return { ...state, isPlaying: _isPlaying };
  }

  if (action.type?.includes('toggleFullScreen')) {
    let _isFullScreen = !state.isFullScreen;

    if (typeof action?.payload === 'boolean') _isFullScreen = action.payload;
    return { ...state, isFullScreen: _isFullScreen };
  }

  return state;
}
