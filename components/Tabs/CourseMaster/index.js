import { GET_USER_VENDORS, GET_VENDORS_BY_LSP_FOR_TABLE, userQueryClient } from '@/api/UserQueries';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import { ADMIN_COURSES } from '@/components/common/ToolTip/tooltip.helper';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { COURSE_STATUS, LANGUAGES, USER_LSP_ROLE } from '@/helper/constants.helper';
import { useHandleCatSubCat } from '@/helper/hooks.helper';
import { FeatureFlagsAtom } from '@/state/atoms/global.atom';
import { courseErrorAtom } from '@/state/atoms/module.atoms';
import { UsersOrganizationAtom, UserStateAtom } from '@/state/atoms/users.atom';
import { useContext, useEffect, useState } from 'react';
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
  const [courseError, setCourseError] = useRecoilState(courseErrorAtom);
  const userOrgData = useRecoilValue(UsersOrganizationAtom);
  const userData = useRecoilValue(UserStateAtom);
  const { isPublishCourseEditable } = useRecoilValue(FeatureFlagsAtom);
  const [ownerList, setOwnerList] = useState(null);

  // cat and sub cat
  // const [catAndSubCatOption, setCatAndSubCatOption] = useState({ cat: [], subCat: [] });
  // update sub cat based on cat
  // loadCatSubCat(catAndSubCatOption, setCatAndSubCatOption, fullCourse?.category);
  const { catSubCat, setActiveCatId } = useHandleCatSubCat(fullCourse?.category);

  const isVendor = userOrgData.user_lsp_role?.toLowerCase()?.includes(USER_LSP_ROLE.vendor);
  useEffect(() => {
    if (isVendor && !userData?.id) return;

    if (isVendor) {
      loadQueryDataAsync(GET_USER_VENDORS, { user_id: userData?.id }, {}, userQueryClient)
        .then((res) => {
          const _owners = ['Zicops', res?.getUserVendor?.[0]?.name];
          setOwnerList(_owners?.map((owner) => ({ value: owner, label: owner })));
        })
        .catch((err) => {
          console.log('Error while loading user vendor', err);
          setOwnerList([{ value: 'Zicops', label: 'Zicops' }]);
        });
      return;
    }

    loadQueryDataAsync(
      GET_VENDORS_BY_LSP_FOR_TABLE,
      { lsp_id: userOrgData?.lsp_id },
      {},
      userQueryClient
    )
      .then((res) => {
        const _owners = ['Zicops', ...(res?.getVendors?.map((vendor) => vendor?.name) || [])];
        setOwnerList(_owners?.filter((o) => !!o)?.map((owner) => ({ value: owner, label: owner })));
      })
      .catch((err) => {
        console.log('Error while loading lsp vendors', err);
        setOwnerList([{ value: 'Zicops', label: 'Zicops' }]);
      });
  }, [isVendor ? userData?.id : '']);

  let isDisabled = !!fullCourse?.qa_required;
  if (fullCourse?.status === COURSE_STATUS.publish) isDisabled = true;
  if (fullCourse?.status === COURSE_STATUS.reject) isDisabled = true;
  if (isPublishCourseEditable) isDisabled = false;

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

  const ownerDropdownOptions = {
    inputName: 'owner',
    label: 'Course Owner',
    placeholder: 'Select the owner of the course',
    options: ownerList || [],
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
        isLoading={ownerList === null}
        changeHandler={(e) =>
          changeHandler(e, fullCourse, updateCourseMaster, ownerDropdownOptions.inputName)
        }
      />
      {/* <LabeledInput
        styleClass={`${styles.marginBottom}`}
        inputClass={!fullCourse?.owner?.length && courseError?.master ? 'error' : ''}
        inputOptions={{
          inputName: 'owner',
          label: 'Course Owner',
          placeholder: 'Enter the course owner (Upto 60 characters)',
          maxLength: 60,
          value: fullCourse?.owner,
          isDisabled: isDisabled
        }}
        changeHandler={handleChange}
      /> */}

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
