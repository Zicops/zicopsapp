import { useEffect, useState } from 'react';

export default function useVideoPlayer(videoElement, videoContainer) {
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    progress: 0,
    speed: 1,
    isMuted: false,
    volume: 0.8
  });

  useEffect(() => {
    playerState.isPlaying ? videoElement.current.play() : videoElement.current.pause();
  }, [playerState.isPlaying, videoElement]);

  function togglePlay() {
    setPlayerState({
      ...playerState,
      isPlaying: !playerState.isPlaying
    });
  }

  // pass true or false
  function updateIsPlayingTo(play) {
    setPlayerState({
      ...playerState,
      isPlaying: !!play
    });
  }

  const handleOnTimeUpdate = () => {
    const progress = (videoElement.current.currentTime / videoElement.current.duration) * 100;
    setPlayerState({
      ...playerState,
      progress
    });
  };

  const handleVideoProgress = (event) => {
    const manualChange = Number(event.target.value);
    setVideoTime(manualChange);
  };

  function setVideoTime(time) {
    videoElement.current.currentTime = (videoElement.current.duration / 100) * time;
    setPlayerState({
      ...playerState,
      progress: time
    });
  }
  const handleVideoSpeed = (event) => {
    const speed = Number(event.target.value);
    videoElement.current.playbackRate = speed;
    setPlayerState({
      ...playerState,
      speed
    });
  };

  const toggleMute = () => {
    setPlayerState({
      ...playerState,
      isMuted: !playerState.isMuted
    });
  };

  function reloadVideo() {
    setVideoTime(0);
  }

  function moveVideoProgress(isForward) {
    let time = Math.floor(videoElement.current.currentTime);

    if (isForward) {
      time += 10;
      if (videoElement.current.duration < time) {
        time = videoElement.current.duration - 1;
      }
    } else {
      time -= 10;
      if (time < 0) time = 0;
    }

    videoElement.current.currentTime = time;
    setPlayerState({
      ...playerState,
      progress: time
    });
  }

  // fix fullscreen issue
  function toggleFullScreen() {
    console.log(videoContainer.current.fullscreenElement);
    if (!videoContainer.current.fullscreenElement) {
      videoContainer.current.requestFullscreen();
    } else {
      document.exitFullscreen();
      videoContainer.current.exitFullscreen();
    }
  }

  function handleVolume(e) {
    const volume = parseFloat(e.target.value / 100);

    setPlayerState({
      ...playerState,
      volume: volume
    });
    videoElement.current.volume = volume;
  }

  return {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
    toggleMute,
    reloadVideo,
    moveVideoProgress,
    handleVolume,
    toggleFullScreen,
    updateIsPlayingTo
  };
}
