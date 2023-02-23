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
  customStyles = {},
}) {
  const currentTime = +videoRef.current?.currentTime || 0;
  const videoDuration = +videoRef.current?.duration?.toFixed(2) || 0;
  const progressPercent = +((currentTime / videoDuration) * 100).toFixed(2) || 0;
  const selectedTime = (videoDuration * selectedWidth) / 100;

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
        <div
          className={`${styles.progressBar} ${!!isSelected ? styles.activeDrag : ''}`}
          style={customStyles}
          onMouseMove={activateSelection}
          onMouseLeave={(e) => deactivateSelection(e, isSelected)}
          onPointerDown={(e) => activateSelection(e, true)}
          onPointerUp={deactivateSelection}>
          <canvas ref={canvasRef} />
          <div
            className={`${styles.progressFill}`}
            style={{
              width: `${limitValueInRange(isSelected ? selectedWidth : progressPercent, 0, 99)}%`,
            }}></div>
        </div>
      </div>
    </>
  );
}
