import { useRecoilState } from 'recoil';
import { ActiveCourseHeroAtom, courseHeroObj } from '../../atoms/learnerCourseComps.atom';
import BackArrowBtn from '../../common/BackArrowBtn';
import styles from '../../learnerCourseComps.module.scss';

export default function CourseHeroTopBar({
  handleBackBtnClick = null,
  leftSideComps = null,
  centerComps = null,
  rightComps = null,
  isHidden = null,
  handleMouseEnter = () => {},
  handleMouseLeave = () => {},
}) {
  const [activeHero, setActiveHero] = useRecoilState(ActiveCourseHeroAtom);

  return (
    <section
      className={`${styles.topBar} ${isHidden ? 'slideUp' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <div className={`${styles.backBtn}`}>
        <BackArrowBtn
          handleClick={(e) => {
            if (!!handleBackBtnClick) return handleBackBtnClick(e);

            setActiveHero(courseHeroObj.courseMetaPreview);
          }}
        />
      </div>

      <div className={`${styles.topbarIcons}`}>
        <div className={`${styles.leftIcons}`}>{leftSideComps}</div>
        <div className={`${styles.centerIcons}`}>{centerComps}</div>
        <div className={`${styles.rightIcons}`}>{rightComps}</div>
      </div>
    </section>
  );
}
