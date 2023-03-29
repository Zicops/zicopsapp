import BrowseAndUpload from '@/components/common/FormComponents/BrowseAndUpload';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import Spinner from '@/components/common/Spinner';
import ZicopsButton from '@/components/common/ZicopsButton';
import { PlusIcon } from '@/components/common/ZicopsIcons';
import { TOPIC_CONTENT_TYPES } from '@/constants/course.constants';
import { truncateToN } from '@/helper/common.helper';
import { LIMITS, ONE_MB_IN_BYTES } from '@/helper/constants.helper';
import { CourseMetaDataAtom } from '@/state/atoms/courses.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import styles from '../../../adminCourseComps.module.scss';
import TopicContentBar from './TopicContentBar';

export default function TopicContentForm({
  topicContentList = null,
  isFormVisible = false,
  isDisabled = false,
  topicContentState,
  handleChange = () => {},
  toggleForm = () => {},
  handleSubmit = () => {},
  handleMp4FileInput = () => {}
}) {
  const setToastMessage = useRecoilCallback(({ set }) => (message = '', type = 'danger') => {
    set(ToastMsgAtom, { type, message });
  });
  const courseMetaData = useRecoilValue(CourseMetaDataAtom);

  const selectedLanguages = topicContentList?.map((content) => content?.language);
  const languageOptions = courseMetaData?.language
    ?.filter((lang) => !selectedLanguages?.includes(lang))
    ?.map((lang) => ({ value: lang, label: lang }));

  const typeOptions = Object.values(TOPIC_CONTENT_TYPES)?.map((lang) => ({
    value: lang,
    label: lang
  }));

  let acceptedFilesTypes = ['.zip', '.rar', '.tar.gz'].join(', ');
  // .WEBM, .MPG, .MP2, .MPEG, .MPE, .MPV, .OGG, .MP4, .M4P, .M4V, .AVI, .WMV, .MOV, .QT, .FLV, .SWF, AVCHD,
  if (topicContentState?.type === TOPIC_CONTENT_TYPES.mp4) acceptedFilesTypes = ['.mp4'].join(', ');
  if (topicContentState?.type === TOPIC_CONTENT_TYPES.document)
    acceptedFilesTypes = ['.pdf'].join(', ');

  return (
    <div className={styles.topicContentContainer}>
      <div className={`${styles.titleWithLineAtSide}`}>Content</div>

      {topicContentList == null && <Spinner customStyles={{ margin: '2em auto' }} />}

      {isFormVisible && topicContentList != null && (
        <div className={`${styles.topicContentForm}`}>
          {/* is default */}
          <div
            className={`center-element-with-flex`}
            ref={(elem) =>
              elem?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center'
              })
            }>
            <LabeledRadioCheckbox
              type="checkbox"
              label="is Default"
              name="isDefault"
              isChecked={topicContentState?.isDefault}
              changeHandler={(e) => handleChange({ isDefault: e.target.checked })}
            />
          </div>

          {/* language */}
          <LabeledDropdown
            dropdownOptions={{
              inputName: 'language',
              label: 'Select Language:',
              placeholder: 'Language of the content',
              options: languageOptions,
              value: { value: topicContentState.language, label: topicContentState.language }
            }}
            changeHandler={(e) => handleChange({ language: e.value })}
          />

          {/* type */}
          <LabeledDropdown
            dropdownOptions={{
              inputName: 'type',
              label: 'Type of content:',
              placeholder: 'Type of the content',
              options: typeOptions,
              isDisabled: !!topicContentList?.length,
              value: { value: topicContentState.type, label: topicContentState.type }
            }}
            changeHandler={(e) => handleChange({ type: e.value })}
            customDropdownStyles={{ menuList: { maxHeight: '150px' } }}
          />

          {topicContentState?.type && topicContentState?.language && (
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
                        return setToastMessage(
                          `File Size limit is ${Math.ceil(
                            LIMITS.topicVideoSize / ONE_MB_IN_BYTES
                          )} mb`
                        );

                      if (topicContentState?.type === TOPIC_CONTENT_TYPES.mp4)
                        return handleMp4FileInput(e);

                      handleChange({ file, contentUrl: '' });
                    }}
                    inputName="upload_content"
                    isActive={!!topicContentState.file}
                    acceptedTypes={acceptedFilesTypes}
                    hidePreviewBtns={true}
                  />
                </div>
                <div className={`w-40 ${styles.fileName}`}>
                  {truncateToN(topicContentState?.file?.name, 55)}
                </div>
              </div>

              {/* url */}
              {/* url only for scrom */}
              {topicContentState?.type === TOPIC_CONTENT_TYPES.scorm && (
                <div className={`${styles.flexContainerWithSpace}`}>
                  <div className="w-100">
                    <LabeledInput
                      inputOptions={{
                        inputName: 'contentUrl',
                        label: 'URL:',
                        // maxLength: 16,
                        value: topicContentState?.contentUrl || '',
                        isDisabled: !!topicContentState?.file
                      }}
                      changeHandler={(e) => handleChange({ contentUrl: e.target.value })}
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
                      label:
                        topicContentState?.type === TOPIC_CONTENT_TYPES.document
                          ? 'Read Time'
                          : 'Duration:',
                      maxLength: 16,
                      isDisabled:
                        !!topicContentState?.length ||
                        topicContentState?.type === TOPIC_CONTENT_TYPES.mp4,
                      value: topicContentState?.duration || 0,
                      isNumericOnly: true
                    }}
                    changeHandler={(e) => handleChange({ duration: e.target.value })}
                  />
                </div>
                <div className="w-45">seconds</div>
              </div>
            </>
          )}

          <div className="center-element-with-flex">
            {!!topicContentList?.length && (
              <ZicopsButton
                customClass={styles.addTopicFormBtn}
                handleClick={toggleForm}
                display="Cancel"
              />
            )}
            <ZicopsButton
              handleClick={handleSubmit}
              customClass={`${styles.addTopicFormBtn} ${styles.addBtn}`}
              isDisabled={
                !topicContentState?.type ||
                !topicContentState?.language ||
                !(topicContentState?.file || topicContentState?.contentUrl) ||
                !topicContentState?.duration
              }
              display={topicContentState?.id ? 'Update' : 'Add'}
            />
          </div>
        </div>
      )}

      {topicContentList?.map((content, index) => (
        <TopicContentBar contentData={content} index={index} isDisabled={isDisabled} />
      ))}

      {!!topicContentList?.length && !!languageOptions?.length && !isDisabled && (
        <div className={styles.addMoreContentBtn} onClick={toggleForm}>
          <div>
            <PlusIcon color={styles.primary} />
          </div>
          Add Language
        </div>
      )}
    </div>
  );
}
