import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import { changeHandler } from '@/helper/common.helper';
import { VendorExperiencesAtom } from '@/state/atoms/vendor.atoms';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from './vendorComps.module.scss';
import { months, years } from '@/helper/utils.helper';

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

const optionMonthArray = months.map((val) => ({
  label: val,
  value: val
}));

const _years = years;
const optionYearArray = _years.map((val) => ({
  label: val,
  value: val
}));

const AddExpriences = () => {
  const [employmentType, setEmploymentType] = useState(null);
  const [locationType, setLocationType] = useState(null);
  const [startMonth, setStartMonth] = useState(null);
  const [endMonth, setEndMonth] = useState(null);
  const [experiencesData, setExperiencesData] = useRecoilState(VendorExperiencesAtom);

  return (
    <div className={`${styles.addExpriencesForm}`}>
      <div className={`${styles.title}`}>
        <label for="vendorName">Title: </label>
        <LabeledInput
          inputOptions={{
            inputName: 'title',
            placeholder: 'Enter title',
            value: experiencesData?.title
          }}
          changeHandler={(e) => changeHandler(e, experiencesData, setExperiencesData)}
        />
      </div>
      <div className={`${styles.inputContainer}`}>
        <div className={`${styles.input1}`}>
          <label for="vendorName">Company name: </label>
          <LabeledInput
            inputOptions={{
              inputName: 'companyName',
              placeholder: 'Enter company name',
              value: experiencesData?.companyName
            }}
            changeHandler={(e) => changeHandler(e, experiencesData, setExperiencesData)}
          />
        </div>
        <div className={`${styles.input1}`}>
          <label for="employeeType">Employment type: </label>
          <LabeledDropdown
            dropdownOptions={{
              inputName: 'employeeType',
              placeholder: 'Select employment type',
              value: {
                label: experiencesData.employeeType,
                value: experiencesData.employeeType
              },
              options: optionEmploymentTypeArray
            }}
            changeHandler={(e) =>
              changeHandler(e, experiencesData, setExperiencesData, 'employeeType')
            }
            styleClass={styles.dropDownMain}
          />
        </div>
        <div className={`${styles.input1}`}>
          <label for="vendorName">Location: </label>
          <LabeledInput
            inputOptions={{
              inputName: 'location',
              placeholder: 'Ex. Pune, Maharashtra',
              value: experiencesData?.location
            }}
            changeHandler={(e) => changeHandler(e, experiencesData, setExperiencesData)}
          />
        </div>
        <div className={`${styles.input1}`}>
          <label for="locationType">Location type: </label>
          <LabeledDropdown
            dropdownOptions={{
              inputName: 'locationType',
              placeholder: 'Select location type',
              value: {
                label: experiencesData.locationType,
                value: experiencesData.locationType
              },
              options: optionLocationTypeArray
            }}
            changeHandler={(e) =>
              changeHandler(e, experiencesData, setExperiencesData, 'locationType')
            }
            styleClass={styles.dropDownMain}
          />
        </div>
      </div>
      <div className={`${styles.checkBoxRole}`}>
        <LabeledRadioCheckbox
          label="Curranty working in this role"
          type="checkbox"
          name="isWorking"
          isChecked={experiencesData?.isWorking}
          changeHandler={(e) => changeHandler(e, experiencesData, setExperiencesData)}
        />
      </div>
      <div>
        <label for="vendorName">Start date: </label>
        <div className={`${styles.inputContainer2}`}>
          <LabeledDropdown
            dropdownOptions={{
              inputName: 'startMonth',
              placeholder: 'Month',
              value: {
                label: experiencesData.startMonth,
                value: experiencesData.startMonth
              },
              options: optionMonthArray
            }}
            changeHandler={(e) =>
              changeHandler(e, experiencesData, setExperiencesData, 'startMonth')
            }
            styleClass={styles.dropDownMain}
          />
          <LabeledDropdown
            dropdownOptions={{
              inputName: 'startYear',
              placeholder: 'year',
              options: optionYearArray,
              value: {
                label: experiencesData.startYear,
                value: experiencesData.startYear
              }
            }}
            changeHandler={(e) =>
              changeHandler(e, experiencesData, setExperiencesData, 'startYear')
            }
            styleClass={styles.dropDownMain}
          />
        </div>
        <div className={`${styles.dropDownMain}`}>
          <label for="vendorName">End date: </label>
          <div className={`${styles.inputContainer2}`}>
            <LabeledDropdown
              dropdownOptions={{
                inputName: 'endMonth',
                placeholder: 'Month',
                options: optionMonthArray,
                value: {
                  label: experiencesData.endMonth,
                  value: experiencesData.endMonth
                }
              }}
              changeHandler={(e) =>
                changeHandler(e, experiencesData, setExperiencesData, 'endMonth')
              }
              styleClass={styles.dropDownMain}
            />
            <LabeledDropdown
              dropdownOptions={{
                inputName: 'endYear',
                placeholder: 'year',
                options: optionYearArray,
                value: {
                  label: experiencesData.endYear,
                  value: experiencesData.endYear
                }
              }}
              changeHandler={(e) =>
                changeHandler(e, experiencesData, setExperiencesData, 'endYear')
              }
              styleClass={styles.dropDownMain}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExpriences;
