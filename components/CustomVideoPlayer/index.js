import { useContext, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { VideoAtom } from '../../state/atoms/video.atom';
import { courseContext } from '../../state/contexts/CourseContext';
import CenterFlash from './CenterFlash';
import ControlBar from './ControlBar';
import styles from './customVideoPlayer.module.scss';
import useVideoPlayer from './Logic/useHandleVideo';
import UiComponents from './UiComponents';
import VideoPlayer from './VideoPlayer';

export default function CustomVideo({ set }) {
  const [videoData, setVideoData] = useRecoilState(VideoAtom);

  let skipVideoTimer = null;
  const [timeoutState, setTimeoutState] = useState(null);
  let isLastVideo = true;

  if (videoData.allModuleTopic) {
    isLastVideo = videoData.currentTopicIndex + 1 === videoData.allModuleTopic?.length;
    skipVideoTimer =
      videoData.topicContent[0]?.nextShowTime || videoData.topicContent[0]?.fromEndTime;

    if (isLastVideo) skipVideoTimer = null;
  }

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
    if (videoData.allModuleTopic && skipVideoTimer) {
      const duration = videoElement.current?.duration;
      const isFromStart = videoData.topicContent[0].nextShowTime > 0;
      const timeToWait = isFromStart
        ? videoData.topicContent[0].nextShowTime * 1000
        : (duration - videoData.topicContent[0].fromEndTime) * 1000;

      console.log('play in progress', parseInt(skipVideoTimer) * 60 + 5000);

      setTimeoutState(
        setTimeout(() => {
          if (!timeoutState) {
            console.log('next will play');
            playNextVideo();
            skipVideoTimer = null;
          }
        }, timeToWait + 5000)
      );
    }

    // reset video progress when unmounted
    return () => {
      handleMouseMove({ target: { value: 0 } });
    };
  }, []);

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
    if (videoData.isPreview && playerState.progress === 100) {
      set(false);
    }
  }, [playerState.progress]);

  // console.log(
  //   skipVideoTimer,
  //   (playerState.progress * 9) / 100,
  //   skipVideoTimer < (playerState.progress * 9) / 100
  // );
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
          videoSrc={videoData.videoSrc || null}
          type={videoData.type || 'mp4'}
          videoElement={videoElement}
          handleOnTimeUpdate={handleOnTimeUpdate}
          playerState={playerState}
          handleClick={togglePlay}
          handleKeyDown={handleKeyDownEvents}
        />

        {/* watch credits button */}
        {skipVideoTimer < (playerState.progress * 9) / 100 && timeoutState && (
          <>
            <div className={`${styles.nextPlayBtn}`}>
              <span></span>
              <div
                onClick={() => {
                  // console.log('play cancaled', timeoutState);
                  clearTimeout(timeoutState);
                  playNextVideo();
                  skipVideoTimer = null;
                  setTimeoutState(null);
                }}>
                Next
              </div>
            </div>
            <div className={`${styles.watchCreditsBtn}`}>
              <span></span>
              <div
                onClick={() => {
                  // console.log('play cancaled', timeoutState);
                  clearTimeout(timeoutState);
                  skipVideoTimer = null;
                  setTimeoutState(null);
                }}>
                Watch Credits
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
