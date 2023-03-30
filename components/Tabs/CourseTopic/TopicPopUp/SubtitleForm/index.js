import { DELETE_SUBTITLE } from '@/api/Mutations';
import DeleteBtn from '@/components/common/DeleteBtn';
import ToolTip from '@/components/common/ToolTip';
import { ADMIN_COURSES } from '@/components/common/ToolTip/tooltip.helper';
import { SUBTITLE_LANGUAGES } from '@/helper/constants.helper';
import { useRecoilState } from 'recoil';
import { truncateToN } from '../../../../../helper/common.helper';
import { TopicSubtitleAtom } from '../../../../../state/atoms/module.atoms';
import Bar from '../../../../common/Bar';
import Button from '../../../../common/Button';
import BrowseAndUpload from '../../../../common/FormComponents/BrowseAndUpload';
import LabeledDropdown from '../../../../common/FormComponents/LabeledDropdown';
import IconButton from '../../../../common/IconButton';
import styles from '../../../courseTabs.module.scss';
import useAddSubtitles from '../../Logic/useAddSubtitles';

export default function SubtitleForm({ courseId, topicId }) {
  const {
    newSubtitles,
    handleSubtitleInput,
    addNewSubtitles,
    isSubtitlesFormVisible,
    toggleSubtitlesForm,
    isSubtitlesReady
  } = useAddSubtitles(courseId, topicId);

  const [subtitles, setSubtitles] = useRecoilState(TopicSubtitleAtom);

  const languageOptions = SUBTITLE_LANGUAGES?.filter(
    (lang) => !subtitles.find((sub) => sub.language === lang)
  )?.map((lang) => ({ label: lang, value: lang }));

  return (
    <>
      {subtitles &&
        subtitles.map((res, index) => (
          <Bar
            key={res.language + index}
            index={index + 1}
            text={res.language}
            type={
              <span style={{ display: 'flex', alignItems: 'center' }}>
                File
                <DeleteBtn
                  id={/\/subtitles\/(.*?)\?/.exec(res?.subtitleUrl)?.[1] || null}
                  resKey="deleteTopicContentSubtitle"
                  mutation={DELETE_SUBTITLE}
                  variableObj={{
                    courseId: res?.courseId,
                    topicId: res?.topicId,
                    fileName: /\/subtitles\/(.*?)\?/.exec(res?.subtitleUrl)?.[1]
                  }}
                  onDelete={() => {
                    const _subtitleArr = structuredClone(subtitles);
                    _subtitleArr.splice(index, 1);

                    setSubtitles(_subtitleArr);
                  }}
                />
              </span>
            }
          />
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
              <ToolTip title={ADMIN_COURSES.myCourses.subtitles}>
                <span>
                  <Button
                    text="Add"
                    clickHandler={addNewSubtitles}
                    styleClass={`${styles.topicContentSmallBtn} ${
                      isSubtitlesReady ? styles.formFilled : ''
                    }`}
                    isDisabled={!isSubtitlesReady}
                  />
                </span>
              </ToolTip>
            </div>
          </div>
        </>
      )}

      <div className={`${styles.centerAccordinBtn}`}>
        <IconButton
          styleClass="btnBlack"
          text="Add Subtitles"
          tooltipText={ADMIN_COURSES.myCourses.subtitles}
          handleClick={toggleSubtitlesForm}
        />
      </div>
    </>
  );
}
