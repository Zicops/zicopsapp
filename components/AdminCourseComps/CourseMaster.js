import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import { COURSE_EXPERTISE_LEVEL, COURSE_TYPES } from '@/constants/course.constants';
import { LANGUAGES } from '@/helper/constants.helper';
import { useHandleCatSubCat } from '@/helper/hooks.helper';
import { CourseMetaDataAtom } from '@/state/atoms/courses.atom';
import { UsersOrganizationAtom } from '@/state/atoms/users.atom';
import { useRecoilValue } from 'recoil';
import styles from './adminCourseComps.module.scss';
import NextBtn from './NextBtn';
import { courseTabs } from './Logic/adminCourseComps.helper';
import useHandleCourseData from './Logic/useHandleCourseData';

export default function CourseMaster() {
  const courseMetaData = useRecoilValue(CourseMetaDataAtom);
  const userOrgData = useRecoilValue(UsersOrganizationAtom);

  const { ownerList, handleChange, handleExpertise } = useHandleCourseData();
  const { catSubCat, setActiveCatId } = useHandleCatSubCat();

  const isClassroomCourse = courseMetaData?.type === COURSE_TYPES.classroom;

  return (
    <>
      {/* course name */}
      <LabeledInput
        inputOptions={{
          inputName: 'name',
          label: 'Name :',
          placeholder: 'Enter name of the course',
          value: courseMetaData?.name
        }}
        styleClass={`${styles.makeLabelInputColumnWise}`}
        changeHandler={(e) => handleChange({ name: e?.target?.value })}
      />

      {/* category and subcategory */}
      <div className={`${styles.twoColumnDisplay} ${styles.marginBetweenInputs}`}>
        <LabeledDropdown
          dropdownOptions={{
            inputName: 'category',
            label: 'Category :',
            placeholder: 'Select category',
            isSearchEnable: true,
            options: catSubCat.cat,
            value: courseMetaData?.category
              ? { value: courseMetaData?.category, label: courseMetaData?.category }
              : null
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
          dropdownOptions={{
            inputName: 'subCategory',
            label: 'Sub Category:',
            placeholder: 'Select Sub Category',
            isSearchEnable: true,
            options: catSubCat.subCat,
            value: courseMetaData?.subCategory
              ? { value: courseMetaData?.subCategory, label: courseMetaData?.subCategory }
              : null
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
            label={COURSE_EXPERTISE_LEVEL.beginner}
            value={COURSE_EXPERTISE_LEVEL.beginner}
            isChecked={courseMetaData?.expertiseLevel?.includes(COURSE_EXPERTISE_LEVEL.beginner)}
            changeHandler={handleExpertise}
          />

          <LabeledRadioCheckbox
            type="checkbox"
            label={COURSE_EXPERTISE_LEVEL.competent}
            value={COURSE_EXPERTISE_LEVEL.competent}
            isChecked={courseMetaData?.expertiseLevel?.includes(COURSE_EXPERTISE_LEVEL.competent)}
            changeHandler={handleExpertise}
          />
          <LabeledRadioCheckbox
            type="checkbox"
            label={COURSE_EXPERTISE_LEVEL.proficient}
            value={COURSE_EXPERTISE_LEVEL.proficient}
            isChecked={courseMetaData?.expertiseLevel?.includes(COURSE_EXPERTISE_LEVEL.proficient)}
            changeHandler={handleExpertise}
          />
        </div>
      </div>

      {/* Owner and Provisioner */}
      <div className={`${styles.twoColumnDisplay} ${styles.marginBetweenInputs}`}>
        <LabeledDropdown
          dropdownOptions={{
            inputName: 'owner',
            label: 'Owner :',
            placeholder: 'Select Owner',
            isSearchEnable: true,
            options: ownerList,
            value: courseMetaData?.owner
              ? { value: courseMetaData?.owner, label: courseMetaData?.owner }
              : null
          }}
          isFullWidth={true}
          isLoading={ownerList === null}
          styleClass={`${styles.makeLabelInputColumnWise}`}
          changeHandler={(e) => handleChange({ owner: e?.value })}
        />

        <LabeledDropdown
          dropdownOptions={{
            inputName: 'publisher',
            label: 'Provisioner :',
            placeholder: 'Select Provisioner',
            isSearchEnable: true,
            options: [{ value: 'Zicops', label: 'Zicops' }],
            value: courseMetaData?.publisher
              ? { value: courseMetaData?.publisher, label: courseMetaData?.publisher }
              : null
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
              : null
          }}
          isFullWidth={true}
          styleClass={`${styles.makeLabelInputColumnWise}`}
          changeHandler={(e) => handleChange({ language: e?.map((item) => item?.value) })}
        />

        {!!isClassroomCourse && (
          <LabeledInput
            inputOptions={{
              inputName: 'noOfLearner',
              label: 'No.of Learners :',
              placeholder: '00',
              value: ''
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
              label={'Organization Level'}
              isChecked={courseMetaData?.lspId === userOrgData?.defaultLsp}
              changeHandler={(e) => handleChange({ lspId: userOrgData?.defaultLsp })}
            />

            <LabeledRadioCheckbox
              type="radio"
              label={'Learning space Level'}
              isChecked={courseMetaData?.lspId === userOrgData?.lsp_id}
              changeHandler={(e) => handleChange({ lspId: userOrgData?.lsp_id })}
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
            />

            <LabeledRadioCheckbox
              type="radio"
              label={'Closed'}
              isChecked={!courseMetaData?.isDisplay}
              changeHandler={() => handleChange({ isDisplay: false })}
            />
          </div>
        </div>
      </div>

      <NextBtn />
    </>
  );
}
