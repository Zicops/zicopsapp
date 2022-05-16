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
    if (topicContent?.length > 0) {
      setNewTopicContent({
        ...newTopicContent,
        type: topicContent[0]?.type,
        is_default: false
      });
    } else {
      console.log(true);
      setNewTopicContent({
        ...newTopicContent,
        is_default: true
      });
    }
  }, []);

  const languageOptions = [];
  fullCourse?.language?.map((lang) => languageOptions.push({ value: lang, label: lang }));

  const types = ['SCORM', 'TinCan', 'Web HTML5', 'mp4', 'CMi5'];
  const typeOptions = [];
  types?.map((type) => typeOptions.push({ value: type, label: type }));

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
          value: newTopicContent.language
            ? { value: newTopicContent.language, label: newTopicContent.language }
            : null
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
          isDisabled: topicContent?.length > 0,
          value: newTopicContent.type
            ? { value: newTopicContent.type, label: newTopicContent.type }
            : null
        }}
        changeHandler={(e) => handleTopicContentInput(e, 'type')}
      />

      {newTopicContent.type === 'mp4' ? (
        <>
          {/* Upload Course Video */}
          <div className={`center-element-with-flex ${styles.marginBottom}`}>
            <label className={`w-25`}>Upload Content:</label>
            <div className={`w-35`}>
              <BrowseAndUpload
                handleFileUpload={handleTopicVideoInput}
                inputName="upload_content"
                isActive={newTopicVideo.file}
                acceptedTypes={newTopicContent.type}
                hidePreviewBtns={true}
              />
            </div>
            <div className={`w-40 ${styles.fileName}`}>
              {newTopicVideo.file ? truncateToN(newTopicVideo.file.name, 55) : ''}
            </div>
          </div>

          <div className={`${styles.flexContainerWithSpace}`}>
            <div className="w-50">
              <LabeledInput
                isFiftyFifty={true}
                inputOptions={{
                  inputName: 'duration',
                  label: 'Duration:',
                  maxLength: 16,
                  isDisabled: true,
                  value: newTopicContent.duration || 0
                }}
              />
            </div>
            <div className="w-45">seconds</div>
          </div>
        </>
      ) : null}

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
