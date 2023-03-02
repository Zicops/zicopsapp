import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import { ADMIN_COURSES } from '@/components/common/ToolTip/tooltip.helper';
import {
  COURSE_STATUS,
  LIMITS,
  ONE_MB_IN_BYTES,
  VIDEO_FILE_TYPES
} from '@/helper/constants.helper';
import { FeatureFlagsAtom } from '@/state/atoms/global.atom';
import { courseErrorAtom } from '@/state/atoms/module.atoms';
import { useContext } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { truncateToN } from '../../../helper/common.helper';
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

  const [courseError, setCourseError] = useRecoilState(courseErrorAtom);
  const { isPublishCourseEditable } = useRecoilValue(FeatureFlagsAtom);

  const subCatObject = { value: fullCourse.sub_category, label: fullCourse.sub_category };

  let isDisabled = !!fullCourse?.qa_required;
  if ([COURSE_STATUS.publish, COURSE_STATUS.reject].includes(fullCourse.status)) isDisabled = true;
  if (isPublishCourseEditable) isDisabled = false;

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
          isFreezed={isDisabled}
          isError={!fullCourse?.sub_categories?.length && courseError?.details}
        />
      </div>

      {/* Expertise Level */}
      <div className={`center-element-with-flex ${styles.marginBottom}`}>
        <label className="w-25">Level of Expertise:</label>

        <div className={`${styles.expertiseLevelCheckboxes}`}>
          <LabeledRadioCheckbox
            type="checkbox"
            label="Beginner"
            name="expertise_level"
            value="Beginner"
            isError={!fullCourse?.expertise_level?.length && courseError?.details}
            isChecked={fullCourse.expertise_level.includes('Beginner')}
            isDisabled={isDisabled}
            changeHandler={handleChange}
          />
          {/* </div>

        <div className="w-25"> */}
          <LabeledRadioCheckbox
            type="checkbox"
            label="Competent"
            name="expertise_level"
            value="Competent"
            isError={!fullCourse?.expertise_level?.length && courseError?.details}
            isChecked={fullCourse.expertise_level.includes('Competent')}
            isDisabled={isDisabled}
            changeHandler={handleChange}
          />
          {/* </div>

        <div className="w-25"> */}
          <LabeledRadioCheckbox
            type="checkbox"
            label="Proficient"
            name="expertise_level"
            value="Proficient"
            isError={!fullCourse?.expertise_level?.length && courseError?.details}
            isChecked={fullCourse.expertise_level.includes('Proficient')}
            isDisabled={isDisabled}
            changeHandler={handleChange}
          />
        </div>
        <div className="w-50">
          <LabeledInput
            // styleClass={`${styles.marginBottom}`}
            isFiftyFifty={true}
            inputClass={!fullCourse?.expected_completion > 0 && courseError?.details ? 'error' : ''}
            inputOptions={{
              inputName: 'expected_completion',
              label: (
                <div>
                  <p>Suggested Duration:</p>
                  <small>(Total time ideally to be taken to complete the course. In days.)</small>
                </div>
              ),
              placeholder: 'Enter Suggested Duration in days',
              maxLength: 4,
              value: fullCourse?.expected_completion,
              isDisabled: isDisabled,
              isNumericOnly: true
            }}
            changeHandler={handleChange}
          />
        </div>
      </div>

      {/* Upload Course Video */}
      <div className={`center-element-with-flex ${styles.marginBottom}`}>
        <label className={`w-25`}>Upload Preview of the course:</label>
        <div className={`w-25`}>
          <small
            style={{
              color: styles.bgBody,
              display: 'flex',
              justifyContent: 'flex-end'
            }}>
            Max: {Math.ceil(LIMITS.previewVideoSize / ONE_MB_IN_BYTES)} Mb
          </small>
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
            isDisabled={isDisabled}
            hideRemoveBtn={isDisabled}
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
            isDisabled={isDisabled}
            hideRemoveBtn={isDisabled}
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
            isDisabled={isDisabled}
            hideRemoveBtn={isDisabled}
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
            maxLength: 500,
            isDisabled: isDisabled
          }}
          isError={!fullCourse?.summary?.length && courseError?.details}
          changeHandler={handleChange}
        />
      </div>

      <NextButton
        tabIndex={2}
        isActive={
          fullCourse?.sub_categories?.length &&
          fullCourse.expertise_level?.length &&
          (courseVideo?.file || fullCourse.previewVideo) &&
          (courseTileImage?.file || fullCourse.tileImage) &&
          (courseImage?.file || fullCourse.image) &&
          fullCourse?.summary?.length
        }
        tooltipTitle={ADMIN_COURSES.myCourses.details.nextBtn}
      />
    </>
  );
}
