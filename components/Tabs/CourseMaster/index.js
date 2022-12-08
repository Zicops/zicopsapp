import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import { ADMIN_COURSES } from '@/components/common/ToolTip/tooltip.helper';
import { COURSE_STATUS, LANGUAGES } from '@/helper/constants.helper';
import { useHandleCatSubCat } from '@/helper/hooks.helper';
import { courseErrorAtom } from '@/state/atoms/module.atoms';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UsersOrganizationAtom } from '@/state/atoms/users.atom';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { changeHandler } from '../../../helper/common.helper';
import { courseContext } from '../../../state/contexts/CourseContext';
import LabeledDropdown from '../../common/FormComponents/LabeledDropdown';
import LabeledInput from '../../common/FormComponents/LabeledInput';
import NextButton from '../common/NextButton';
import styles from '../courseTabs.module.scss';
import useHandleTabs from '../Logic/useHandleTabs';

export default function CourseMaster() {
  const courseContextData = useContext(courseContext);
  const { fullCourse, updateCourseMaster, handleChange } = useHandleTabs(courseContextData);
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const [courseError, setCourseError] = useRecoilState(courseErrorAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const router = useRouter();
  const userOrgData = useRecoilValue(UsersOrganizationAtom);

  // cat and sub cat
  // const [catAndSubCatOption, setCatAndSubCatOption] = useState({ cat: [], subCat: [] });
  // update sub cat based on cat
  // loadCatSubCat(catAndSubCatOption, setCatAndSubCatOption, fullCourse?.category);
  const { catSubCat, setActiveCatId } = useHandleCatSubCat(fullCourse?.category);

  let isDisabled = !!fullCourse?.qa_required;
  if (fullCourse?.status === COURSE_STATUS.publish) isDisabled = true;
  if (fullCourse?.status === COURSE_STATUS.reject) isDisabled = true;

  // const allCatOptions = [];
  // data?.allCategories?.map((val) => allCatOptions.push({ value: val, label: val }));
  const categoryDropdownOptions = {
    inputName: 'category',
    label: 'Course Category',
    placeholder: 'Select the category of the course',
    options: catSubCat?.cat,
    value: fullCourse?.category
      ? { value: fullCourse?.category, label: fullCourse?.category }
      : null,
    isSearchEnable: true,
    isDisabled: isDisabled
  };

  // const allSubcatOptions = [];
  // data?.allSubCategories?.map((val) => allSubcatOptions.push({ value: val, label: val }));
  const subcategoryDropdownOptions = {
    inputName: 'sub_category',
    label: 'Base Sub-category',
    placeholder: 'Select the sub-category of the course',
    options: catSubCat.subCat,
    value: fullCourse?.sub_category
      ? { value: fullCourse?.sub_category, label: fullCourse?.sub_category }
      : null,
    isSearchEnable: true,
    isDisabled: isDisabled
  };

  const allOwners = [{ value: 'Zicops', label: 'Zicops' }];

  const ownerDropdownOptions = {
    inputName: 'owner',
    label: 'Course Owner',
    placeholder: 'Select the owner of the course',
    options: allOwners,
    value: fullCourse?.owner ? { value: fullCourse?.owner, label: fullCourse?.owner } : null,
    isSearchEnable: true,
    isDisabled: isDisabled
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
    isMulti: true,
    isDisabled: isDisabled
  };

  return (
    <>
      {/* course name */}
      <LabeledInput
        styleClass={`${styles.marginBottom}`}
        inputClass={!fullCourse?.name?.length && courseError?.master ? 'error' : ''}
        inputOptions={{
          inputName: 'name',
          label: 'Name',
          placeholder: 'Enter name of the course (Upto 60 characters)',
          maxLength: 60,
          value: fullCourse?.name,
          isDisabled: isDisabled
        }}
        changeHandler={handleChange}
      />

      {/* course category */}
      <LabeledDropdown
        styleClass={styles.marginBottom}
        isError={!fullCourse?.category?.length && courseError?.master}
        dropdownOptions={categoryDropdownOptions}
        changeHandler={
          (e) => {
            setActiveCatId(e);
            updateCourseMaster({ ...fullCourse, category: e.value, sub_category: '' });
          }
          // changeHandler(e, fullCourse, updateCourseMaster, categoryDropdownOptions.inputName)
        }
      />

      {/* course sub category */}
      <LabeledDropdown
        styleClass={styles.marginBottom}
        isError={!fullCourse?.sub_category?.length && courseError?.master}
        dropdownOptions={subcategoryDropdownOptions}
        changeHandler={(e) =>
          changeHandler(e, fullCourse, updateCourseMaster, subcategoryDropdownOptions.inputName)
        }
      />

      {/* course owner */}
      <LabeledDropdown
        styleClass={styles.marginBottom}
        isError={!fullCourse?.owner?.length && courseError?.master}
        dropdownOptions={ownerDropdownOptions}
        changeHandler={(e) =>
          changeHandler(e, fullCourse, updateCourseMaster, ownerDropdownOptions.inputName)
        }
      />

      {/* course publisher */}
      <LabeledInput
        styleClass={`${styles.marginBottom}`}
        inputClass={!fullCourse?.publisher?.length && courseError?.master ? 'error' : ''}
        inputOptions={{
          inputName: 'publisher',
          label: 'Publisher / Author',
          placeholder: 'Enter name of the Publisher / Author',
          maxLength: 60,
          value: fullCourse?.publisher,
          isDisabled: isDisabled
        }}
        changeHandler={handleChange}
      />

      {/* language */}
      <LabeledDropdown
        styleClass={styles.marginBottom}
        isError={!fullCourse?.language?.length && courseError?.master}
        dropdownOptions={languageDropdownOptions}
        changeHandler={(e) =>
          changeHandler(e, fullCourse, updateCourseMaster, languageDropdownOptions.inputName)
        }
      />

      {/* <div className={`w-100 center-element-with-flex ${styles.switchContainer}`}>
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
      </div> */}

      <div style={{ display: 'flex' }}>
        <div className={`w-25`}>Privacy Settings</div>
        <div className={`w-75`} style={{ display: 'flex', gap: '100px' }}>
          <LabeledRadioCheckbox
            type="radio"
            label="Organisation Level"
            name="lspId"
            isChecked={fullCourse?.lspId === userOrgData?.defaultLsp}
            // isDisabled={!!fullCourse?.id}
            isDisabled={true}
            changeHandler={(e) => {
              updateCourseMaster({ ...fullCourse, lspId: userOrgData?.defaultLsp });
            }}
          />
          <LabeledRadioCheckbox
            type="radio"
            label="Learning Space Level"
            name="lspId"
            isChecked={fullCourse?.lspId === userOrgData?.lsp_id}
            isDisabled={true}
            changeHandler={(e) => {
              updateCourseMaster({ ...fullCourse, lspId: userOrgData?.lsp_id });
            }}
          />
        </div>
      </div>
      <NextButton
        tabIndex={1}
        isActive={
          fullCourse?.name &&
          fullCourse?.category &&
          fullCourse?.sub_category &&
          fullCourse?.publisher &&
          fullCourse?.owner &&
          fullCourse?.language?.length
        }
        tooltipTitle={ADMIN_COURSES.myCourses.courseMaster.nextBtn}
      />

      {/* {showConfirmBox && (
        <ConfirmPopUp
          title={
            'Are you sure about deleting this course? This will delete the course permanently!'
          }
          btnObj={{
            handleClickLeft: async () => {
              const isDeleted = await deleteData(DELETE_COURSE, { id: fullCourse?.id });
              // console.log(isDeleted);
              setShowConfirmBox(false);

              if (!isDeleted?.deleteCourse)
                return setToastMsg({ type: 'danger', message: 'Course Delete Error' });

              router.push('/admin/course/my-courses');
            },
            handleClickRight: () => setShowConfirmBox(false)
          }}
        />
      )} */}
    </>
  );
}
