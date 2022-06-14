import { useContext } from 'react';
import { courseContext } from '../../../state/contexts/CourseContext';
import BrowseAndUpload from '../../common/FormComponents/BrowseAndUpload';
import LabeledDropdown from '../../common/FormComponents/LabeledDropdown';
import LabeledRadioCheckbox from '../../common/FormComponents/LabeledRadioCheckbox';
import LabeledTextarea from '../../common/FormComponents/LabeledTextarea';
import NextButton from '../common/NextButton';
import styles from '../courseTabs.module.scss';
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

  const subCatObject = { value: fullCourse.sub_category, label: fullCourse.sub_category };
  return (
    <>
      <LabeledDropdown
        styleClass={styles.marginBottom}
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
        <DragDrop contextData={courseContextData} />
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
            acceptedTypes="video/*"
            inputName="uploadCourseVideo"
            isActive={fileData.uploadCourseVideo}
          />
        </div>
        <div className={`w-50 ${styles.fileName}`}>{fileData.uploadCourseVideo}</div>
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
            inputName="uploadCourseImage"
            isActive={fileData.uploadCourseImage}
          />
        </div>
        <div className={`w-50 ${styles.fileName}`}>{fileData.uploadCourseImage}</div>
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
            inputName="myfile"
            isActive={fileData.myfile}
          />
        </div>
        <div className={`w-50 ${styles.fileName}`}>{fileData.myfile}</div>
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
          changeHandler={handleChange}
        />
      </div>

      <NextButton tabIndex={2} />
    </>
  );
}
