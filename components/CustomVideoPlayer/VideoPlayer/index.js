import { useRecoilValue } from 'recoil';
import { VideoAtom } from '../../../state/atoms/video.atom';
import styles from '../customVideoPlayer.module.scss';

export default function VideoPlayer({
  videoElement,
  handleOnTimeUpdate,
  playerState,
  handleClick,
  handleKeyDown
}) {
  const videoData = useRecoilValue(VideoAtom);

  return (
    <>
      {!videoData.videoSrc && <div className={styles.fallbackForVideo}>No Video Present</div>}

      {videoData.type === 'mp4' && videoData.videoSrc && (
        <video
          tabIndex="0"
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          ref={videoElement}
          onTimeUpdate={handleOnTimeUpdate}
          muted={playerState.isMuted}
          className={`${styles.videoElement}`}
          src={videoData.videoSrc}
          autoPlay={true}
          // crossOrigin="anonymous"
        >
          {/* <source src={videoData.videoSrc} /> */}
        </video>
      )}

      {videoData.type === 'SCORM' && videoData.videoSrc && (
        <iframe
          src="https://storage.googleapis.com/content.zicops.com/course1/topic1/story_html5.html"
          frameBorder="0"
          className={`${styles.videoElement}`}
        />
      )}
    </>
  );
}
