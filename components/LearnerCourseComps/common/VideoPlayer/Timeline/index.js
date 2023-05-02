// components\common\VideoPlayer\Timeline.js

import { limitValueInRange } from '@/helper/utils.helper';
import { getCourseDisplayTime } from '@/utils/date.utils';
import styles from '../videoPlayer.module.scss';
import ThumbnailPreview from './ThumbnailPreview';

export default function Timeline({
  selectedWidth = null,
  isSelected = null,
  activateSelection = () => {},
  deactivateSelection = () => {},

  videoRef = null,
  canvasRef = null,
  timelineOverlay = null,
  customStyles = {},
}) {
  const currentTime = +videoRef.current?.currentTime || 0;
  const videoDuration = +videoRef.current?.duration?.toFixed(2) || 0;
  let progressPercent = +((currentTime / videoDuration) * 100).toFixed(2) || null;
  const selectedTime = (videoDuration * selectedWidth) / 100;

  if (progressPercent === Infinity || progressPercent == null) progressPercent = 0;

  return (
    <>
      {!!selectedWidth && (
        <ThumbnailPreview
          positionLeftPercent={selectedWidth}
          progressBarWidth={canvasRef?.current?.clientWidth}
          time={getCourseDisplayTime(selectedTime)}
        />
      )}

      <div className={`${styles.progressContainer}`}>
        {timelineOverlay}

        <div
          className={`${styles.progressBar} ${!!isSelected ? styles.activeDrag : ''}`}
          style={customStyles}
          onMouseMove={activateSelection}
          onMouseLeave={(e) => deactivateSelection(e, { isSelected })}
          onPointerDown={(e) => activateSelection(e, true)}
          onPointerUp={(e) => deactivateSelection(e, { isSelected: false, updateVideo: true })}>
          <canvas ref={canvasRef} />
          <div
            className={`${styles.progressFill}`}
            style={{
              width: `${limitValueInRange(isSelected ? selectedWidth : progressPercent, 0, 100)}%`,
            }}></div>
        </div>
      </div>
    </>
  );
}
