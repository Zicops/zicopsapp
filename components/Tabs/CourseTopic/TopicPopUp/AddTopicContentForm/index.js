import { LIMITS, ONE_MB_IN_BYTES } from '@/helper/constants.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useContext, useEffect } from 'react';
import { useRecoilState } from 'recoil';
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
  topicContent,
  handleCancel = () => {}
}) {
  const { fullCourse, updateCourseMaster } = useContext(courseContext);
  const { newTopicContent, newTopicVideo, setNewTopicVideo } = data;
  const { handleTopicContentInput, handleTopicVideoInput } = inputHandlers;
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  // to set state based on if topic content is present or not
  useEffect(() => {
    setNewTopicContent({
      ...newTopicContent,
      is_default: !topicContent?.length,
      type: topicContent?.[0]?.type || null,
      language: null
    });

    setNewTopicVideo({ ...newTopicVideo, file: null });
  }, [topicContent?.length]);

  let selectedLanguages = topicContent?.map((content) => content?.language);
  const lanuages = [...fullCourse?.language]?.filter((lang) => !selectedLanguages?.includes(lang));

  const languageOptions = [];
  lanuages?.map((lang) => languageOptions.push({ value: lang, label: lang }));

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

      {newTopicContent?.type && newTopicContent?.language && (
        <>
          {/* Upload Course Video */}
          <div className={`center-element-with-flex ${styles.marginBottom}`}>
            <label className={`w-25`}>Upload Contents:</label>
            <div className={`w-35`}>
              <small
                style={{
                  color: styles.bgBody,
                  display: 'flex',
                  justifyContent: 'flex-end'
                }}>
                Max: {Math.ceil(LIMITS.topicVideoSize / ONE_MB_IN_BYTES)} Mb
              </small>
              <BrowseAndUpload
                handleFileUpload={(e) => {
                  const file = e.target.files?.[0];

                  if (file?.size > LIMITS.topicVideoSize)
                    return setToastMsg({
                      type: 'danger',
                      message: `File Size limit is ${Math.ceil(
                        LIMITS.topicVideoSize / ONE_MB_IN_BYTES
                      )} mb`
                    });

                  if (newTopicContent?.type === types[3]) handleTopicVideoInput(e);

                  setNewTopicVideo({ ...newTopicVideo, file: file });
                }}
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

          {/* url */}
          {newTopicContent?.type === types[0] && (
            <div className={`${styles.flexContainerWithSpace}`}>
              <div className="w-100">
                <LabeledInput
                  inputOptions={{
                    inputName: 'contentUrl',
                    label: 'URL:',
                    // maxLength: 16,
                    value: newTopicVideo?.contentUrl || '',
                    isDisabled: !!newTopicVideo?.file
                  }}
                  changeHandler={(e) =>
                    setNewTopicVideo({ ...newTopicVideo, contentUrl: e.target.value })
                  }
                />
              </div>
            </div>
          )}

          {/* duration */}
          <div className={`${styles.flexContainerWithSpace}`}>
            <div className="w-50">
              <LabeledInput
                isFiftyFifty={true}
                inputOptions={{
                  inputName: 'duration',
                  label: 'Duration:',
                  maxLength: 16,
                  isDisabled: !!topicContent?.length || newTopicContent?.type === 'mp4',
                  value: topicContent?.length
                    ? topicContent[0]?.duration
                    : newTopicContent?.duration || 0
                }}
                changeHandler={(e) => {
                  const val = e.target.value?.replace(/^0+/, '');
                  setNewTopicContent({ ...newTopicContent, duration: val });
                }}
              />
            </div>
            <div className="w-45">seconds</div>
          </div>
        </>
      )}

      <div className="center-element-with-flex">
        {!!topicContent?.length && (
          <Button
            text="Cancel"
            styleClass={`${styles.topicContentSmallBtn}`}
            // isDisabled={!isAddTopicContentReady}
            clickHandler={() => {
              handleCancel();
            }}
          />
        )}
        <Button
          text="Add"
          styleClass={`${styles.topicContentSmallBtn} ${
            isAddTopicContentReady ? styles.formFilled : ''
          }`}
          isDisabled={!isAddTopicContentReady}
          clickHandler={addNewTopicContent}
        />
      </div>
    </div>
  );
}
