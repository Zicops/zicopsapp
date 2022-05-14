import LabeledDropdown from '../../../../common/FormComponents/LabeledDropdown';
import LabeledRadioCheckbox from '../../../../common/FormComponents/LabeledRadioCheckbox';
import styles from '../examMasterTab.module.scss';

export default function Schedule() {
  return (
    <div className={`${styles.scheduleContainer}`}>
      {/* Exam data */}
      <LabeledDropdown
        dropdownOptions={{
          inputName: 'type',
          label: 'Exam Date:',
          placeholder: 'Select question Bank',
          options: [
            { value: 'MCQ', label: 'MCQ' },
            { value: 'Descriptive', label: 'Descriptive' }
          ]
        }}
        isFiftyFifty={true}
        changeHandler={(e) => changeHandler(e, newCustomSection, setNewCustomSection, 'type')}
      />

      {/* Exam Start Time */}
      <LabeledDropdown
        dropdownOptions={{
          inputName: 'type',
          label: 'Exam Start Time:',
          placeholder: 'Select question Bank',
          options: [
            { value: 'MCQ', label: 'MCQ' },
            { value: 'Descriptive', label: 'Descriptive' }
          ]
        }}
        isFiftyFifty={true}
        changeHandler={(e) => changeHandler(e, newCustomSection, setNewCustomSection, 'type')}
      />

      {/* Exam Duration */}
      <LabeledDropdown
        dropdownOptions={{
          inputName: 'type',
          label: 'Exam Duration:',
          placeholder: 'Select question Bank',
          options: [
            { value: 'MCQ', label: 'MCQ' },
            { value: 'Descriptive', label: 'Descriptive' }
          ]
        }}
        isFiftyFifty={true}
        changeHandler={(e) => changeHandler(e, newCustomSection, setNewCustomSection, 'type')}
      />

      {/* buffer time */}
      <LabeledDropdown
        dropdownOptions={{
          inputName: 'type',
          label: 'Buffer Time:',
          placeholder: 'Select question Bank',
          options: [
            { value: 'MCQ', label: 'MCQ' },
            { value: 'Descriptive', label: 'Descriptive' }
          ]
        }}
        isFiftyFifty={true}
        changeHandler={(e) => changeHandler(e, newCustomSection, setNewCustomSection, 'type')}
      />

      <div className={`${styles.stretchDuration}`}>
        <LabeledRadioCheckbox type="checkbox" label="Stretch Examination Conduct Duration" name="stretch" />
      </div>

      {/* Exam and Date */}
      <LabeledDropdown
        dropdownOptions={{
          inputName: 'type',
          label: 'Exam and Date:',
          placeholder: 'Select question Bank',
          options: [
            { value: 'MCQ', label: 'MCQ' },
            { value: 'Descriptive', label: 'Descriptive' }
          ]
        }}
        isFiftyFifty={true}
        changeHandler={(e) => changeHandler(e, newCustomSection, setNewCustomSection, 'type')}
      />

      {/* Exam end Date */}
      <LabeledDropdown
        dropdownOptions={{
          inputName: 'type',
          label: 'Exam End Date:',
          placeholder: 'Select question Bank',
          options: [
            { value: 'MCQ', label: 'MCQ' },
            { value: 'Descriptive', label: 'Descriptive' }
          ]
        }}
        isFiftyFifty={true}
        changeHandler={(e) => changeHandler(e, newCustomSection, setNewCustomSection, 'type')}
      />
    </div>
  );
}
