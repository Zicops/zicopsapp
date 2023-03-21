import BrowseAndUpload from '@/components/common/FormComponents/BrowseAndUpload';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import LabeledTextarea from '@/components/common/FormComponents/LabeledTextarea';
import { truncateToN } from '@/helper/common.helper';
import { FILE_TYPES } from '@/helper/constants.helper';
// import styles from "./adminCourse.module.scss"
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
  const { error } = useRecoilValue(CourseCurrentStateAtom);
  const { handleChange, handleFileInput } = useHandleCourseData();

  function getFileNameI(fileKey = '', urlKey = '', limit = 45) {
    return truncateToN(
      courseMetaData?.[fileKey]?.name || getEncodedFileNameFromUrl(courseMetaData?.[urlKey]),
      limit
    );
  }
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

      <div
        className={`${styles.twoColumnDisplay} ${styles.marginBetweenInputs} ${
          error?.includes('subCategories') ? 'error' : ''
        }`}>
        <DragDrop />
      </div>

      <LabeledTextarea
        isError={!courseMetaData?.summary?.length && error?.includes('summary')}
        inputOptions={{
          label: 'Course Summary :',
          placeholder: 'Provide an outline of the course in less then 500 charactor',
          rows: 4,
          maxLength: 500,
          value: courseMetaData?.summary
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
            // hideRemoveBtn={true}
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
            // hideRemoveBtn={true}
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
            // hideRemoveBtn={true}
            isError={!courseMetaData?.tileImage && error?.includes('tileImage')}
            isActive={courseMetaData?.tileImage}
          />
        </div>
      </div>

      <NextBtn switchTabName={courseTabs?.about?.name} />
    </>
  );
}
