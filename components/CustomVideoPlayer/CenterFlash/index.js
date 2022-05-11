import styles from '../customVideoPlayer.module.scss';
import Image from 'next/image';

export default function CenterFlash({ state }) {
  if (!state) return null;

  let imgSrc = '/images/svg/play-line.svg';
  if (state === 'pause') imgSrc = '/images/svg/pause-line.svg';
  if (state === 'backward') imgSrc = '/images/svg/rewind-line.svg';
  if (state === 'forward') imgSrc = '/images/svg/speed-line.svg';
  if (state === 'volumeUp') imgSrc = '/images/svg/volume-up-line.svg';
  if (state === 'volumeDown') imgSrc = '/images/svg/volume-down-line.svg';
  if (state === 'enterFullScreen') imgSrc = '/images/svg/fullscreen-line.svg';
  if (state === 'exitFullScreen') imgSrc = '/images/svg/fullscreen-exit-line.svg';

  if (state === 'reload') imgSrc = '/images/svg/history-fill.svg';
  if (state === 'unmute') imgSrc = '/images/svg/volume-up-line.svg';
  if (state === 'mute') imgSrc = '/images/svg/volume-mute-line.svg';

  if (state === 'next') imgSrc = '/images/svg/skip-forward-line.svg';
  if (state === 'previous') imgSrc = '/images/svg/skip-back-line.svg';

  return (
    <div className={`${styles.playPauseIndicator}`}>
      <div className={`${styles.centerFlashIcon}`}>
        <Image
          src={imgSrc}
          alt=""
          height="100px"
          width="100px"
          className={`${styles.centerFlashIconImg}`}
        />
      </div>
    </div>
  );
}
