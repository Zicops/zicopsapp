import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import { changeHandler } from '@/helper/common.helper';
import { VendorExpriencesAtom } from '@/state/atoms/vendor.atoms';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from './vendorComps.module.scss';

const optionEmploymentTypeArray = [
  'Full-time',
  'Part-time',
  'Self employed',
  'Freelance',
  'Internship',
  'Trainee'
].map((val) => ({
  label: val,
  value: val
}));

const optionLocationTypeArray = ['Hybrid', 'Remote', 'On-site'].map((val) => ({
  label: val,
  value: val
}));

const optionMonthArray = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
].map((val) => ({
  label: val,
  value: val
}));

const AddExpriences = () => {
  const [employmentType, setEmploymentType] = useState(null);
  const [locationType, setLocationType] = useState(null);
  const [startMonth, setStartMonth] = useState(null);
  const [endMonth, setEndMonth] = useState(null);
  const [expriencesData, setExpriencesData] = useRecoilState(VendorExpriencesAtom);
  return (
    <div className={`${styles.addExpriencesForm}`}>
      <div className={`${styles.title}`}>
        <label for="vendorName">Title: </label>
        <LabeledInput
          inputOptions={{
            inputName: 'title',
            placeholder: 'Enter title',
            value: expriencesData?.title
          }}
          changeHandler={(e) => changeHandler(e, expriencesData, setExpriencesData)}
        />
      </div>
      <div className={`${styles.inputContainer}`}>
        <div className={`${styles.input1}`}>
          <label for="vendorName">Company name: </label>
          <LabeledInput
            inputOptions={{
              inputName: 'companyName',
              placeholder: 'Enter company name',
              value: expriencesData?.companyName
            }}
            changeHandler={(e) => changeHandler(e, expriencesData, setExpriencesData)}
          />
        </div>
        <div className={`${styles.input1}`}>
          <label for="vendorName">Employment type: </label>
          <LabeledDropdown
            dropdownOptions={{
              inputName: 'employment type',
              placeholder: 'Select employment type',
              value: employmentType,
              options: optionEmploymentTypeArray
            }}
            changeHandler={(val) => setEmploymentType(val)}
            styleClass={styles.dropDownMain}
          />
        </div>
        <div className={`${styles.input1}`}>
          <label for="vendorName">Location: </label>
          <LabeledInput
            inputOptions={{
              inputName: 'location',
              placeholder: 'Ex. Pune, Maharashtra',
              value: expriencesData?.location
            }}
            changeHandler={(e) => changeHandler(e, expriencesData, setExpriencesData)}
          />
        </div>
        <div className={`${styles.input1}`}>
          <label for="vendorName">Location type: </label>
          <LabeledDropdown
            dropdownOptions={{
              inputName: 'year',
              placeholder: 'Select location type',
              value: locationType,
              options: optionLocationTypeArray
            }}
            changeHandler={(val) => setLocationType(val)}
            styleClass={styles.dropDownMain}
          />
        </div>
      </div>
      <div className={`${styles.checkBoxRole}`}>
        <LabeledRadioCheckbox
          label="Curranty working in this role"
          type="checkbox"
          name="isWorking"
          isChecked={expriencesData?.isWorking}
          changeHandler={(e) => changeHandler(e, expriencesData, setExpriencesData)}
        />
      </div>
      <div>
        <label for="vendorName">Start date: </label>
        <div className={`${styles.inputContainer2}`}>
          <LabeledDropdown
            dropdownOptions={{
              inputName: 'Month',
              placeholder: 'Month',
              value: startMonth,
              options: optionMonthArray
            }}
            changeHandler={(val) => setStartMonth(val)}
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
                placeholder: 'Month',
                value: endMonth,
                options: optionMonthArray
              }}
              changeHandler={(val) => setEndMonth(val)}
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
