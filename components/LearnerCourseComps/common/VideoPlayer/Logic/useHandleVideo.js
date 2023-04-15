import { theme } from '@/helper/theme.helper';
import { limitValueInRange } from '@/helper/utils.helper';
import { getSecondsToHMS } from '@/utils/date.utils';
import { toggleFullScreen } from '@/utils/general.utils';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  VideoStateChangeAtom,
  getPlayerState,
  playerStateReducer,
  videoStateChangeList,
} from './videoPlayer.helper';

export default function useHandleVideo(
  videoData = {},
  containerRef = null,
  getVideoData = () => {},
) {
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

    videoElem.onerror = () => {
      setIsBuffering(false);
      console.error(`Error ${videoElem?.error?.code}; details: ${videoElem?.error?.message}`);
    };

    return () => {
      videoElem.removeEventListener('loadstart', activateBuffer);
      videoElem.removeEventListener('canplay', deactivateBuffer);

      videoElem.removeEventListener('waiting', activateBuffer);
      videoElem.removeEventListener('playing', deactivateBuffer);
    };
  }, [videoData?.src]);

  // pass the data to parent via a callback function
  useEffect(() => {
    // https://stackoverflow.com/a/8685070 (answer for ready state)
    getVideoData({
      ...playerState,
      currentTime: videoRef?.current?.currentTime,
      isVideoLoaded: videoRef?.current?.readyState > 1,
    });

    setIsBuffering(videoRef?.current?.readyState < 2);
  }, [playerState, videoRef?.current?.readyState]);

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

    dispatch({ type: 'updateVideoData', payload: { videoSrc: videoData?.src } });
  }, [videoRef?.current, videoData?.src]);

  // set video time based on props
  useEffect(() => {
    if (!videoRef?.current) return;

    // restart video if the start time is close to video end time
    const isVideoAtEnd =
      !playerState?.videoSrc && videoData?.videoDuration - 3 < videoData?.startFrom;

    const startVideoTime = !!isVideoAtEnd ? 0 : videoData?.startFrom || 0;
    const isVideoStartTimeSet = videoRef?.current?.currentTime === startVideoTime;
    if (isVideoStartTimeSet) return;

    updateVideoProgress(startVideoTime, false);
  }, [videoData?.startFrom]);

  // move video time based on props
  useEffect(() => {
    if (!videoRef?.current) return;
    if (!videoData?.moveTimeBy) return;

    moveVideoProgressBy(+videoData?.moveTimeBy || 0);
  }, [videoData?.moveTimeBy]);

  // auto play video
  useEffect(() => {
    if (!videoData?.isAutoPlay) return;

    toggleIsPlaying(true);
  }, [videoData?.isAutoPlay, videoData?.src]);

  // update video element for play pause
  useEffect(() => {
    playerState?.isPlaying ? videoRef?.current?.play() : videoRef?.current?.pause();
  }, [playerState?.isPlaying]);

  // sync play pause state
  useEffect(() => {
    if (!videoRef?.current) return;
    if (videoRef?.current?.currentTime < videoData?.videoDuration && playerState?.isPlaying)
      return toggleIsPlaying(true);

    toggleIsPlaying(false);
  }, [videoRef?.current?.paused]);

  // play pause video based on props
  useEffect(() => {
    if (videoData?.pauseVideo == null) return;

    toggleIsPlaying(videoData?.pauseVideo);
  }, [videoData?.pauseVideo]);

  // sync volume and video
  useEffect(() => {
    if (playerState.volume <= 0 && !playerState.isMuted) return toggleMute(true);
    if (playerState.volume > 0 && playerState.isMuted) return toggleMute(false);
  }, [playerState.volume]);

  // reset video change state (center flash)
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

  // keyboard events
  function handleKeyDown(e) {
    e.preventDefault();
    e.stopPropagation();

    if (e.code === 'Space') return toggleIsPlaying();

    if (e.code === 'KeyR' && e.shiftKey) return updateVideoProgress(0);

    if (e.code === 'KeyP' && e.shiftKey && !!videoData?.handlePreviousClick)
      return videoData?.handlePreviousClick();
    if (e.code === 'KeyN' && e.shiftKey && !!videoData?.handleNextClick)
      return videoData?.handleNextClick();

    if (e.code === 'KeyF') return toggleVideoFullScreen();
    if (e.code === 'KeyM') return toggleMute();

    if (e.code === 'ArrowUp') return handleVolume(+playerState?.volume + 0.1);
    if (e.code === 'ArrowDown') return handleVolume(+playerState?.volume - 0.1);

    if (e.code === 'ArrowRight') return moveVideoProgressBy(10);
    if (e.code === 'ArrowLeft') return moveVideoProgressBy(-10);
  }

  function getProgressPercent() {
    const currentTime = +videoRef?.current?.currentTime || 0;
    const videoDuration = +videoRef?.current?.duration?.toFixed(2) || 0;
    const progress = +((currentTime / videoDuration) * 100).toFixed(2) || 0;

    return { currentTime, videoDuration, progress };
  }

  // update progressPercent on video progress
  const updateStateProgress = useCallback(() => {
    const { currentTime, videoDuration, progress } = getProgressPercent();

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
    (seconds = 0) => {
      videoRef.current.currentTime = seconds || 0;
    },
    [videoRef?.current],
  );

  // move forward or backward by seconds
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
      const _volume = limitValueInRange(+volume, 0, 1);
      dispatch({ type: 'updateVolume', payload: { volume: +_volume } });
      videoRef.current.volume = _volume;
      setVideoStateChange(
        _volume > 0 ? videoStateChangeList.volumeUp : videoStateChangeList.volumeDown,
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
    getProgressPercent,
    updateStateProgress,
    updateVideoProgress,
    toggleIsPlaying,
    moveVideoProgressBy,
    toggleVideoFullScreen,
    handleKeyDown,
    toggleMute,
    handleVolume,
    isBuffering,
  };
}
