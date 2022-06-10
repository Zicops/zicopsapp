import styles from './inputWithCheckbox.module.scss';
import TextInputWithFile from './TextInputWithFile';

export default function InputWithCheckbox({
  labelCount,
  isCorrectHandler,
  optionData,
  inputChangeHandler,
  fileInputHandler,
  acceptedTypes
}) {
  const { fileName, inputValue, inputName } = optionData;

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
          fileNmae={fileName}
          value={inputValue}
          inputName={inputName}
          accept={acceptedTypes}
          fileInputHandler={fileInputHandler}
          changeHandler={inputChangeHandler}
          text="Enter anser in less than 160 characters"
        />
      </div>
    </>
  );
}
