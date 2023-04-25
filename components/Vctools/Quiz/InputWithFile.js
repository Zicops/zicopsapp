import { truncateToN } from '@/utils/string.utils';
import styles from '../vctoolMain.module.scss';

export default function InputWithFile({
  inputName = '',
  value = '',
  maxLength = null,
  placeholder = '',
  fileName = '',
  accept = '',
  changeHandler = () => {},
  customStyles = {},
}) {
  return (
    <>
      <div className={`${styles.inputWithFile}`} style={customStyles}>
        <input
          type="text"
          name={inputName}
          value={value}
          maxLength={maxLength}
          placeholder={placeholder}
          onChange={changeHandler}
        />

        <div className={styles.attachmentImg}>
          <img src="/images/svg/vctool/image.svg" />
          {truncateToN(fileName, 25)}

          <input type="file" onChange={changeHandler} accept={accept} name="quiz_attachment" />
        </div>
      </div>
    </>
  );
}
