import styles from './textInputWithFile.module.scss';

export default function TextInputWithFile({ type = 'question' }) {
  return (
    <>
      <div className={`w-100 ${styles.container}`}>
        <div className={styles.box}>
          <input
            type="text"
            name={type}
            placeholder={`Enter ${type} in less than 160 characters`}
          />

          <div className={styles.attachment}>
            <div>
              <span className={`${styles.one}`}>
                <img src="/images/attachment.png" alt="" />
              </span>
            </div>
            <div className={styles.innerBox}>
              <span>
                <img src="/images/img.png" alt="" />
                Image
              </span>
              <span>
                <img src="/images/audio.png" alt="" />
                Audio
              </span>
              <span>
                <img src="/images/vid.png" alt="" />
                Video
              </span>

              <input type="file" name="quiz_attachment" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
