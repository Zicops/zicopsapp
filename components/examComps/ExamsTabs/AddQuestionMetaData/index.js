import styles from './addQuestionMetaData.module.scss';
import ZicopsRadioButton from '../../../common/ZicopsRadioButton';
import DropdownSelect from '../../../Tabs/common/DropdownSelect';
import Button from '../../../common/Button';
import InputField from '../../../common/InputField';
import { InputFieldData } from './Logic/addQuestionMetaData.helper';
import LabeledRadioCheckbox from '../../../common/FormComponents/LabeledRadioCheckbox';
import LabeledDropdown from '../../../common/FormComponents/LabeledDropdown';
import LabeledInput from '../../../common/FormComponents/LabeledInput';
import { useState } from 'react';
import ExistingQuestion from './existingQuestion';
import UploadNewQuestionBank from './uploadNew';

export default function AddQuestionMetaData() {
  const [isUploadSelected, setIsUploadSelected] = useState(false);

  return (
    <>
      <div className={`${styles.radioContainer} ${styles.inputField}`}>
        <label>Question Selection:</label>
        <LabeledRadioCheckbox
          type="radio"
          label="Existing Question Bank"
          name="selection"
          isChecked={!isUploadSelected}
          changeHandler={() => setIsUploadSelected(false)}
        />
        <LabeledRadioCheckbox
          type="radio"
          label="Upload New"
          name="selection"
          isChecked={isUploadSelected}
          changeHandler={() => setIsUploadSelected(true)}
        />
      </div>

      {isUploadSelected ? <UploadNewQuestionBank /> : <ExistingQuestion />}
    </>
  );
}
