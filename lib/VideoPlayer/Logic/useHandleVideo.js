// components\common\VideoPlayer\Logic\useHandleVideo.js

import { formatSecondsToHMS, toggleFullScreen } from '@/helper/utils.helper';
import { useCallback, useEffect, useReducer, useRef } from 'react';
import { getPlayerState, playerStateReducer } from './videoPlayer.helper';

export default function useHandleVideo(videoData = {}, containerRef = null) {
  const [playerState, dispatch] = useReducer(
    playerStateReducer,
    getPlayerState()
  );
  const videoRef = useRef();
  const videoContainerRef = useRef();

  // update video element
  useEffect(() => {
    dispatch({
      type: 'updateVideoData',
      payload: {
        videoSrc: videoData?.src,
        videoType: videoData?.type || 'mp4',
      },
    });

    moveVideoProgressBy(videoData?.startFrom || 0);
    toggleIsPlaying(true);
  }, [videoData]);

  // update video element for play pause
  useEffect(() => {
    playerState?.isPlaying
      ? videoRef?.current?.play()
      : videoRef?.current?.pause();
  }, [playerState?.isPlaying]);

  // play or pause video
  const toggleIsPlaying = useCallback((isPlaying) => {
    const payload = {};
    if (typeof isPlaying === 'boolean') payload.isPlaying = isPlaying;
    dispatch({ type: 'togglePlaying', payload });
  }, []);

  // update progressPercent on video progress
  const updateStateProgress = useCallback(() => {
    const currentTime = +videoRef.current?.currentTime || 0;
    const videoDuration = +videoRef.current?.duration?.toFixed(2) || 0;
    const progress = +((currentTime / videoDuration) * 100).toFixed(2) || 0;

    dispatch({
      type: 'updateProgress',
      payload: {
        progressPercent: progress,
        timestamp: formatSecondsToHMS(currentTime),
        duration: videoDuration,
      },
    });
  }, [videoRef.current]);

  // update progressPercent on specific time
  const updateVideoProgress = useCallback(
    (progressPercent = 0) => {
      videoRef.current.currentTime = progressPercent;
    },
    [videoRef.current]
  );

  // update progressPercent on specific time
  const moveVideoProgressBy = useCallback(
    (secondsToAdd = 0) => {
      videoRef.current.currentTime =
        videoRef.current.currentTime + secondsToAdd;
    },
    [videoRef.current]
  );

  // update progressPercent on video progress
  const toggleVideoFullScreen = useCallback(() => {
    dispatch({
      type: 'toggleFullScreen',
      payload: toggleFullScreen(
        containerRef?.current || videoContainerRef?.current
      ),
    });
  }, [videoRef.current]);

  return {
    videoRef,
    videoContainerRef,
    playerState,
    updateStateProgress,
    updateVideoProgress,
    toggleIsPlaying,
    moveVideoProgressBy,
    toggleVideoFullScreen,
  };
}
