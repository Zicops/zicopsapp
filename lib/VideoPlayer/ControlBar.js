import {
  ExitFullScreenIcon,
  ForwardIcon,
  FullScreenIcon,
  NextIcon,
  PauseIcon,
  PlayIcon,
  ReplayIcon,
  VolumeIcon,
} from '@/components/Icons/VideoPlayerIcons';
import { theme } from '@/helper/theme.helper';
import { memo, useState } from 'react';
import styles from './videoPlayer.module.scss';

export default memo(function ControlBar({
  isPlaying,
  isFullScreen,
  toggleIsPlaying,
  updateVideoProgress,
  moveVideoProgressBy,
  toggleVideoFullScreen,
}) {
  const [activeBtn, setActiveBtn] = useState(null);

  const controlBarButtons = [
    { id: 1, IconComp: ReplayIcon, handleClick: () => updateVideoProgress(0) },
    { id: 2, IconComp: NextIcon, isRotate: true, handleClick: () => {} },
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
    },
    {
      id: 6,
      IconComp: ForwardIcon,
      handleClick: () => moveVideoProgressBy(10),
    },
    { id: 5, IconComp: NextIcon, handleClick: () => {} },
    { id: 7, IconComp: VolumeIcon, handleClick: () => {} },
  ];

  return (
    <>
      <div className={`${styles.centerIcons}`}>
        {controlBarButtons?.map((btn) => {
          const {
            id,
            IconComp,
            isRotate = false,
            isFill = false,
            handleClick = () => {},
            iconProps = {},
            customIconClass,
          } = btn;

          return (
            <span
              key={id}
              className={`${isRotate ? styles.rotate : ''} ${customIconClass}`}
              onMouseEnter={() => setActiveBtn(id)}
              onMouseLeave={() => setActiveBtn(null)}
              onClick={handleClick}
            >
              <IconComp
                {...iconProps}
                isFill={activeBtn === id || isFill}
                color={activeBtn === id ? theme.white : theme.neutralWhite}
              />
            </span>
          );
        })}
      </div>

      <span className={`${styles.fullScreen}`} onClick={toggleVideoFullScreen}>
        {isFullScreen ? <ExitFullScreenIcon /> : <FullScreenIcon />}
      </span>
    </>
  );
});
