import Image from 'next/image';
import { useContext, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { VideoAtom } from '../../state/atoms/video.atom';
import { courseContext } from '../../state/contexts/CourseContext';
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
    setPlayPauseActivated,
    handleKeyDownEvents
  } = useVideoPlayer(videoElement, videoContainer);

  const [hideControls, setHideControls] = useState(0);
  const [hideTopBar, setHideTopBar] = useState(0);

  useEffect(() => {
    if (type !== 'mp4') setHideControls(1);
  }, [type]);

  const vidRef = useRef();

  // If no mouse movement for 3 sec, setHideControls(1)
  // var elem = vidRef?.current;
  var timeout;
  var duration = 2500;
  document.addEventListener('mousemove', function () {
    return;
    if (type !== 'mp4') return;

    //    console.log("Mouse is moving!")
    setHideControls(0);
    setHideTopBar(0);
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      // console.log("Mouse Has stopped!");
      setHideControls(1);
      setHideTopBar(1);
    }, duration);
  });

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
      {playPauseActivated !== null && (
        <div className={`${styles.playPauseIndicator}`}>
          {!playerState.isPlaying ? (
            <Image src="/images/preview-btn.png" alt="" height="100px" width="100px" />
          ) : (
            <Image src="/images/progressTriangle.png" alt="" height="100px" width="100px" />
          )}
        </div>
      )}

      <div
        className="video_wrapper"
        tabIndex="0"
        onClick={togglePlay}
        onKeyDown={handleKeyDownEvents}>
        {/* video player */}
        <VideoPlayer
          videoSrc={videoSrc}
          type={type}
          videoElement={videoElement}
          handleOnTimeUpdate={handleOnTimeUpdate}
          playerState={playerState}
        />
        {/* <video
          src={videoSrc}
          ref={videoElement}
          onTimeUpdate={handleOnTimeUpdate}
          muted={playerState.isMuted}
          id="video"
        /> */}

        {/* <iframe
          id="video"
          src="https://storage.googleapis.com/content.zicops.com/course1/topic1/story_html5.html"
          frameBorder="0"
        /> */}

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
