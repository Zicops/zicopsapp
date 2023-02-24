import { theme } from '@/helper/theme.helper';
import { getSecondsToHMS } from '@/utils/date.utils';
import { toggleFullScreen } from '@/utils/general.utils';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  getPlayerState,
  playerStateReducer,
  VideoStateChangeAtom,
  videoStateChangeList,
} from './videoPlayer.helper';

export default function useHandleVideo(videoData = {}, containerRef = null) {
  const [playerState, dispatch] = useReducer(playerStateReducer, getPlayerState());
  const videoRef = useRef();
  const canvasRef = useRef();
  const videoContainerRef = useRef();
  const [isBuffering, setIsBuffering] = useState(false);

  const [videoStateChange, setVideoStateChange] = useRecoilState(VideoStateChangeAtom);

  // initial video load setup
  useEffect(() => {
    const videoElem = videoRef?.current;
    if (!videoElem) return;

    function activateBuffer() {
      setIsBuffering(true);
    }
    function deactivateBuffer() {
      setIsBuffering(false);
    }

    videoElem.addEventListener('loadstart', activateBuffer);
    videoElem.addEventListener('canplay', deactivateBuffer);

    videoElem.addEventListener('waiting', activateBuffer);
    videoElem.addEventListener('playing', deactivateBuffer);

    videoElem?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' });

    return () => {
      videoElem.removeEventListener('loadstart', activateBuffer);
      videoElem.removeEventListener('canplay', deactivateBuffer);

      videoElem.removeEventListener('waiting', activateBuffer);
      videoElem.removeEventListener('playing', deactivateBuffer);
    };
  }, [videoData?.src]);

  // for displaying video buffer loaded
  useEffect(() => {
    if (!canvasRef?.current) return;
    const videoElem = videoRef?.current;

    drawProgress(canvasRef?.current, videoElem?.buffered, videoElem?.duration);
  }, [videoRef?.current?.buffered]);

  // update video element
  useEffect(() => {
    if (!videoRef?.current) return;
    if (!videoData?.src) return;

    dispatch({
      type: 'updateVideoData',
      payload: { videoSrc: videoData?.src },
    });

    setIsBuffering(true);
    moveVideoProgressBy(videoData?.startFrom || 0, false);
    setIsBuffering(false);
  }, [videoRef?.current, videoData?.src, videoData?.startFrom]);

  // auto play video
  useEffect(() => {
    if (!videoData?.isAutoPlay) return;

    toggleIsPlaying(true);
  }, [videoData?.isAutoPlay, videoData?.src]);

  // update video element for play pause

  useEffect(() => {
    if (videoRef?.current?.paused && playerState?.isPlaying)
      return videoRef?.current?.play().catch((e) => toggleIsPlaying(false));

    playerState?.isPlaying ? videoRef?.current?.play() : videoRef?.current?.pause();
  }, [playerState?.isPlaying, videoRef?.current?.paused]);

  // sync volume and video
  useEffect(() => {
    if (playerState.volume <= 0 && !playerState.isMuted) return toggleMute(true);
    if (playerState.volume > 0 && playerState.isMuted) return toggleMute(false);
  }, [playerState.volume]);

  // reset video change state
  useEffect(() => {
    let timeout = null;
    if (!videoStateChange) return clearTimeout(timeout);
    timeout = setTimeout(() => setVideoStateChange(null), 1500);

    return () => clearTimeout(timeout);
  }, [videoStateChange]);

  // play or pause video
  const toggleIsPlaying = useCallback(
    (isPlaying) => {
      const payload = {};
      if (typeof isPlaying === 'boolean') payload.isPlaying = isPlaying;
      dispatch({ type: 'togglePlaying', payload });

      const _isPlaying = playerState.isPlaying;
      setVideoStateChange(
        payload.isPlaying || _isPlaying ? videoStateChangeList.pause : videoStateChangeList.play,
      );
    },
    [playerState.isPlaying],
  );

  // update progressPercent on video progress
  const updateStateProgress = useCallback(() => {
    const currentTime = +videoRef?.current?.currentTime || 0;
    const videoDuration = +videoRef?.current?.duration?.toFixed(2) || 0;
    const progress = +((currentTime / videoDuration) * 100).toFixed(2) || 0;

    dispatch({
      type: 'updateProgress',
      payload: {
        progressPercent: progress,
        timestamp: getSecondsToHMS(currentTime),
        duration: videoDuration,
      },
    });
  }, [videoRef?.current?.currentTime]);

  // update progressPercent on specific time
  const updateVideoProgress = useCallback(
    (progressPercent = 0) => {
      videoRef.current.currentTime = progressPercent;
    },
    [videoRef?.current],
  );

  // update progressPercent on specific time
  const moveVideoProgressBy = useCallback(
    (secondsToAdd = 0, showCenterIcon = true) => {
      videoRef.current.currentTime = videoRef?.current?.currentTime + secondsToAdd;

      if (!showCenterIcon) return;

      setVideoStateChange(
        secondsToAdd > 0 ? videoStateChangeList.forward : videoStateChangeList.backward,
      );
    },
    [videoRef?.current],
  );

  // update progressPercent on video progress
  const toggleVideoFullScreen = useCallback(() => {
    const _isFullScreen = toggleFullScreen(containerRef?.current || videoContainerRef?.current);
    dispatch({ type: 'toggleFullScreen', payload: _isFullScreen });
    setVideoStateChange(
      _isFullScreen ? videoStateChangeList.enterFullScreen : videoStateChangeList.exitFullScreen,
    );
  }, [videoRef?.current]);

  const toggleMute = useCallback(
    (isMute) => {
      const payload = {};
      if (typeof isPlaying === 'boolean') payload.isMute = isMute;
      dispatch({ type: 'toggleMute', payload });

      const _isMute = playerState.isMute;
      setVideoStateChange(
        !(payload.isMute || _isMute) ? videoStateChangeList.mute : videoStateChangeList.unmute,
      );
    },
    [videoRef?.current, playerState.isMute],
  );

  const handleVolume = useCallback(
    (volume) => {
      dispatch({ type: 'updateVolume', payload: { volume: +volume } });
      videoRef.current.volume = volume;
      setVideoStateChange(
        volume > 0 ? videoStateChangeList.volumeUp : videoStateChangeList.volumeDown,
      );
    },
    [videoRef?.current],
  );

  // https://stackoverflow.com/a/45720576/13419786
  function drawProgress(canvas, buffered, duration) {
    // I've turned off anti-aliasing since we're just drawing rectangles.
    var context = canvas.getContext('2d', { antialias: false });
    context.fillStyle = theme.secondaryWhite;

    var width = canvas.width;
    var height = canvas.height;
    if (!width || !height) throw "Canvas's width or height weren't set!";
    context.clearRect(0, 0, width, height); // clear canvas

    for (var i = 0; i < buffered.length; i++) {
      var leadingEdge = (buffered.start(i) / duration) * width;
      var trailingEdge = (buffered.end(i) / duration) * width;
      context.fillRect(leadingEdge, 0, trailingEdge - leadingEdge, height);
    }
  }

  return {
    videoRef,
    canvasRef,
    videoContainerRef,
    playerState,
    updateStateProgress,
    updateVideoProgress,
    toggleIsPlaying,
    moveVideoProgressBy,
    toggleVideoFullScreen,
    toggleMute,
    handleVolume,
    isBuffering,
  };
}
