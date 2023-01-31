import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import React from 'react';
import styles from '../vendorComps.module.scss';
const AddExpriences = () => {
  return (
    <div className={`${styles.addExpriencesForm}`}>
      <div className={`${styles.title}`}>
        <label for="vendorName">Title: </label>
        <LabeledInput
          inputOptions={{
            inputName: 'vendorAddress',
            placeholder: 'Enter title'
            // value: vendorData.vendorAddress
          }}
          //   changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
        />
      </div>
      <div className={`${styles.inputContainer}`}>
        <div className={`${styles.input1}`}>
          <label for="vendorName">Company name: </label>
          <LabeledInput
            inputOptions={{
              inputName: 'vendorAddress',
              placeholder: 'Enter company name'
              // value: vendorData.vendorAddress
            }}
            //   changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
          />
        </div>
        <div className={`${styles.input1}`}>
          <label for="vendorName">Employment type: </label>
          <LabeledDropdown
            dropdownOptions={{
              inputName: 'year',
              placeholder: 'Select employment type'
            }}
            styleClass={styles.dropDownMain}
          />
        </div>
        <div className={`${styles.input1}`}>
          <label for="vendorName">Location: </label>
          <LabeledInput
            inputOptions={{
              inputName: 'vendorAddress',
              placeholder: 'Enter title'
              // value: vendorData.vendorAddress
            }}
            //   changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
          />
        </div>
        <div className={`${styles.input1}`}>
          <label for="vendorName">Location type: </label>
          <LabeledDropdown
            dropdownOptions={{
              inputName: 'year',
              placeholder: 'Select location type'
            }}
            styleClass={styles.dropDownMain}
          />
        </div>
      </div>
      <div className={`${styles.checkBoxRole}`}>
        <LabeledRadioCheckbox
          label="Curranty working in this role"
          type="checkbox"
          name="speaker"
          //   isChecked={data[`${inputName}`]}
          //   changeHandler={(e) => changeHandler(e, data, setData)}
        />
      </div>
      <div>
        <label for="vendorName">Start date: </label>
        <div className={`${styles.inputContainer2}`}>
          <LabeledDropdown
            dropdownOptions={{
              inputName: 'Month',
              placeholder: 'Month'
            }}
            styleClass={styles.dropDownMain}
          />
          <LabeledDropdown
            dropdownOptions={{
              inputName: 'year',
              placeholder: 'year'
            }}
            styleClass={styles.dropDownMain}
          />
        </div>
        <div className={`${styles.dropDownMain}`}>
          <label for="vendorName">End date: </label>
          <div className={`${styles.inputContainer2}`}>
            <LabeledDropdown
              dropdownOptions={{
                inputName: 'Month',
                placeholder: 'Month'
              }}
              styleClass={styles.dropDownMain}
            />
            <LabeledDropdown
              dropdownOptions={{
                inputName: 'year',
                placeholder: 'year'
              }}
              styleClass={styles.dropDownMain}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExpriences;
