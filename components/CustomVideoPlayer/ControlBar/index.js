import Image from 'next/image';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { VideoAtom } from '../../../state/atoms/video.atom';
import Button from '../Button';
import {
  controlBar,
  controlButtons,
  dimProgressBar,
  fullScreenBtn,
  playPauseBtn,
  progressBar,
  tooltipContainer,
  volumeContainer
} from './controlbar.module.scss';
import Volume from './Volume';

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
      <input
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
      />

      <div className={`${tooltipContainer} ${!seek ? 'hide' : ''}`} ref={tooltip}>
        {seek}
      </div>

      <div className={`${controlButtons}`}>
        <Button handleClick={reloadVideo}>
          <Image src="/images/reload_53905.png" alt="" height="25px" width="22px" />
        </Button>

        <Button handleClick={playPreviousVideo} disable={disablePreviousButton}>
          {disablePreviousButton ? (
            <Image src="/images/prev-topic.png" alt="" height="30px" width="30px" />
          ) : (
            <Image
              src="/images/next-topic.png"
              style={{ transform: 'rotate(180deg)' }}
              alt=""
              height="40px"
              width="35px"
            />
          )}
        </Button>

        <Button handleClick={backwardVideo}>
          <Image src="/images/prev-back.png" alt="" height="40px" width="35px" />
        </Button>

        <Button handleClick={handlePlay} styleClass={playPauseBtn}>
          {!playerState.isPlaying ? (
            <Image src="/images/preview-btn.png" alt="" height="50px" width="50px" />
          ) : (
            <Image src="/images/progressTriangle.png" alt="" height="50px" width="50px" />
          )}
        </Button>

        <Button handleClick={forwardVideo}>
          <Image src="/images/next-forward.png" alt="" height="40px" width="35px" />
        </Button>

        <Button handleClick={playNextVideo} disable={disableNextButton}>
          {disableNextButton ? (
            <Image
              src="/images/prev-topic.png"
              style={{ transform: 'rotate(180deg)' }}
              alt=""
              height="30px"
              width="30px"
            />
          ) : (
            <Image src="/images/next-topic.png" alt="" height="40px" width="35px" />
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
          <Image
            src="/images/switch-to-full-screen-button_icon.png"
            alt=""
            height="30px"
            width="30px"
          />
        </Button>
      </div>
    </div>
  );
}
