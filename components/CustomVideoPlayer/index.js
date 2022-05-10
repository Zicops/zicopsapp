import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { VideoAtom } from '../../state/atoms/video.atom';
import CenterFlash from './CenterFlash';
import ControlBar from './ControlBar';
import styles from './customVideoPlayer.module.scss';
import useVideoPlayer from './Logic/useHandleVideo';
import UiComponents from './UiComponents';
import VideoPlayer from './VideoPlayer';

export default function CustomVideo({ set }) {
  const [videoData, setVideoData] = useRecoilState(VideoAtom);

  const { isPreview, topicContent, currentTopicContentIndex } = videoData;
  const [showBingeButtons, setShowBingeButtons] = useState(false);

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
    toggleFullScreen,
    updateIsPlayingTo,
    playPauseActivated,
    handleKeyDownEvents,
    hideControls,
    hideTopBar,
    handleMouseExit,
    handleMouseMove,
    seek,
    tooltip,
    playNextVideo,
    playPreviousVideo
  } = useVideoPlayer(videoElement, videoContainer, videoData.type);

  useEffect(() => {
    set(true);

    // if (videoData.allModuleTopic && skipVideoTimer) {
    //   const duration = videoElement.current?.duration;
    //   const isFromStart = videoData.topicContent[0].nextShowTime > 0;
    //   const timeToWait = isFromStart
    //     ? videoData.topicContent[0].nextShowTime * 1000
    //     : (duration - videoData.topicContent[0].fromEndTime) * 1000;

    //   console.log('play in progress', parseInt(skipVideoTimer) * 60 + 5000);

    //   setTimeoutState(
    //     setTimeout(() => {
    //       if (!timeoutState) {
    //         console.log('next will play');
    //         playNextVideo();
    //         skipVideoTimer = null;
    //       }
    //     }, timeToWait + 5000)
    //   );
    // }

    // reset video progress when unmounted
    return () => handleMouseMove({ target: { value: 0 } });
  }, []);

  useEffect(() => {
    setShowBingeButtons(false);
    console.log('src updated', videoData.videoSrc);
  }, [videoData.videoSrc]);

  useEffect(() => {
    videoContainer.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    });
    console.log(videoData);
  }, [videoData]);

  // turn off video player if preview video ends
  useEffect(() => {
    if (isPreview && playerState.progress === 100) {
      set(false);
    }

    // console.log(videoElement.current, playerState);
    // autoplay next video
    if (playerState.progress === 100) playNextVideo();

    // add logic for preventing binge button for last video
    if (topicContent && showBingeButtons !== null) {
      const isStartTime = topicContent[0]?.nextShowTime > 0;
      const buttonShowTime = isStartTime
        ? topicContent[currentTopicContentIndex]?.nextShowTime
        : topicContent[currentTopicContentIndex]?.fromEndTime;

      // console.log(buttonShowTime, videoElement.current?.currentTime);
      if (buttonShowTime === 0) return;
      setShowBingeButtons(buttonShowTime < videoElement.current?.currentTime);
    }
  }, [playerState.progress]);

  // binge logic
  let timeout = null;
  useEffect(() => {
    // start 5 sec timer to play next video
    if (showBingeButtons) {
      timeout = setTimeout(() => {
        setShowBingeButtons(false);
        playNextVideo();
      }, 5000);
    }

    return () => clearTimeout(timeout);
  }, [showBingeButtons]);

  // currently  not used, can remove later
  const vidRef = useRef();

  return (
    <div className={styles.videoContainer} ref={videoContainer} onDoubleClick={toggleFullScreen}>
      {/* custom Ui components */}
      <div className={`${styles.customUiContainer} ${hideTopBar ? styles.fadeHideTop : ''}`}>
        <UiComponents
          updateIsPlayingTo={updateIsPlayingTo}
          set={set}
          refs={{ videoElement, videoContainer }}
          playerState={playerState}
        />
      </div>
      {playPauseActivated !== null && <CenterFlash state={playPauseActivated} />}

      <div className="video_wrapper">
        {/* video player */}
        <VideoPlayer
          videoElement={videoElement}
          handleOnTimeUpdate={handleOnTimeUpdate}
          playerState={playerState}
          handleClick={togglePlay}
          handleKeyDown={handleKeyDownEvents}
        />

        {/* watch credits button */}
        {showBingeButtons && (
          <>
            <div className={`${styles.nextPlayBtn}`}>
              {/* <span></span> */}
              <div
                className={`${styles.nextPlayBtnTxt}`}
                onClick={() => {
                  playNextVideo();
                  setShowBingeButtons(false);
                }}>
                Next Topic
              </div>
            </div>
            <div className={`${styles.watchCreditsBtn}`}>
              {/* <span></span> */}
              <div
                onClick={() => {
                  clearTimeout(timeout);
                  setShowBingeButtons(null);
                }}>
                Keep Watching
              </div>
            </div>
          </>
        )}

        {/* control bar */}
        <div
          className={`${styles.controls} ${hideControls ? styles.fadeHide : ''}`}
          ref={vidRef}
          onClick={() => videoElement.current?.focus()}>
          <ControlBar
            handleMouseExit={handleMouseExit}
            handleMouseMove={handleMouseMove}
            seek={seek}
            reloadVideo={reloadVideo}
            handlePlay={togglePlay}
            handleFullScreen={toggleFullScreen}
            forwardVideo={() => moveVideoProgress(true)}
            backwardVideo={() => moveVideoProgress(false)}
            handleProgress={handleVideoProgress}
            handleMute={toggleMute}
            handleVolume={handleVolume}
            playerState={playerState}
            tooltip={tooltip}
            playNextVideo={playNextVideo}
            playPreviousVideo={playPreviousVideo}
          />
        </div>
      </div>
    </div>
  );
}
