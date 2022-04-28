import styles from '../customVideoPlayer.module.scss';
import Image from 'next/image';

export default function CenterFlash({ state }) {
  if (!state) return null;
  console.log(state);

  let imgSrc = '/images/progressTriangle.png';
  if (state === 'pause') imgSrc = '/images/preview-btn.png';
  if (state === 'backward') imgSrc = '/images/prev-back.png';
  if (state === 'forward') imgSrc = '/images/next-forward.png';
  if (state === 'volumeUp') imgSrc = '/images/volume-up_90749.png';
  if (state === 'volumeDown') imgSrc = '/images/volume-up_90749.png';
  if (state === 'enterFullScreen') imgSrc = '/images/progressTriangle.png';
  if (state === 'exitFullScreen') imgSrc = '/images/progressTriangle.png';

  if (state === 'reload') imgSrc = '/images/reload_53905.png';
  if (state === 'unmute') imgSrc = '/images/volume-up_90749.png';
  if (state === 'mute') imgSrc = '/images/volume-up_90749.png';

  if (state === 'next') imgSrc = '/images/progressTriangle.png';
  if (state === 'previous') imgSrc = '/images/progressTriangle.png';


  return (
    <div className={`${styles.playPauseIndicator}`}>
      <div className={`${styles.centerFlashIcon}`}>
        <Image src={imgSrc} alt="" height="100px" width="100px" />
      </div>
    </div>
  );
}
