import { useContext } from 'react';
import { courseContext } from '../../../state/contexts/CourseContext';
import styles from '../customVideoPlayer.module.scss';

export default function VideoPlayer({
  videoSrc,
  type,
  videoElement,
  handleOnTimeUpdate,
  playerState
}) {
  return (
    <>
      {type === 'mp4' && (
        <video
          src={videoSrc}
          ref={videoElement}
          onTimeUpdate={handleOnTimeUpdate}
          muted={playerState.isMuted}
          className={`${styles.videoElement}`}
        />
      )}

      {type === 'SCORM' && (
        <iframe
          src="https://storage.googleapis.com/content.zicops.com/course1/topic1/story_html5.html"
          frameBorder="0"
          className={`${styles.videoElement}`}
        />
      )}
    </>
  );
}
