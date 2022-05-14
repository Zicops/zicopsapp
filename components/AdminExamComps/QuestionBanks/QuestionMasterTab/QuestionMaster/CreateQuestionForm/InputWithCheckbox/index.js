import TextInputWithFile from '../../../../../common/TextInputWithFile';
import styles from '../../../questionMasterTab.module.scss';

export default function InputWithCheckbox({ labelCount }) {
  return (
    <>
      <div className={`${styles.optionContainer}`}>
        <div className={`${styles.checkBox}`}>
          <div className={styles.number}>
            <span>{labelCount}.</span>
          </div>
          <div>
            <label className={styles.checkboxContainer}>
              <input type="checkbox" />
              <span className={styles.checkmark}></span>
            </label>
          </div>
        </div>
        <TextInputWithFile
          type="option"
          sr="O1"
          text="Enter question in less than 160 characters"
        />
      </div>
    </>
  );
}
