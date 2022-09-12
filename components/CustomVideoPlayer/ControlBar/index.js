import Image from 'next/image';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { VideoAtom } from '../../../state/atoms/video.atom';
import Button from '../Button';
import {
  controlBar,
  thumbnailPoints,
  controlButtons,
  dimProgressBar,
  fullScreenBtn,
  playPauseBtn,
  progressBar,
  tooltipContainer,
  volumeContainer,
  thumbnailInfo,
  thumbnailImage,
  thumbnailTime,
  timelineContainer,
  timeline,
  previewImg,
  thumbIndicator
} from './controlbar.module.scss';
import Volume from './Volume';
import styles from './controlbar.module.scss';

export default function ControlBar({
  reloadVideo,
  forwardVideo,
  backwardVideo,
  handlePlay,
  handleFullScreen,
  handleVolume,
  handleMute,
  handleProgress,
  playerState,
  handleMouseExit,
  handleMouseMove,
  seek,
  tooltip,
  playNextVideo,
  playPreviousVideo
}) {
  const [hideBar, setHideBar] = useState(false);
  const videoData = useRecoilValue(VideoAtom);

  let disablePreviousButton = true;
  let disableNextButton = true;

  if (videoData.allModuleTopic) {
    const { allModuleTopic, currentTopicIndex } = videoData;
    disablePreviousButton = currentTopicIndex === 0;
    disableNextButton = currentTopicIndex + 1 === allModuleTopic?.length;
  }

  if (videoData.allModuleOptions) {
    const { allModuleOptions, currentModuleIndex } = videoData;
    if (disablePreviousButton) disablePreviousButton = currentModuleIndex === 0;
    if (disableNextButton) disableNextButton = currentModuleIndex + 1 === allModuleOptions.length;
  }

  if (videoData.isPreview) {
    disablePreviousButton = true;
    disableNextButton = true;
  }

  return (
    <div className={`${controlBar}`}>
      <div
        className={`${timelineContainer}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseExit}
        id="timelineContainer">
        <div className={`${timeline}`}>
          <img src="" alt="" className={`${previewImg}`} id="thumbnailImages" />
          <div className={`${thumbIndicator}`} id="thumbIndicator"></div>
        </div>
      </div>
      {/* <div className={`${thumbnailPoints}`} id="thumbnailPoints"></div> */}
      {/* <input
        type="range"
        id="vidInput"
        onChange={handleProgress}
        onMouseLeave={handleMouseExit}
        onMouseMove={handleMouseMove}
        value={playerState.progress || 0}
        min={0}
        max={100}
        step={0.1}
        className={`${progressBar} ${hideBar ? dimProgressBar : ''}`}
      /> */}

      {/* <div className={`${tooltipContainer} ${!seek ? 'hide' : ''}`} ref={tooltip}> */}
      {/* {seek} */}
      {/* <div className={`${thumbnailInfo}`}>Some info will be here!</div>
        <div className={`${thumbnailImage}`}>
          <img src="/images/courses/1.png" alt="" />
        </div>
        <div className={`${thumbnailTime}`}>{seek}</div> */}
      {/* </div> */}

      <div className={`${controlButtons}`}>
        <Button handleClick={reloadVideo}>
          {/* <Image src="/images/reload_53905.png" alt="" height="25px" width="22px" /> */}
          <div className={`${styles.reloadBtn}`}></div>
        </Button>

        <Button handleClick={playPreviousVideo} disable={disablePreviousButton}>
          {disablePreviousButton ? (
            <div className={`${styles.prevBtn} ${styles.disabled}`}></div>
          ) : (
            <div className={`${styles.prevBtn}`}></div>
            // <Image src="/images/prev-topic.png" alt="" height="30px" width="30px" />
            // <div className={`${styles.prevBtn}`}></div>
            // <Image
            //   src="/images/next-topic.png"
            //   style={{ transform: 'rotate(180deg)' }}
            //   alt=""
            //   height="30px"
            //   width="30px"
            // />
          )}
        </Button>

        <Button handleClick={backwardVideo}>
          {/* <Image src="/images/prev-back.png" alt="" height="40px" width="35px" /> */}
          <div className={`${styles.backwordBtn}`}></div>
        </Button>

        <Button handleClick={handlePlay} styleClass={playPauseBtn}>
          {!playerState.isPlaying ? (
            // <Image src="/images/preview-btn.png" alt="" height="50px" width="50px" />
            <div className={`${styles.pauseBtn}`}></div>
          ) : (
            // <Image src="/images/progressTriangle.png" alt="" height="50px" width="50px" />
            <div className={`${styles.playBtn}`}></div>
          )}
        </Button>

        <Button handleClick={forwardVideo}>
          {/* <Image src="/images/next-forward.png" alt="" height="40px" width="35px" /> */}
          <div className={`${styles.forwardBtn}`}></div>
        </Button>

        <Button handleClick={playNextVideo} disable={disableNextButton}>
          {disableNextButton ? (
            <div className={`${styles.nextBtn} ${styles.disabled}`}></div>
          ) : (
            // <Image
            //   src="/images/prev-topic.png"
            //   style={{ transform: 'rotate(180deg)' }}
            //   alt=""
            //   height="30px"
            //   width="30px"
            // />
            // <Image src="/images/next-topic.png" alt="" height="30px" width="30px" />
            <div className={`${styles.nextBtn}`}></div>
          )}
          {/* <Image src="/images/next-topic.png" alt="" height="30px" width="30px" /> */}
        </Button>

        <div
          className={`${volumeContainer}`}
          onMouseEnter={() => setHideBar(true)}
          onMouseLeave={() => setHideBar(false)}>
          <Volume
            handleVolumeChange={handleVolume}
            handleMute={handleMute}
            isMute={playerState.isMuted}
            vol={playerState.volume}
          />
        </div>
      </div>
      <div className={`${fullScreenBtn}`}>
        <Button handleClick={handleFullScreen}>
          {!document.fullscreenElement ? (
            <div className={`${styles.fsBtn}`}></div>
          ) : (
            <div className={`${styles.fseBtn}`}></div>
          )}
        </Button>
      </div>
    </div>
  );
}
