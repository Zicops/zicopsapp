import SwitchButton from '@/components/common/FormComponents/SwitchButton';
import { truncateToN } from '@/utils/string.utils';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  ActiveCourseDataAtom,
  CourseTopicContentAtomFamily,
} from '../../atoms/learnerCourseComps.atom';
import ButtonWithNoStyles from '../../common/ButtonWithNoStyles';
import styles from '../../learnerCourseComps.module.scss';

export default function SubtitleBox() {
  const [activeCourseData, setActiveCourseData] = useRecoilState(ActiveCourseDataAtom);
  const topicContent = useRecoilValue(CourseTopicContentAtomFamily(activeCourseData?.topicId));

  const allLanguages = topicContent?.map((tc) => ({ label: tc?.language, value: tc?.id }));
  const allSubtitles = topicContent?.[0]?.subtitleUrl?.map((subtitle) => ({
    label: subtitle?.language,
    value: subtitle?.url,
  }));

  function selectSubtitle(selectedData = null) {
    setActiveCourseData({
      ...activeCourseData,
      subTitle:
        selectedData == null ? null : { language: selectedData?.label, url: selectedData?.value },
    });
  }

  return (
    <>
      <div className={`${styles.subtitleBox}`}>
        {/* for topic content language  */}
        <div>
          <h4>Audio </h4>

          <section>
            {allLanguages?.map((lang) => (
              <ButtonWithNoStyles
                key={lang?.label}
                styleClass={`${lang?.label === activeCourseData?.language ? styles.active : ''}`}>
                {truncateToN(lang?.label, 15)}
              </ButtonWithNoStyles>
            ))}
          </section>
        </div>

        {/* for topic content subtitles */}
        <div>
          <h4>
            Subtitles
            <SwitchButton
              styles={{ marginLeft: '0.5em' }}
              isDisabled={!allSubtitles?.length}
              isChecked={activeCourseData?.subTitle?.url || null}
              handleChange={(e) =>
                selectSubtitle(!activeCourseData?.subTitle?.url ? allSubtitles?.[0] : null)
              }
              size="small"
            />
          </h4>

          <section>
            {allSubtitles?.map((subtitle) => (
              <ButtonWithNoStyles
                key={subtitle?.label}
                handleClick={() => selectSubtitle(subtitle)}
                styleClass={`${
                  subtitle?.label === activeCourseData?.subTitle?.language ? styles.active : ''
                }`}>
                {truncateToN(subtitle?.label, 15)}
              </ButtonWithNoStyles>
            ))}
          </section>
        </div>

        {(allSubtitles?.length > 3 || allLanguages?.length > 3) && (
          <div className={`${styles.scrollArrow}`}>
            <img src="/images/bigarrowleft.png" alt="" />
          </div>
        )}
      </div>
    </>
  );
}
