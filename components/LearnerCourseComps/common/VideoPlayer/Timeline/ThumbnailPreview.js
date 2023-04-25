import Spinner from '@/components/common/Spinner';
import styles from '../videoPlayer.module.scss';

export default function ThumbnailPreview({
  positionLeftPercent = null,
  progressBarWidth = 0,
  slotData = null,
  previewImage = null,
  time = '00:00',
}) {
  function getThumbnailPositionLeft() {
    const thumbnailWidthHalf = parseInt(styles.thumbnailWidth || '0') / 2;
    const _positionLeftInPixels = (progressBarWidth * positionLeftPercent) / 100;

    if (_positionLeftInPixels - thumbnailWidthHalf < 0) return `${thumbnailWidthHalf + 10}px`;
    if (_positionLeftInPixels + thumbnailWidthHalf + 10 > progressBarWidth)
      return `${progressBarWidth - thumbnailWidthHalf - 15}px`;

    return `${positionLeftPercent}%`;
  }

  return (
    <>
      <div className={`${styles.thumbnailPreview}`} style={{ left: getThumbnailPositionLeft() }}>
        {!!slotData && <div className={`${styles.pill} ${styles.extraDataSlot}`}>{slotData}</div>}

        <div className={`${styles.preview}`}>
          {!!previewImage ? <img src={previewImage} alt="" /> : <Spinner />}
        </div>

        <span className={`${styles.pill}`}>{time}</span>
      </div>
    </>
  );
}
