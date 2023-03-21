import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import { COURSE_EXPERTISE_LEVEL, COURSE_TYPES } from '@/constants/course.constants';
import { LANGUAGES } from '@/helper/constants.helper';
import { useHandleCatSubCat } from '@/helper/hooks.helper';
import { CourseCurrentStateAtom, CourseMetaDataAtom } from '@/state/atoms/courses.atom';
import { UsersOrganizationAtom } from '@/state/atoms/users.atom';
import { useRecoilValue } from 'recoil';
import styles from './adminCourseComps.module.scss';
import NextBtn from './NextBtn';
import { courseTabs } from './Logic/adminCourseComps.helper';
import useHandleCourseData from './Logic/useHandleCourseData';

export default function CourseMaster() {
  const { error, isDisabled } = useRecoilValue(CourseCurrentStateAtom);
  const courseMetaData = useRecoilValue(CourseMetaDataAtom);
  const userOrgData = useRecoilValue(UsersOrganizationAtom);

  const { ownerList, handleChange, handleExpertise } = useHandleCourseData();
  const { catSubCat, setActiveCatId } = useHandleCatSubCat();

  const isClassroomCourse = courseMetaData?.type === COURSE_TYPES.classroom;

  return (
    <>
      {/* course name */}
      <LabeledInput
        inputClass={!courseMetaData?.name?.length && error?.includes('name') ? 'error' : ''}
        inputOptions={{
          inputName: 'name',
          label: 'Name :',
          placeholder: 'Enter name of the course',
          value: courseMetaData?.name,
          isDisabled: isDisabled
        }}
        styleClass={`${styles.makeLabelInputColumnWise}`}
        changeHandler={(e) => handleChange({ name: e?.target?.value })}
      />

      {/* category and subcategory */}
      <div className={`${styles.twoColumnDisplay} ${styles.marginBetweenInputs}`}>
        <LabeledDropdown
          isError={!courseMetaData?.category?.length && error?.includes('category')}
          dropdownOptions={{
            inputName: 'category',
            label: 'Category :',
            placeholder: 'Select category',
            isSearchEnable: true,
            options: catSubCat.cat,
            value: courseMetaData?.category
              ? { value: courseMetaData?.category, label: courseMetaData?.category }
              : null,
            isDisabled: isDisabled
          }}
          isLoading={!catSubCat?.isDataLoaded}
          isFullWidth={true}
          styleClass={`${styles.makeLabelInputColumnWise}`}
          changeHandler={(e) => {
            setActiveCatId(e);
            handleChange({ category: e?.value, subCategory: '' });
          }}
        />

        <LabeledDropdown
          isError={!courseMetaData?.subCategory?.length && error?.includes('subCategory')}
          dropdownOptions={{
            inputName: 'subCategory',
            label: 'Sub Category:',
            placeholder: 'Select Sub Category',
            isSearchEnable: true,
            options: catSubCat.subCat,
            value: courseMetaData?.subCategory
              ? { value: courseMetaData?.subCategory, label: courseMetaData?.subCategory }
              : null,
            isDisabled: isDisabled
          }}
          isFullWidth={true}
          isLoading={!catSubCat?.isDataLoaded}
          styleClass={`${styles.makeLabelInputColumnWise}`}
          changeHandler={(e) => handleChange({ subCategory: e?.value })}
        />
      </div>

      {/* expertise level */}
      <div className={`${styles.expertiseContainer} ${styles.marginBetweenInputs}`}>
        <p>Level of Expertise</p>

        <div className={`${styles.expertise}`}>
          <LabeledRadioCheckbox
            type="checkbox"
            isError={!courseMetaData?.expertiseLevel?.length && error?.includes('expertiseLevel')}
            label={COURSE_EXPERTISE_LEVEL.beginner}
            value={COURSE_EXPERTISE_LEVEL.beginner}
            isChecked={courseMetaData?.expertiseLevel?.includes(COURSE_EXPERTISE_LEVEL.beginner)}
            changeHandler={handleExpertise}
            isDisabled={isDisabled}
          />

          <LabeledRadioCheckbox
            type="checkbox"
            isError={!courseMetaData?.expertiseLevel?.length && error?.includes('expertiseLevel')}
            label={COURSE_EXPERTISE_LEVEL.competent}
            value={COURSE_EXPERTISE_LEVEL.competent}
            isChecked={courseMetaData?.expertiseLevel?.includes(COURSE_EXPERTISE_LEVEL.competent)}
            changeHandler={handleExpertise}
            isDisabled={isDisabled}
          />
          <LabeledRadioCheckbox
            type="checkbox"
            isError={!courseMetaData?.expertiseLevel?.length && error?.includes('expertiseLevel')}
            label={COURSE_EXPERTISE_LEVEL.proficient}
            value={COURSE_EXPERTISE_LEVEL.proficient}
            isChecked={courseMetaData?.expertiseLevel?.includes(COURSE_EXPERTISE_LEVEL.proficient)}
            changeHandler={handleExpertise}
            isDisabled={isDisabled}
          />
        </div>
      </div>

      {/* Owner and Provisioner */}
      <div className={`${styles.twoColumnDisplay} ${styles.marginBetweenInputs}`}>
        <LabeledDropdown
          isError={!courseMetaData?.owner?.length && error?.includes('owner')}
          dropdownOptions={{
            inputName: 'owner',
            label: 'Owner :',
            placeholder: 'Select Owner',
            isSearchEnable: true,
            options: ownerList,
            value: courseMetaData?.owner
              ? { value: courseMetaData?.owner, label: courseMetaData?.owner }
              : null,
            isDisabled: isDisabled
          }}
          isFullWidth={true}
          isLoading={ownerList === null}
          styleClass={`${styles.makeLabelInputColumnWise}`}
          changeHandler={(e) => handleChange({ owner: e?.value })}
        />

        <LabeledDropdown
          isError={!courseMetaData?.publisher?.length && error?.includes('publisher')}
          dropdownOptions={{
            inputName: 'publisher',
            label: 'Provisioner :',
            placeholder: 'Select Provisioner',
            isSearchEnable: true,
            options: [{ value: 'Zicops', label: 'Zicops' }],
            value: courseMetaData?.publisher
              ? { value: courseMetaData?.publisher, label: courseMetaData?.publisher }
              : null,
            isDisabled: isDisabled
          }}
          isFullWidth={true}
          // isLoading={ownerList === null}
          styleClass={`${styles.makeLabelInputColumnWise}`}
          changeHandler={(e) => handleChange({ publisher: e?.value })}
        />
      </div>

      {/* language and no of leaner */}
      <div className={`${styles.twoColumnDisplay} ${styles.marginBetweenInputs}`}>
        <LabeledDropdown
          isError={!courseMetaData?.language?.length && error?.includes('language')}
          dropdownOptions={{
            inputName: 'language',
            label: 'Language :',
            placeholder: 'Select multiple languages for the course',
            isSearchEnable: true,
            menuPlacement: 'top',
            isMulti: true,
            options: LANGUAGES?.map((lang) => ({ label: lang, value: lang })),
            value: !!courseMetaData?.language?.length
              ? courseMetaData?.language?.map((lang) => ({ label: lang, value: lang }))
              : null,
            isDisabled: isDisabled
          }}
          isFullWidth={true}
          styleClass={`${styles.makeLabelInputColumnWise}`}
          changeHandler={(e) => handleChange({ language: e?.map((item) => item?.value) })}
        />

        {!!isClassroomCourse && (
          <LabeledInput
            // inputClass={!courseMetaData?.name?.length && error?.includes('name') ? 'error' : ''}
            inputOptions={{
              inputName: 'noOfLearner',
              label: 'No.of Learners :',
              placeholder: '00',
              value: '',
              isDisabled: isDisabled
            }}
            styleClass={`${styles.makeLabelInputColumnWise}`}
            // changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
          />
        )}
      </div>

      {/* course level and is display */}
      <div className={`${styles.twoColumnDisplay} ${styles.marginBetweenInputs}`}>
        <div className={`${styles.courseSettings}`}>
          <p>Privacy Settings :</p>

          <div>
            <LabeledRadioCheckbox
              type="radio"
              isError={!courseMetaData?.lspId?.length && error?.includes('lspId')}
              label={'Organization Level'}
              isChecked={courseMetaData?.lspId === userOrgData?.defaultLsp}
              changeHandler={(e) => handleChange({ lspId: userOrgData?.defaultLsp })}
              isDisabled={true}
              // isDisabled={isDisabled}
            />

            <LabeledRadioCheckbox
              type="radio"
              isError={!courseMetaData?.lspId?.length && error?.includes('lspId')}
              label={'Learning space Level'}
              isChecked={courseMetaData?.lspId === userOrgData?.lsp_id}
              changeHandler={(e) => handleChange({ lspId: userOrgData?.lsp_id })}
              isDisabled={true}
              // isDisabled={isDisabled}
            />
          </div>
        </div>

        <div className={`${styles.courseSettings}`}>
          <p>Access Control :</p>

          <div>
            <LabeledRadioCheckbox
              type="radio"
              label={'Open'}
              isChecked={courseMetaData?.isDisplay}
              changeHandler={() => handleChange({ isDisplay: true })}
              isDisabled={isDisabled}
            />

            <LabeledRadioCheckbox
              type="radio"
              label={'Closed'}
              isChecked={!courseMetaData?.isDisplay}
              changeHandler={() => handleChange({ isDisplay: false })}
              isDisabled={isDisabled}
            />
          </div>
        </div>
      </div>

      <NextBtn switchTabName={courseTabs?.details?.name} />
    </>
  );
}
