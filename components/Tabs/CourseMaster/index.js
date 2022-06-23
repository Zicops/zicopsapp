import { useContext } from 'react';
import { GET_CATS_N_SUB_CATS } from '../../../API/Queries';
import { getQueryData } from '../../../helper/api.helper';
import { changeHandler } from '../../../helper/common.helper';
import { courseContext } from '../../../state/contexts/CourseContext';
import LabeledDropdown from '../../common/FormComponents/LabeledDropdown';
import LabeledInput from '../../common/FormComponents/LabeledInput';
import SwitchButton from '../../common/FormComponents/SwitchButton';
import NextButton from '../common/NextButton';
import styles from '../courseTabs.module.scss';
import useHandleTabs from '../Logic/useHandleTabs';

export default function CourseMaster() {
  const courseContextData = useContext(courseContext);
  const { fullCourse, updateCourseMaster, handleChange } = useHandleTabs(courseContextData);
  const { data } = getQueryData(GET_CATS_N_SUB_CATS);

  const allCatOptions = [];
  data?.allCategories?.map((val) => allCatOptions.push({ value: val, label: val }));
  const categoryDropdownOptions = {
    inputName: 'category',
    label: 'Course Category',
    placeholder: 'Select the category of the course',
    options: allCatOptions,
    value: fullCourse?.category
      ? { value: fullCourse?.category, label: fullCourse?.category }
      : null,
    isSearchEnable: true
  };

  const allSubcatOptions = [];
  data?.allSubCategories?.map((val) => allSubcatOptions.push({ value: val, label: val }));
  const subcategoryDropdownOptions = {
    inputName: 'sub_category',
    label: 'Select Base Sub-category',
    placeholder: 'Select the sub-category of the course',
    options: allSubcatOptions,
    value: fullCourse?.sub_category
      ? { value: fullCourse?.sub_category, label: fullCourse?.sub_category }
      : null,
    isSearchEnable: true
  };

  const allOwners = [
    { value: 'Abhishek', label: 'Abhishek' },
    { value: 'Sonali', label: 'Sonali' },
    { value: 'Joy', label: 'Joy' },
    { value: 'Puneet', label: 'Puneet' },
    { value: 'Vaishnavi', label: 'Vaishnavi' },
    { value: 'Harshad', label: 'Harshad' },
    { value: 'Rishav', label: 'Rishav' }
  ];
  const ownerDropdownOptions = {
    inputName: 'owner',
    label: 'Course Owner',
    placeholder: 'Select the owner of the course',
    options: allOwners,
    value: fullCourse?.owner ? { value: fullCourse?.owner, label: fullCourse?.owner } : null,
    isSearchEnable: true
  };

  const allLanguages = [
    { value: 'English', label: 'English' },
    { value: 'Hindi', label: 'Hindi' },
    { value: 'Marathi', label: 'Marathi' },
    { value: 'Bengali', label: 'Bengali' },
    { value: 'Telegu', label: 'Telegu' },
    { value: 'Tamil', label: 'Tamil' },
    { value: 'Kannada', label: 'Kannada' },
    { value: 'Punjabi', label: 'Punjabi' },
    { value: 'Assamese', label: 'Assamese' },
    { value: 'Orria', label: 'Orria' },
    { value: 'Bhojpuri', label: 'Bhojpuri' },
    { value: 'Maithili', label: 'Maithili' }
  ];
  const allSelectedLanguages = [];


  fullCourse?.language?.map((val) => allSelectedLanguages.push({ value: val, label: val }));
  const languageDropdownOptions = {
    inputName: 'language',
    label: 'Languages',
    placeholder: 'Select multiple language for the course',
    options: allLanguages,
    value: allSelectedLanguages,
    isSearchEnable: true,
    isMulti: true
  };

  return (
    <>
      {/* course name */}
      <LabeledInput
        styleClass={styles.marginBottom}
        inputOptions={{
          inputName: 'name',
          label: 'Name',
          placeholder: 'Enter name of the course (Upto 60 characters)',
          maxLength: 60,
          value: fullCourse.name
        }}
        changeHandler={handleChange}
      />

      {/* course category */}
      <LabeledDropdown
        styleClass={styles.marginBottom}
        dropdownOptions={categoryDropdownOptions}
        changeHandler={(e) =>
          changeHandler(e, fullCourse, updateCourseMaster, categoryDropdownOptions.inputName)
        }
      />

      {/* course sub category */}
      <LabeledDropdown
        styleClass={styles.marginBottom}
        dropdownOptions={subcategoryDropdownOptions}
        changeHandler={(e) =>
          changeHandler(e, fullCourse, updateCourseMaster, subcategoryDropdownOptions.inputName)
        }
      />

      {/* course owner */}
      <LabeledDropdown
        styleClass={styles.marginBottom}
        dropdownOptions={ownerDropdownOptions}
        changeHandler={(e) =>
          changeHandler(e, fullCourse, updateCourseMaster, ownerDropdownOptions.inputName)
        }
      />

      {/* language */}
      <LabeledDropdown
        styleClass={styles.marginBottom}
        dropdownOptions={languageDropdownOptions}
        changeHandler={(e) =>
          changeHandler(e, fullCourse, updateCourseMaster, languageDropdownOptions.inputName)
        }
      />

      <div className={`w-100 center-element-with-flex ${styles.switchContainer}`}>
        <SwitchButton
          label="Active"
          inputName="is_active"
          isChecked={fullCourse?.is_active || false}
          handleChange={handleChange}
        />
        <SwitchButton
          label="Display"
          inputName="is_display"
          isChecked={fullCourse?.is_display || false}
          handleChange={handleChange}
        />
      </div>

      <NextButton tabIndex={1} />
    </>
  );
}
