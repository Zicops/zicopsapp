import BrowseAndUpload from '@/components/common/FormComponents/BrowseAndUpload';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import IconButton from '@/components/common/IconButton';
import ToolTip from '@/components/common/ToolTip';
// import { ADMIN_COURSES } from '@/components/common/ToolTip/tooltip.helper';
import { SUBTITLE_LANGUAGES } from '@/helper/constants.helper';
import Button from '@/components/common/Button';
// import Button from '../../../../common/Button';
import { useState } from 'react';
import styles from '../../../../adminCourse.module.scss';
const SubTitles = () => {
  const [subtitle, setSubtitles] = useState([]);
  const [isSubtitlesFormVisible, setIsSubtitlesFormVisible] = useState(false);
  const [isSubtitlesReady, setIsSubtitlesReady] = useState(false);
  const languageOptions = SUBTITLE_LANGUAGES?.filter(
    (lang) => !subtitle.find((sub) => sub.language === lang)
  )?.map((lang) => ({ label: lang, value: lang }));
  return (
    <>
      {subtitle &&
        subtitle.map((res, index) => (
          <Bar
            key={res.language + index}
            index={index + 1}
            text={res.language}
            type={
              <span style={{ display: 'flex', alignItems: 'center' }}>
                File
                <DeleteBtn
                  id={/\/subtitle\/(.*?)\?/.exec(res?.subtitleUrl)?.[1] || null}
                  resKey="deleteTopicContentSubtitle"
                  mutation={DELETE_SUBTITLE}
                  variableObj={{
                    courseId: res?.courseId,
                    topicId: res?.topicId,
                    fileName: /\/subtitle\/(.*?)\?/.exec(res?.subtitleUrl)?.[1]
                  }}
                  onDelete={() => {
                    const _subtitleArr = structuredClone(subtitle);
                    const index = !res?.id
                      ? index
                      : _subtitleArr?.findIndex((sub) => sub?.id === res?.id);
                    if (index >= 0) _subtitleArr.splice(index, 1);

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
                styleClass={`${styles.subtitlesLanguageinput}`}
                  dropdownOptions={{
                    inputName: 'language',
                    placeholder: 'Select Language',
                    options: languageOptions,
                    isSearchEnable: false
                    // value: newSubtitles.language
                    //   ? { value: newSubtitles.language, label: newSubtitles.language }
                    //   : null
                  }}
                  //   changeHandler={handleSubtitleInput}
                />
              </div>

              {/* subtitle file */}
              <div className="w-35">
                <BrowseAndUpload
                //   handleFileUpload={handleSubtitleInput}
                  inputName="file"
                  //   isActive={newSubtitles?.name}
                  hidePreviewBtns={true}
                  acceptedTypes=".vtt"
                />
              </div>
            </div>

            {/* file name display */}
            <div className={`w-100 text-center`}>
              {/* {truncateToN(newSubtitles?.name, 180)} */}
            </div>

            {/* footer btn */}
            <div className={`${styles.subtitleAddCancelBtn}`}>
              <Button
                text="Cancel"
                // clickHandler={toggleSubtitlesForm}
                styleClass={styles.topicContentSmallBtn}
              />
              <ToolTip 
            //   title={ADMIN_COURSES.myCourses.subtitles}
              >
                <span>
                  <Button
                    text="Add"
                    // clickHandler={addNewSubtitles}
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
      <div className={`${styles.addSubtitleBtn}`}>
        <IconButton
          styleClass="btnBlack"
          text="Add Subtitles"
          //   tooltipText={ADMIN_COURSES.myCourses.subtitles}
            handleClick={()=>
            {
                setIsSubtitlesFormVisible(!isSubtitlesFormVisible)
            }}
        />
      </div>
    </>
  );
};
export default SubTitles;
