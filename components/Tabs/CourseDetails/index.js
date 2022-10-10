import { ADMIN_COURSES } from '@/components/common/ToolTip/tooltip.helper';
import { VIDEO_FILE_TYPES } from '@/helper/constants.helper';
import { courseErrorAtom } from '@/state/atoms/module.atoms';
import { useContext } from 'react';
import { useRecoilState } from 'recoil';
import { truncateToN } from '../../../helper/common.helper';
import { courseContext } from '../../../state/contexts/CourseContext';
import BrowseAndUpload from '../../common/FormComponents/BrowseAndUpload';
import LabeledDropdown from '../../common/FormComponents/LabeledDropdown';
import LabeledRadioCheckbox from '../../common/FormComponents/LabeledRadioCheckbox';
import LabeledTextarea from '../../common/FormComponents/LabeledTextarea';
import NextButton from '../common/NextButton';
import styles from '../courseTabs.module.scss';
import { CourseTabAtom } from '../Logic/tabs.helper';
import useHandleTabs from '../Logic/useHandleTabs';
import DragDrop from './DragAndDrop';

export default function CourseDetails() {
  const courseContextData = useContext(courseContext);
  const {
    fullCourse,
    fileData,
    handleChange,
    togglePreviewPopUp,
    previewFileData,
    removeSavedFile
  } = useHandleTabs(courseContextData);
  const { courseVideo, courseImage, courseTileImage } = courseContextData;

  const [courseError, setCourseError] = useRecoilState(courseErrorAtom);
  const subCatObject = { value: fullCourse.sub_category, label: fullCourse.sub_category };

  return (
    <>
      <LabeledDropdown
        styleClass={styles.marginBottom}
        // isError={!fullCourse?.sub_category?.length && courseError?.details}
        dropdownOptions={{
          inputName: 'course_sub_category',
          label: 'Course Base Sub-category:',
          placeholder: 'Select Subcategory in Course Master Tab',
          options: [subCatObject],
          value: fullCourse.sub_category ? subCatObject : null,
          isSearchEnable: true,
          isDisabled: true
        }}
      />

      <div className={`${styles.marginBottom}`}>
        <DragDrop
          contextData={courseContextData}
          isError={!fullCourse?.sub_categories?.length && courseError?.details}
        />
      </div>

      {/* Expertise Level */}
      <div className={`center-element-with-flex ${styles.marginBottom}`}>
        <label className="w-25">Level of Expertise:</label>

        <div className="w-25">
          <LabeledRadioCheckbox
            type="checkbox"
            label="Beginner"
            name="expertise_level"
            value="Beginner"
            isError={!fullCourse?.expertise_level?.length && courseError?.details}
            isChecked={fullCourse.expertise_level.includes('Beginner')}
            changeHandler={handleChange}
          />
        </div>

        <div className="w-25">
          <LabeledRadioCheckbox
            type="checkbox"
            label="Competent"
            name="expertise_level"
            value="Competent"
            isError={!fullCourse?.expertise_level?.length && courseError?.details}
            isChecked={fullCourse.expertise_level.includes('Competent')}
            changeHandler={handleChange}
          />
        </div>

        <div className="w-25">
          <LabeledRadioCheckbox
            type="checkbox"
            label="Proficient"
            name="expertise_level"
            value="Proficient"
            isError={!fullCourse?.expertise_level?.length && courseError?.details}
            isChecked={fullCourse.expertise_level.includes('Proficient')}
            changeHandler={handleChange}
          />
        </div>
      </div>

      {/* Upload Course Video */}
      <div className={`center-element-with-flex ${styles.marginBottom}`}>
        <label className={`w-25`}>Upload Preview of the course:</label>
        <div className={`w-25`}>
          <BrowseAndUpload
            handleFileUpload={handleChange}
            handleRemove={() => removeSavedFile('uploadCourseVideo')}
            previewData={{
              fileName: fileData.uploadCourseVideo,
              filePath: courseVideo?.file || fullCourse.previewVideo,
              isVideo: true
            }}
            isError={!(courseVideo?.file || fullCourse.previewVideo) && courseError?.details}
            acceptedTypes={VIDEO_FILE_TYPES}
            inputName="uploadCourseVideo"
            isActive={fileData.uploadCourseVideo}
            previewTooltipTitle={ADMIN_COURSES.myCourses.details.previewCourse}
            removeTooltipTitle={ADMIN_COURSES.myCourses.details.removeCourse}
          />
        </div>
        <div className={`w-50 ${styles.fileName}`}>
          {truncateToN(fileData.uploadCourseVideo, 55)}
        </div>
      </div>

      {/* Upload Course Image */}
      <div className={`center-element-with-flex ${styles.marginBottom}`}>
        <label className={`w-25`}> Course Display Image:</label>
        <div className={`w-25`}>
          <BrowseAndUpload
            handleFileUpload={handleChange}
            handleRemove={() => removeSavedFile('uploadCourseImage')}
            previewData={{
              fileName: fileData.uploadCourseImage,
              filePath: courseTileImage?.file || fullCourse.tileImage
            }}
            isError={!(courseTileImage?.file || fullCourse.tileImage) && courseError?.details}
            inputName="uploadCourseImage"
            isActive={fileData.uploadCourseImage}
            previewTooltipTitle={ADMIN_COURSES.myCourses.details.previewCourseImage}
            removeTooltipTitle={ADMIN_COURSES.myCourses.details.removeCourseImage}
          />
        </div>
        <div className={`w-50 ${styles.fileName}`}>
          {truncateToN(fileData.uploadCourseImage, 55)}
        </div>
      </div>

      {/* Upload Course Page Display Picture */}
      <div className={`center-element-with-flex ${styles.marginBottom}`}>
        <label className={`w-25`}>Course Page Display Picture:</label>
        <div className={`w-25`}>
          <BrowseAndUpload
            handleFileUpload={handleChange}
            handleRemove={() => removeSavedFile('myfile')}
            previewData={{
              fileName: fileData.myfile,
              filePath: courseImage?.file || fullCourse.image
            }}
            isError={!(courseImage?.file || fullCourse.image) && courseError?.details}
            inputName="myfile"
            isActive={fileData.myfile}
            previewTooltipTitle={ADMIN_COURSES.myCourses.details.previewCoursePicture}
            removeTooltipTitle={ADMIN_COURSES.myCourses.details.removeCoursePicture}
          />
        </div>
        <div className={`w-50 ${styles.fileName}`}>{truncateToN(fileData.myfile, 55)}</div>
      </div>

      {/* Course Summary */}
      <div className={`center-element-with-flex ${styles.marginBottom}`}>
        <label className="w-25">Course Summary:</label>
        <LabeledTextarea
          styleClass="w-75"
          inputOptions={{
            inputName: 'summary',
            placeholder: 'Provide and outline of the course in less than 500 characters...',
            rows: 4,
            value: fullCourse?.summary,
            maxLength: 500
          }}
          isError={!fullCourse?.summary?.length && courseError?.details}
          changeHandler={handleChange}
        />
      </div>

      <NextButton tabIndex={2} tooltipTitle={ADMIN_COURSES.myCourses.details.nextBtn} />
    </>
  );
}
