import styles from '../customVideoPlayer.module.scss';

export default function VideoPlayer({
  videoSrc,
  type,
  videoElement,
  handleOnTimeUpdate,
  playerState,
  handleClick,
  handleKeyDown
}) {
  return (
    <>
      {!videoSrc && <div className={styles.fallbackForVideo}>No Video Present</div>}

      {type === 'mp4' && videoSrc && (
        <video
          tabIndex="0"
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          src={videoSrc}
          ref={videoElement}
          onTimeUpdate={handleOnTimeUpdate}
          muted={playerState.isMuted}
          className={`${styles.videoElement}`}
        />
      )}

      {type === 'SCORM' && videoSrc && (
        <iframe
          src="https://storage.googleapis.com/content.zicops.com/course1/topic1/story_html5.html"
          frameBorder="0"
          className={`${styles.videoElement}`}
        />
      )}
    </>
  );
}
