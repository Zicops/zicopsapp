// components\common\VideoPlayer\Timeline.js

import styles from './videoPlayer.module.scss';

export default function Timeline({ progressPercent = 0 }) {
  return (
    <>
      <div className={`${styles.progressBar}`}>
        <div
          className={`${styles.progressFill}`}
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
    </>
  );
}
