import BrowseAndUpload from '@/components/common/FormComponents/BrowseAndUpload';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import LabeledTextarea from '@/components/common/FormComponents/LabeledTextarea';
import { COURSE_TYPES } from '@/constants/course.constants';
import { truncateToN } from '@/helper/common.helper';
import { FILE_TYPES } from '@/helper/constants.helper';
import { getEncodedFileNameFromUrl } from '@/helper/utils.helper';
import { CourseCurrentStateAtom, CourseMetaDataAtom } from '@/state/atoms/courses.atom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styles from '../adminCourseComps.module.scss';
import { courseTabs } from '../Logic/adminCourseComps.helper';
import useHandleCourseData from '../Logic/useHandleCourseData';
import NextBtn from '../NextBtn';
import DragDrop from './DragAndDrop';

export default function CourseDetails() {
  const [courseMetaData, setCourseMetaData] = useRecoilState(CourseMetaDataAtom);
  const { error, isDisabled } = useRecoilValue(CourseCurrentStateAtom);
  const { handleChange, handleFileInput } = useHandleCourseData();

  const isClassroomCourse = courseMetaData?.type === COURSE_TYPES.classroom;
  function getFileName(key = '', limit = 45) {
    return truncateToN(
      courseMetaData?.[key]?.name || getEncodedFileNameFromUrl(courseMetaData?.[key]),
      limit
    );
  }

  return (
    <>
      <LabeledDropdown
        dropdownOptions={{
          inputName: 'subCategory',
          label: 'Sub Category:',
          placeholder: 'Select Sub Category',
          options: [],
          value: courseMetaData?.subCategory
            ? { value: courseMetaData?.subCategory, label: courseMetaData?.subCategory }
            : null,
          isDisabled: true
        }}
        isFullWidth={true}
        styleClass={`${styles.makeLabelInputColumnWise}`}
      />

      {!isClassroomCourse && (
        <LabeledInput
          inputClass={
            +courseMetaData?.expectedCompletion === 0 && error?.includes('expectedCompletion')
              ? 'error'
              : ''
          }
          inputOptions={{
            inputName: 'expectedCompletion',
            label:
              'Suggested Duration: (Total time ideally to be taken to complete the course. - In days)',
            placeholder: 'Enter Suggested Duration in days',
            isNumericOnly: true,
            value: +courseMetaData?.expectedCompletion || null,
            isDisabled: isDisabled
          }}
          styleClass={`${styles.makeLabelInputColumnWise} ${styles.marginBetweenInputs}`}
          changeHandler={(e) => handleChange({ expectedCompletion: e?.target?.value || null })}
        />
      )}

      <div
        className={`${styles.twoColumnDisplay} ${styles.marginBetweenInputs} ${
          error?.includes('subCategories') ? 'error' : ''
        }`}>
        <DragDrop isFreezed={isDisabled} />
      </div>

      <LabeledTextarea
        isError={!courseMetaData?.summary?.length && error?.includes('summary')}
        inputOptions={{
          label: 'Course Summary :',
          placeholder: 'Provide an outline of the course in less then 500 charactor',
          rows: 4,
          maxLength: 500,
          value: courseMetaData?.summary,
          isDisabled: isDisabled
        }}
        styleClass={`${styles.makeLabelInputColumnWise}`}
        changeHandler={(e) => handleChange({ summary: e?.target?.value })}
      />

      <div className={`${styles.makeLabelInputColumnWise} ${styles.marginBetweenInputs}`}>
        <p>Upload Course Preview :</p>

        <div>
          <BrowseAndUpload
            title={getFileName('previewVideo', 100) || 'Browse and upload'}
            handleFileUpload={handleFileInput}
            handleRemove={() => setCourseMetaData({ ...courseMetaData, previewVideo: null })}
            previewData={{
              fileName: getFileName('previewVideo'),
              filePath: courseMetaData?.previewVideo,
              isVideo: true
            }}
            acceptedTypes={FILE_TYPES.coursePreviewVideo}
            inputName="previewVideo"
            hideRemoveBtn={isDisabled}
            isDisabled={isDisabled}
            isError={!courseMetaData?.previewVideo && error?.includes('previewVideo')}
            isActive={courseMetaData?.previewVideo}
          />
        </div>
      </div>

      <div className={`${styles.twoColumnDisplay}`}>
        <div className={`${styles.makeLabelInputColumnWise} ${styles.marginBetweenInputs}`}>
          <p>Course Page Display Image :</p>

          <BrowseAndUpload
            title={getFileName('image') || 'Browse and upload'}
            handleFileUpload={handleFileInput}
            handleRemove={() => setCourseMetaData({ ...courseMetaData, image: null })}
            previewData={{
              fileName: getFileName('image'),
              filePath: courseMetaData?.image
            }}
            acceptedTypes={FILE_TYPES.courseDisplayImage}
            inputName="image"
            hideRemoveBtn={isDisabled}
            isDisabled={isDisabled}
            isError={!courseMetaData?.image && error?.includes('image')}
            isActive={courseMetaData?.image}
          />
        </div>

        <div className={`${styles.makeLabelInputColumnWise} ${styles.marginBetweenInputs} `}>
          <p>Course Title Image :</p>

          <BrowseAndUpload
            title={getFileName('tileImage') || 'Browse and upload'}
            handleFileUpload={handleFileInput}
            handleRemove={() => setCourseMetaData({ ...courseMetaData, tileImage: null })}
            previewData={{
              fileName: getFileName('tileImage'),
              filePath: courseMetaData?.tileImage
            }}
            acceptedTypes={FILE_TYPES.courseTileImage}
            inputName="tileImage"
            hideRemoveBtn={isDisabled}
            isDisabled={isDisabled}
            isError={!courseMetaData?.tileImage && error?.includes('tileImage')}
            isActive={courseMetaData?.tileImage}
          />
        </div>
      </div>

      <NextBtn switchTabName={courseTabs?.about?.name} />
    </>
  );
}
