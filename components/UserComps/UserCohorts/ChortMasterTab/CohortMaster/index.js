import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import styles from '../../../userComps.module.scss';
import { useState } from 'react';

const CohortMaster = () => {
  const allSelectedCohortManager = [];
  const difficultyOptions = [
    { value: 'Open', label: 'Open' },
    { value: 'Close', label: 'Close' }
  ];

  const cohortManager = [
    { value: 'John Doe', label: 'John Doe' },
    { value: 'Rick Nate', label: 'Rick Nate' },
    { value: 'Abhishek Gosh', label: 'Abhishek Ghosh' }
  ];

  const chorotDropdownOptions = {
    inputName: 'cohortManagers',
    label: 'Cohort Manager',
    placeholder: 'Select Cohort Manager',
    options: cohortManager,
    value: allSelectedCohortManager,
    isSearchEnable: true,
    isMulti: true
  };

  return (
    <>
      <LabeledInput
        inputOptions={{
          inputName: 'cohort_name',
          label: 'Cohort Name:',
          placeholder: 'Enter Cohort Name (Upto 20 characters)',
          value: '',
          maxLength: 20
        }}
        styleClass={`${styles.inputField}`}
      />

      <LabeledInput
        styleClass={styles.inputField}
        inputOptions={{
          inputName: 'cohort_id',
          label: 'Cohort ID:',
          placeholder: 'Enter Cohort ID (Upto 10 characters)',
          value: '',
          maxLength: 10
        }}
      />

      <LabeledDropdown
        styleClass={styles.inputField}
        dropdownOptions={{
          inputName: 'cohort_type',
          label: 'Type:',
          placeholder: 'Select Cohort Type(Open/Close)',
          options: difficultyOptions,
          value: {
            value: '',
            label: ''
          },
          menuPlacement: 'top'
        }}
      />

      <LabeledInput
        styleClass={styles.inputField}
        inputOptions={{
          inputName: 'cohort_description',
          label: 'Description:',
          placeholder: 'Enter Description (Upto 160 characters)',
          value: '',
          maxLength: 10
        }}
      />

      <LabeledDropdown styleClass={styles.inputField} dropdownOptions={chorotDropdownOptions} />

      <div className={`${styles.uploadImage}`}>
        <label>Cohort Image:</label>
        <div className={`${styles.buttonContainer}`}>
          <button>Upload Photo</button>
          <span className={`${styles.uploadImagePreview}`}>
            <a>Preview</a>
          </span>
          <span className={`${styles.uploadImageRemove}`}>
            <a>Remove</a>
          </span>
        </div>
      </div>
    </>
  );
};

export default CohortMaster;
