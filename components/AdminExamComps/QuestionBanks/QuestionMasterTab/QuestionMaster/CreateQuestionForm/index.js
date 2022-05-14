import LabeledDropdown from '../../../../../common/FormComponents/LabeledDropdown';
import LabeledTextarea from '../../../../../common/FormComponents/LabeledTextarea';
import TextInputWithFile from '../../../../common/TextInputWithFile';
import styles from '../../questionMasterTab.module.scss';
import InputWithCheckbox from './InputWithCheckbox';

export default function CreateQuestionForm() {
  return (
    <>
      <LabeledDropdown
        dropdownOptions={{
          inputName: 'questionType',
          label: 'Select Question Type: ',
          placeholder: 'Select question type',
          options: [
            { label: 'MCQ', value: 'MCQ' },
            { label: 'Descriptive', value: 'Descriptive' }
          ],
          isDisabled: false,
          isSearchEnable: false,
          isMulti: false
        }}
      />

      {/* question with file */}
      <div className={styles.marginTop}>
        <label>
          Enter Question:
          <TextInputWithFile />
        </label>
      </div>

      {/* exam hint */}
      <div className={styles.marginTop}>
        <label>
          Enter Hint:
          <LabeledTextarea
            styleClass={styles.inputLabelGap}
            inputOptions={{
              inputName: 'hint',
              placeholder: 'Enter hint in less than 300 characters.',
              rows: 4
            }}
          />
        </label>
      </div>

      <div className={styles.marginTop}>
        <label>
          Enter Options:
          <span className={`${styles.hint}`}>Select the checkbox for the right option.</span>

          <InputWithCheckbox labelCount={1} />
          <InputWithCheckbox labelCount={2} />
          <InputWithCheckbox labelCount={3} />
          <InputWithCheckbox labelCount={4} />

        </label>
      </div>
    </>
  );
}
