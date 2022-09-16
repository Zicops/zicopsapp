import { useContext, useEffect } from 'react';
import { truncateToN } from '../../../../../helper/common.helper';
import { courseContext } from '../../../../../state/contexts/CourseContext';
import Button from '../../../../common/Button';
import BrowseAndUpload from '../../../../common/FormComponents/BrowseAndUpload';
import LabeledDropdown from '../../../../common/FormComponents/LabeledDropdown';
import LabeledInput from '../../../../common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '../../../../common/FormComponents/LabeledRadioCheckbox';
import styles from '../../../courseTabs.module.scss';

export default function AddTopicContentForm({
  inputHandlers,
  setNewTopicContent,
  data,
  addNewTopicContent,
  isAddTopicContentReady,
  topicContent
}) {
  const { fullCourse } = useContext(courseContext);
  const { newTopicContent, newTopicVideo } = data;
  const { handleTopicContentInput, handleTopicVideoInput } = inputHandlers;

  // to set state based on if topic content is present or not
  useEffect(() => {
    setNewTopicContent({
      ...newTopicContent,
      is_default: true,
      type: topicContent?.[0]?.type || null
    });
  }, []);

  const languageOptions = [];
  fullCourse?.language?.map((lang) => languageOptions.push({ value: lang, label: lang }));

  const types = ['SCORM', 'TinCan', 'Web HTML5', 'mp4', 'CMi5'];
  const typeOptions = [];
  types?.map((type) => typeOptions.push({ value: type, label: type }));

  let acceptedFiles = ['.zip', '.rar', '.tar.gz'].join(', ');
  // .WEBM, .MPG, .MP2, .MPEG, .MPE, .MPV, .OGG, .MP4, .M4P, .M4V, .AVI, .WMV, .MOV, .QT, .FLV, .SWF, AVCHD,
  if (newTopicContent?.type === types[3]) acceptedFiles = ['.mp4'].join(', ');

  return (
    <div className={`${styles.popUpFormContainer}`}>
      {/* is default */}
      <div className={`center-element-with-flex`}>
        <LabeledRadioCheckbox
          type="checkbox"
          label="is Default"
          name="is_default"
          isChecked={newTopicContent?.is_default}
          changeHandler={handleTopicContentInput}
        />
      </div>

      {/* language */}
      <LabeledDropdown
        dropdownOptions={{
          inputName: 'language',
          label: 'Select Language:',
          placeholder: 'Language of the content',
          options: languageOptions,
          value: { value: newTopicContent.language, label: newTopicContent.language }
        }}
        changeHandler={(e) => handleTopicContentInput(e, 'language')}
      />

      {/* type */}
      <LabeledDropdown
        dropdownOptions={{
          inputName: 'type',
          label: 'Type of content:',
          placeholder: 'Type of the content',
          options: typeOptions,
          isDisabled: !!topicContent?.length,
          value: { value: newTopicContent.type, label: newTopicContent.type }
        }}
        changeHandler={(e) => handleTopicContentInput(e, 'type')}
      />

      {newTopicContent?.type && (
        <>
          {/* Upload Course Video */}
          <div className={`center-element-with-flex ${styles.marginBottom}`}>
            <label className={`w-25`}>Upload Content:</label>
            <div className={`w-35`}>
              <BrowseAndUpload
                handleFileUpload={handleTopicVideoInput}
                inputName="upload_content"
                isActive={newTopicVideo.file}
                acceptedTypes={acceptedFiles}
                hidePreviewBtns={true}
              />
            </div>
            <div className={`w-40 ${styles.fileName}`}>
              {newTopicVideo.file ? truncateToN(newTopicVideo.file.name, 55) : ''}
            </div>
          </div>

          {/* duration */}
          <div className={`${styles.flexContainerWithSpace}`}>
            <div className="w-50">
              <LabeledInput
                isFiftyFifty={true}
                inputOptions={{
                  inputName: 'duration',
                  label: 'Duration:',
                  maxLength: 16,
                  isDisabled: newTopicContent?.type === 'mp4',
                  value: newTopicContent?.duration || 0
                }}
                changeHandler={(e) => handleTopicContentInput(e, 'type')}
              />
            </div>
            <div className="w-45">seconds</div>
          </div>
        </>
      )}

      <div className="center-element-with-flex">
        <Button
          text="Add"
          styleClass={styles.topicContentSmallBtn}
          isDisabled={!isAddTopicContentReady}
          clickHandler={addNewTopicContent}
        />
      </div>
    </div>
  );
}
