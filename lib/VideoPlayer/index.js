import Video from './Video';
import styles from './videoPlayer.module.scss';

export default function VideoPlayer({ videoSrc = '' }) {
  return (
    <div className={`${styles.videoPlayer}`}>
      <Video videoSrc={videoSrc} />
    </div>
  );
}
