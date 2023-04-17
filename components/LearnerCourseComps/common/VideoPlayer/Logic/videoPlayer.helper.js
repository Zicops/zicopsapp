import { atom } from 'recoil';

export const videoStateChangeList = {
  play: 'play',
  pause: 'pause',
  forward: 'forward',
  backward: 'backward',
  volumeUp: 'volumeUp',
  volumeDown: 'volumeDown',
  enterFullScreen: 'enterFullScreen',
  exitFullScreen: 'exitFullScreen',
  reload: 'reload',
  unmute: 'unmute',
  mute: 'mute',
  next: 'next',
  previous: 'previous',
};

export const VideoStateChangeAtom = atom({
  key: 'VideoStateChange',
  default: null,
});

export function getPlayerState(data) {
  return {
    videoSrc: data?.videoSrc || '',

    isPlaying: data?.isPlaying || false,
    isMute: data?.isMute || false,
    isFullScreen: data?.isFullScreen || false,

    volume: data?.volume || 0.7,
    speed: data?.speed || 1,

    progressPercent: data?.progressPercent || 0,
    timestamp: data?.timestamp || '00:00:00',
    duration: data?.duration || 0,
  };
}

export function playerStateReducer(state, action) {
  if (action.type?.includes('updateVideoData')) {
    return { ...state, videoSrc: action.payload.videoSrc };
  }

  if (action.type?.includes('updateProgress')) {
    return { ...state, ...action.payload };
  }

  if (action.type?.includes('updateVolume')) {
    return { ...state, volume: +action.payload?.volume || 0 };
  }

  if (action.type?.includes('togglePlaying')) {
    let _isPlaying = !state.isPlaying;

    if (typeof action?.payload?.isPlaying === 'boolean') _isPlaying = action.payload?.isPlaying;
    return { ...state, isPlaying: _isPlaying };
  }

  if (action.type?.includes('toggleFullScreen')) {
    let _isFullScreen = !state.isFullScreen;

    if (typeof action?.payload?.isFullScreen === 'boolean')
      _isFullScreen = action.payload?.isFullScreen;
    return { ...state, isFullScreen: _isFullScreen };
  }

  if (action.type?.includes('toggleMute')) {
    let _isMute = !state.isMute;

    if (typeof action?.payload?.isMute === 'boolean') _isMute = action.payload?.isMute;
    return { ...state, isMute: _isMute };
  }

  return state;
}
