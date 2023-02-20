// components\common\VideoPlayer\Timeline.js

import styles from './videoPlayer.module.scss';

export default function Timeline({ progressPercent = 0, canvasRef = null, customStyles = {} }) {
  return (
    <>
      <div className={`${styles.progressBar}`} style={customStyles}>
        <canvas ref={canvasRef} />
        <div className={`${styles.progressFill}`} style={{ width: `${progressPercent}%` }}></div>
      </div>
    </>
  );
}
