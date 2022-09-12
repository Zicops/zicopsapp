import ConfirmPopUp from '@/components/common/ConfirmPopUp';
import { LANGUAGES } from '@/helper/constants.helper';
import { loadCatSubCat } from '@/helper/data.helper';
import { useContext, useState } from 'react';
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
  const [showConfirmBox, setShowConfirmBox] = useState(false);

  // cat and sub cat
  const [catAndSubCatOption, setCatAndSubCatOption] = useState({ cat: [], subCat: [] });
  // update sub cat based on cat
  loadCatSubCat(catAndSubCatOption, setCatAndSubCatOption, fullCourse?.category);

  // const allCatOptions = [];
  // data?.allCategories?.map((val) => allCatOptions.push({ value: val, label: val }));
  const categoryDropdownOptions = {
    inputName: 'category',
    label: 'Course Category',
    placeholder: 'Select the category of the course',
    options: catAndSubCatOption.cat,
    value: fullCourse?.category
      ? { value: fullCourse?.category, label: fullCourse?.category }
      : null,
    isSearchEnable: true
  };

  // const allSubcatOptions = [];
  // data?.allSubCategories?.map((val) => allSubcatOptions.push({ value: val, label: val }));
  const subcategoryDropdownOptions = {
    inputName: 'sub_category',
    label: 'Select Base Sub-category',
    placeholder: 'Select the sub-category of the course',
    options: catAndSubCatOption.subCat,
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

  const allLanguages = LANGUAGES?.map((lang) => ({ label: lang, value: lang }));
  const allSelectedLanguages = [];

  fullCourse?.language?.map((val) => allSelectedLanguages.push({ value: val, label: val }));
  const languageDropdownOptions = {
    inputName: 'language',
    label: 'Languages',
    placeholder: 'Select multiple language for the course',
    options: allLanguages,
    value: allSelectedLanguages,
    isSearchEnable: true,
    menuPlacement: 'top',
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
        changeHandler={
          (e) => updateCourseMaster({ ...fullCourse, category: e.value, sub_category: '' })
          // changeHandler(e, fullCourse, updateCourseMaster, categoryDropdownOptions.inputName)
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
          isChecked={fullCourse?.is_active}
          handleChange={(e) => {
            if (!fullCourse?.is_active)
              return updateCourseMaster({ ...fullCourse, is_active: true });

            setShowConfirmBox(true);
          }}
        />
        <SwitchButton
          label="Display"
          inputName="is_display"
          isChecked={fullCourse?.is_display || false}
          handleChange={handleChange}
        />
      </div>

      <NextButton tabIndex={1} />

      {showConfirmBox && (
        <ConfirmPopUp
          title={
            'Are you sure about deleting this course? This will delete the course permanently!'
          }
          btnObj={{
            handleClickLeft: () => {
              updateCourseMaster({ ...fullCourse, is_active: false });
              setShowConfirmBox(false);
            },
            handleClickRight: () => setShowConfirmBox(false)
          }}
        />
      )}
    </>
  );
}
