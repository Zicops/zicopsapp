import { DELETE_SUBTITLE } from '@/api/Mutations';
import RoundedBtn from '@/components/AdminCourseComps/common/RoundedBtn';
import useHandleTopicSubtitles from '@/components/AdminCourseComps/Logic/useHandleTopicSubtitles';
import BrowseAndUpload from '@/components/common/FormComponents/BrowseAndUpload';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import IconButton from '@/components/common/IconButton';
import ToolTip from '@/components/common/ToolTip';
import { ADMIN_COURSES } from '@/components/common/ToolTip/tooltip.helper';
import { truncateToN } from '@/helper/common.helper';
import { SUBTITLE_LANGUAGES } from '@/helper/constants.helper';
import { CourseMetaDataAtom, TopicSubtitlesAtom } from '@/state/atoms/courses.atom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styles from '../../../adminCourseComps.module.scss';
import ContentBar from './ContentBar';

export default function SubtitleForm({ topData = null }) {
  const courseMetaData = useRecoilValue(CourseMetaDataAtom);
  const [topicSubtitle, setTopicSubtitle] = useRecoilState(TopicSubtitlesAtom);

  const { subtitleFormData, isFormVisible, toggleForm, handleSubtitleInput, handleSubmit } =
    useHandleTopicSubtitles(topData);

  const languageOptions = SUBTITLE_LANGUAGES?.filter(
    (lang) => !topicSubtitle?.find((sub) => sub.language === lang)
  )?.map((lang) => ({ label: lang, value: lang }));

  const subtitleList = topicSubtitle?.map((res, i) => ({ ...res, key: i }));
  const isSubtitlesReady = subtitleFormData?.language && subtitleFormData?.file;

  return (
    <>
      {subtitleList?.map((subtitle, index) => (
        <ContentBar
          key={subtitle?.key}
          type={index + 1}
          description={subtitle?.language}
          details="File"
          deleteProps={{
            id: /\/subtitles\/(.*?)\?/.exec(subtitle?.subtitleUrl)?.[1] || null,
            resKey: 'deleteTopicContentSubtitle',
            mutation: DELETE_SUBTITLE,
            variableObj: {
              courseId: courseMetaData?.id,
              topicId: subtitle?.topicId,
              fileName: /\/subtitles\/(.*?)\?/.exec(subtitle?.subtitleUrl)?.[1]
            },
            onDelete: () => {
              const _subtitleArr = structuredClone(topicSubtitle);
              _subtitleArr?.splice(index, 1);

              setTopicSubtitle(_subtitleArr);
            }
          }}
        />
      ))}

      {isFormVisible && (
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
                    value: subtitleFormData.language
                      ? { value: subtitleFormData.language, label: subtitleFormData.language }
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
                  isActive={subtitleFormData?.name}
                  hidePreviewBtns={true}
                  acceptedTypes=".vtt"
                />
              </div>
            </div>

            {/* file name display */}
            <div className={`w-100 text-center`}>{truncateToN(subtitleFormData?.name, 180)}</div>

            {/* footer btn */}
            <div className="center-element-with-flex">
              <RoundedBtn display="Cancel" handleClick={toggleForm} />

              <ToolTip title={ADMIN_COURSES.myCourses.subtitles}>
                <RoundedBtn
                  display={'Add'}
                  isDisabled={!isSubtitlesReady}
                  isActive={isSubtitlesReady}
                  handleClick={handleSubmit}
                />
              </ToolTip>
            </div>
          </div>
        </>
      )}

      {!!languageOptions?.length && (
        <div className={`center-element-with-flex ${styles.marginBetweenInputs}`}>
          <IconButton
            styleClass="btnBlack"
            text="Add Subtitles"
            tooltipText={ADMIN_COURSES.myCourses.subtitles}
            handleClick={toggleForm}
          />
        </div>
      )}
    </>
  );
}
