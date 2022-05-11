import Button from '../../Button';
import styles from '../controlbar.module.scss';

export default function Volume({ handleVolumeChange, handleMute, isMute, vol }) {
  return (
    <div className={`${styles.volume}`}>
      <div className={`${styles.volumeSlider}`}>
        <input
          type="range"
          name="volume"
          value={vol}
          step={0.01}
          min={0}
          max={1}
          onChange={handleVolumeChange}
        />
      </div>

      <Button styleClass={`${styles.volumeBtn}`} handleClick={handleMute}>
        {isMute ? (
          <div className={`${styles.muteVolumeIconBtn}`}></div>
        ) : (
          <div className={`${styles.volumeIconBtn}`}></div>
        )}
      </Button>
    </div>
  );
}
