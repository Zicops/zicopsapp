import Image from 'next/image';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { VideoAtom } from '../../../state/atoms/video.atom';
import Button from '../Button';
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
  toggleScrubbing,
  playerState,
  handleMouseExit,
  handleMouseMove,
  seek,
  tooltip,
  progressBar,
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
    <div className={`${styles.controlBar}`}>
      <div
        className={`${styles.timelineContainer} ${hideBar ? styles.dimProgressBar : ''}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseExit}
        onPointerDown={toggleScrubbing}
        onPointerUp={toggleScrubbing}
        onPointerLeave={handleMouseExit}
        id="timelineContainer">
        <div className={`${styles.timeline}`} ref={progressBar}>
          <div className={`${styles.thumbnailContainer}`} ref={tooltip}>
            {/* <div className={`${styles.thumbnailInfo}`}>Some info will be here!</div> */}
            <div className={`${styles.thumbnailImage}`}>
            <img src="" alt="" className={`${styles.previewImg}`} id="thumbnailImages" />
            </div>
            <div className={`${styles.thumbnailTime}`}>{seek}</div>
          </div>

          <div className={`${styles.thumbIndicator}`} id="thumbIndicator"></div>
          <div className={`${styles.bookmarkIndicator}`} id="bookmarkIndicator"></div>
          <div className={`${styles.quizIndicator}`} id="quizIndicator"></div>
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

      <div className={`${styles.controlButtons}`}>
        <Button handleClick={reloadVideo}>
          {/* <Image src="/images/reload_53905.png" alt="" height="25px" width="22px" /> */}
          <div className={`${styles.reloadBtn}`}></div>
        </Button>

        <Button handleClick={playPreviousVideo} disable={disablePreviousButton}>
          {disablePreviousButton ? (
            <div className={`${styles.prevBtn} ${styles.disabled}`}></div>
          ) : (
            <div className={`${styles.prevBtn}`}></div>
          )}
        </Button>

        <Button handleClick={backwardVideo}>
          <div className={`${styles.backwordBtn}`}></div>
        </Button>

        <Button handleClick={handlePlay} styleClass={styles.playPauseBtn}>
          {!playerState.isPlaying ? (
            <div className={`${styles.pauseBtn}`}></div>
          ) : (
            <div className={`${styles.playBtn}`}></div>
          )}
        </Button>

        <Button handleClick={forwardVideo}>
          <div className={`${styles.forwardBtn}`}></div>
        </Button>

        <Button handleClick={playNextVideo} disable={disableNextButton}>
          {disableNextButton ? (
            <div className={`${styles.nextBtn} ${styles.disabled}`}></div>
          ) : (
            <div className={`${styles.nextBtn}`}></div>
          )}
        </Button>

        <div
          className={`${styles.volumeContainer}`}
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
      <div className={`${styles.fullScreenBtn}`}>
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
