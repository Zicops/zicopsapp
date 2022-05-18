import TextInputWithFile from '../../../../../common/TextInputWithFile';
import styles from '../../../questionMasterTab.module.scss';

export default function InputWithCheckbox({
  labelCount,
  isCorrectHandler,
  inputChangeHandler,
  fileInputHandler
}) {
  return (
    <>
      <div className={`${styles.optionContainer}`}>
        <div className={`${styles.checkBox}`}>
          <div className={styles.number}>
            <span>{labelCount}.</span>
          </div>
          <div>
            <label className={styles.checkboxContainer}>
              <input type="checkbox" name="isCorrect" onChange={isCorrectHandler} />
              <span className={styles.checkmark}></span>
            </label>
          </div>
        </div>
        <TextInputWithFile
          type="option"
          inputName="description"
          fileInputHandler={fileInputHandler}
          changeHandler={inputChangeHandler}
          text="Enter answer in less than 160 characters"
        />
      </div>
    </>
  );
}
