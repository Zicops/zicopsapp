import TextInputWithFile from '../../../../../common/TextInputWithFile';
import { imageTypes } from '../../../../Logic/questionBank.helper';
import styles from '../../../questionMasterTab.module.scss';

export default function InputWithCheckbox({
  labelCount,
  isCorrectHandler,
  optionData,
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
              <input
                type="checkbox"
                checked={optionData?.isCorrect}
                name={labelCount}
                onChange={isCorrectHandler}
              />
              <span className={styles.checkmark}></span>
            </label>
          </div>
        </div>
        <TextInputWithFile
          type="option"
          fileNmae={optionData?.file?.name || optionData?.attachment}
          value={optionData?.description}
          inputName="description"
          accept={imageTypes.join(', ')}
          fileInputHandler={fileInputHandler}
          changeHandler={inputChangeHandler}
          text="Enter anser in less than 160 characters"
        />
      </div>
    </>
  );
}
