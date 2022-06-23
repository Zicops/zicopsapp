import { useContext } from 'react';
import { useRecoilValue } from 'recoil';
import { truncateToN } from '../../../../../helper/common.helper';
import { TopicSubtitleAtom } from '../../../../../state/atoms/module.atoms';
import { courseContext } from '../../../../../state/contexts/CourseContext';
import Bar from '../../../../common/Bar';
import Button from '../../../../common/Button';
import BrowseAndUpload from '../../../../common/FormComponents/BrowseAndUpload';
import LabeledDropdown from '../../../../common/FormComponents/LabeledDropdown';
import IconButton from '../../../../common/IconButton';
import styles from '../../../courseTabs.module.scss';
import useAddSubtitles from '../../Logic/useAddSubtitles';

export default function SubtitleForm({ courseId, topicId }) {
  const { fullCourse } = useContext(courseContext);
  const {
    newSubtitles,
    handleSubtitleInput,
    addNewSubtitles,
    isSubtitlesFormVisible,
    toggleSubtitlesForm,
    isSubtitlesReady
  } = useAddSubtitles(courseId, topicId);

  const subtitles = useRecoilValue(TopicSubtitleAtom);

  const languageOptions = [];
  fullCourse?.language.forEach((lang) => languageOptions.push({ value: lang, label: lang }));

  return (
    <>
      {subtitles &&
        subtitles.map((res, index) => (
          <Bar key={res.language + index} index={index + 1} text={res.language} type={'File'} />
        ))}

      {isSubtitlesFormVisible && (
        <>
          <div className={`${styles.popUpFormContainer}`}>
            <div className={`${styles.flexCenterWithGap}`}>
              {/* language */}
              <div className="w-35">
                <LabeledDropdown
                  dropdownOptions={{
                    inputName: 'language',
                    placeholder: 'Select Language',
                    options: languageOptions,
                    isSearchEnable: false,
                    value: newSubtitles.language
                      ? { value: newSubtitles.language, label: newSubtitles.language }
                      : null
                  }}
                  changeHandler={handleSubtitleInput}
                />
              </div>

              {/* subtitle file */}
              <div className="w-35">
                <BrowseAndUpload
                  handleFileUpload={handleSubtitleInput}
                  inputName="file"
                  isActive={newSubtitles?.name}
                  hidePreviewBtns={true}
                  acceptedTypes=".vtt"
                />
              </div>
            </div>

            {/* file name display */}
            <div className={`w-100 text-center`}>{truncateToN(newSubtitles?.name, 180)}</div>

            {/* footer btn */}
            <div className="center-element-with-flex">
              <Button
                text="Cancel"
                clickHandler={toggleSubtitlesForm}
                styleClass={styles.topicContentSmallBtn}
              />
              <Button
                text="Add"
                clickHandler={addNewSubtitles}
                styleClass={styles.topicContentSmallBtn}
                isDisabled={!isSubtitlesReady}
              />
            </div>
          </div>
        </>
      )}

      <div className={`${styles.centerAccordinBtn}`}>
        <IconButton styleClass="btnBlack" text="Add Subtitles" handleClick={toggleSubtitlesForm} />
      </div>
    </>
  );
}
