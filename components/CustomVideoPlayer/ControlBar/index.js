import Image from 'next/image';
import { useState } from 'react';
import Button from '../Button';
import {
  controlBar,
  controlButtons,
  fullScreenBtn,
  playPauseBtn,
  progressBar,
  volumeContainer,
  dimProgressBar,
  tooltipContainer
} from './controlbar.module.scss';
import Volume from './Volume';

export default function ControlBar({
  reloadVideo,
  prevVideo,
  nextVideo,
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
  tooltip
}) {
  const [hideBar, setHideBar] = useState(false);

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

        <Button>
          <Image src="/images/prev-topic.png" alt="" height="30px" width="30px" />
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

        <Button>
          <Image src="/images/next-topic.png" alt="" height="30px" width="30px" />
        </Button>

        <div
          className={`${volumeContainer}`}
          onMouseEnter={() => setHideBar(true)}
          onMouseLeave={() => setHideBar(false)}>
          <Volume
            handleVolumeChange={handleVolume}
            handleMute={handleMute}
            isMute={playerState.isMuted}
            volume={playerState.volume}
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
