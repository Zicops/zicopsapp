import { useEffect, useRef, useState } from 'react';
import ControlBar from '../../components/VideoPlayer/ControlBar';
import c from './c.module.scss';

export default function CustomVideo() {
  const videoElement = useRef(null);
  const videoContainer = useRef(null);
  const {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
    toggleMute,
    reloadVideo,
    moveVideoProgress,
    handleVolume,
    toggleFullScreen
  } = useVideoPlayer(videoElement, videoContainer);
  return (
    <div className={c.vidcontainer} ref={videoContainer}>
      {/* <div className="custom-ui-container">Custom Bar</div> */}

      <div className="video_wrapper">
        <video
          src="/videos/zicops-product-demo-learner-panel.mp4"
          ref={videoElement}
          onTimeUpdate={handleOnTimeUpdate}
          muted={playerState.isMuted}
        />
        <div className={c.controls}>
          <ControlBar
            isPause={playerState.isPlaying}
            reloadVideo={reloadVideo}
            handlePlay={togglePlay}
            handleFullScreen={toggleFullScreen}
            forwardVideo={() => moveVideoProgress(true)}
            backwardVideo={() => moveVideoProgress(false)}
            handleProgress={handleVideoProgress}
            progress={playerState.progress}
            isMute={playerState.isMuted}
            handleMute={toggleMute}
            handleVolume={handleVolume}
          />
        </div>
      </div>
    </div>
  );
}

function useVideoPlayer(videoElement, videoContainer) {
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    progress: 0,
    speed: 1,
    isMuted: false,
    volume: 0.8
  });

  const togglePlay = () => {
    setPlayerState({
      ...playerState,
      isPlaying: !playerState.isPlaying
    });
  };

  useEffect(() => {
    playerState.isPlaying ? videoElement.current.play() : videoElement.current.pause();
  }, [playerState.isPlaying, videoElement]);

  // useEffect(() => {
  //   console.log(playerState);
  // }, [playerState]);

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

    console.log(time);
    if (isForward) {
      time += 10;
      if (videoElement.current.duration < time) {
        time = videoElement.current.duration - 1;
      }
    } else {
      time -= 10;
      if (time < 0) time = 0;
      console.log(time);
    }

    console.log(time);
    videoElement.current.currentTime = time;
    setPlayerState({
      ...playerState,
      progress: time
    });
    // setVideoTime(time);
  }

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
    setPlayerState({
      ...playerState,
      volume: parseFloat(e.target.value / 100)
    });
    videoElement.current.volume = parseFloat(e.target.value / 100);
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
    toggleFullScreen
  };
}
