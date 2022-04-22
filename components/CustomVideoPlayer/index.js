import { useContext, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { VideoAtom } from '../../state/atoms/video.atom';
import { courseContext } from '../../state/contexts/CourseContext';
import CenterFlash from './CenterFlash';
import ControlBar from './ControlBar';
import styles from './customVideoPlayer.module.scss';
import useVideoPlayer from './Logic/useHandleVideo';
import UiComponents from './UiComponents';
import VideoPlayer from './VideoPlayer';

let videoSrc = 'videos/zicops-product-demo-learner-panel.mp4';
let type = 'mp4';

export default function CustomVideo({ set }) {
  const [videoData, setVideoData] = useRecoilState(VideoAtom);

  const { fullCourse } = useContext(courseContext);

  const videoElement = useRef(null);
  const videoContainer = useRef(null);

  // reset global variables
  useEffect(() => {
    if (fullCourse?.previewVideo) videoSrc = fullCourse.previewVideo;

    return () => {
      videoSrc = 'videos/zicops-product-demo-learner-panel.mp4';
      type = 'mp4';

      setVideoData({
        ...videoData,
        topicContent: [],
        startPlayer: false
      });
    };
  }, []);

  useEffect(() => {
    videoSrc = videoData.topicContent[0]?.contentUrl || videoSrc;
    type = videoData.topicContent[0]?.type || type;

    videoContainer.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    });
  }, [videoData]);

  useEffect(() => {
    console.log(videoSrc);
    set(true);
  }, [videoSrc]);

  // console.log(videoData, videoSrc);

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
    hideTopBar
  } = useVideoPlayer(videoElement, videoContainer, type);

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
        />
      </div>
      {playPauseActivated !== null && <CenterFlash state={playPauseActivated} />}

      <div className="video_wrapper">
        {/* video player */}
        <VideoPlayer
          videoSrc={videoSrc}
          type={type}
          videoElement={videoElement}
          handleOnTimeUpdate={handleOnTimeUpdate}
          playerState={playerState}
          handleClick={togglePlay}
          handleKeyDown={handleKeyDownEvents}
        />

        {/* control bar */}
        <div className={`${styles.controls} ${hideControls ? styles.fadeHide : ''}`} ref={vidRef}>
          <ControlBar
            reloadVideo={reloadVideo}
            handlePlay={togglePlay}
            handleFullScreen={toggleFullScreen}
            forwardVideo={() => moveVideoProgress(true)}
            backwardVideo={() => moveVideoProgress(false)}
            handleProgress={handleVideoProgress}
            handleMute={toggleMute}
            handleVolume={handleVolume}
            playerState={playerState}
          />
        </div>
      </div>
    </div>
  );
}
