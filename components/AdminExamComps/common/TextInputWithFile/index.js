import { truncateToN } from '../../../../helper/common.helper';
import styles from './textInputWithFile.module.scss';

export default function TextInputWithFile({
  inputName,
  type = 'question',
  accept,
  value,
  changeHandler,
  fileInputHandler,
  fileNmae,
  maxLength = 160
}) {
  return (
    <>
      <div className={`w-100 ${styles.container}`}>
        <div className={styles.box}>
          <input
            type="text"
            name={inputName}
            value={value}
            maxLength={maxLength}
            placeholder={`Enter ${type} in less than 160 characters`}
            onChange={changeHandler}
          />

          <div className={styles.attachment}>
            <div>
              <span className={`${styles.one}`}>
                <img src="/images/attachment.png" alt="" />
              </span>
            </div>
            <span>{truncateToN(fileNmae, 60)}</span>
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

              <input
                type="file"
                onChange={fileInputHandler}
                accept={accept}
                name="quiz_attachment"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
