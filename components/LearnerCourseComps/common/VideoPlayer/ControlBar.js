import {
  ExitFullScreenIcon,
  ForwardIcon,
  FullScreenIcon,
  NextIcon,
  PauseIcon,
  PlayIcon,
  ReplayIcon,
  VolumeIcon,
  VolumeMuteIcon,
} from '@/components/common/ZicopsIcons';
import { theme } from '@/helper/theme.helper';
import { memo } from 'react';
import { useRecoilState } from 'recoil';
import useHandleControlBar from './Logic/useHandleControlBar';
import { VideoStateChangeAtom, videoStateChangeList } from './Logic/videoPlayer.helper';
import Timeline from './Timeline';
import styles from './videoPlayer.module.scss';

export default memo(function ControlBar({
  playerState = {},
  toggleIsPlaying,
  updateVideoProgress,
  moveVideoProgressBy,
  toggleVideoFullScreen,
  videoRef = null,
  canvasRef = null,
  handleNextClick = null,
  handlePreviousClick = null,
  handleMute = () => {},
  handleVolumeChange = () => {},
  timelineOverlay = null,
}) {
  const [videoStateChange, setVideoStateChange] = useRecoilState(VideoStateChangeAtom);

  const {
    activeBtn,
    toggleActiveId,
    selectedWidth,
    isSelected,
    activateSelection,
    deactivateSelection,
  } = useHandleControlBar(playerState, updateVideoProgress);

  const isPlaying = playerState?.isPlaying || false;
  const isFullScreen = playerState?.isFullScreen || false;
  const isMute = playerState?.isMute || false;
  const volume = playerState?.volume || 0;

  const controlBarButtons = [
    {
      id: 1,
      IconComp: ReplayIcon,
      handleClick: () => {
        updateVideoProgress(0);
        setVideoStateChange(videoStateChangeList.reload);
      },
    },
    {
      id: 2,
      IconComp: NextIcon,
      isRotate: true,
      isDisabled: !handlePreviousClick,
      handleClick: (e) => {
        handlePreviousClick(e);
        setVideoStateChange(videoStateChangeList.previous);
      },
    },
    {
      id: 3,
      IconComp: ForwardIcon,
      isRotate: true,
      handleClick: () => moveVideoProgressBy(-10),
    },
    {
      id: 4,
      IconComp: isPlaying ? PauseIcon : PlayIcon,
      handleClick: () => toggleIsPlaying(),
      iconProps: { isFill: isPlaying },
      customIconClass: styles.playBtn,
    },
    {
      id: 6,
      IconComp: ForwardIcon,
      handleClick: () => moveVideoProgressBy(10),
    },
    {
      id: 5,
      IconComp: NextIcon,
      isDisabled: !handleNextClick,
      handleClick: (e) => {
        handleNextClick(e);
        setVideoStateChange(videoStateChangeList.next);
      },
    },
    {
      id: 7,
      IconComp: !!isMute ? VolumeMuteIcon : VolumeIcon,
      handleClick: handleMute,
      extraComp: (
        <div className={`${styles.volumeSlider}`} onClick={(e) => e.stopPropagation()}>
          <input
            type="range"
            name="volume"
            value={volume}
            step={0.01}
            min={0}
            max={1}
            onChange={(e) => handleVolumeChange(e.target.value)}
          />
        </div>
      ),
    },
  ];
  const volumeBtnId = 7;
  return (
    <>
      <div className={`${styles.controlBar}`}>
        <Timeline
          timelineOverlay={timelineOverlay}
          playerState={playerState}
          videoRef={videoRef}
          canvasRef={canvasRef}
          selectedWidth={selectedWidth}
          isSelected={isSelected}
          activateSelection={activateSelection}
          deactivateSelection={deactivateSelection}
          customStyles={activeBtn === volumeBtnId ? { opacity: 0.1 } : {}}
        />

        <div className={`${styles.centerIcons}`}>
          {controlBarButtons?.map(
            ({
              id,
              IconComp,
              isRotate = false,
              isDisabled = false,
              isFill = false,
              handleClick = () => {},
              iconProps = {},
              customIconClass = '',
              extraComp = null,
            }) => {
              let iconIsFill = false;
              let iconColor = theme.neutralWhite;

              if (activeBtn === id) (iconIsFill = true), (iconColor = theme.white);

              if (isDisabled) (iconIsFill = false), (iconColor = theme.darkThree);

              return (
                <span
                  key={id}
                  className={`${isRotate ? styles.rotate : ''} ${
                    isDisabled ? styles.disabled : ''
                  } ${customIconClass}`}
                  onMouseEnter={() => toggleActiveId(id)}
                  onMouseLeave={() => toggleActiveId()}
                  onClick={handleClick}>
                  {activeBtn === id && <span className={`${styles.extraComp}`}>{extraComp}</span>}
                  <IconComp {...iconProps} isFill={iconIsFill || isFill} color={iconColor} />
                </span>
              );
            },
          )}
        </div>

        <span className={`${styles.fullScreen}`} onClick={toggleVideoFullScreen}>
          {isFullScreen ? <ExitFullScreenIcon /> : <FullScreenIcon />}
        </span>
      </div>

      {!!isSelected && (
        <span className={`${styles.previewImage}`}>
          <img src="/images/dnd3.jpg" alt="" />
        </span>
      )}
    </>
  );
});
