import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { CourseMetaDataAtom } from '../../atoms/learnerCourseComps.atom';
import styles from '../../learnerCourseComps.module.scss';
import AboutCard from './AboutCard';
import Inclusions from './Inclusions';
import Lists from './Lists';
import TargetAudienceList from './TargetAudienceList';

export default function AboutTab() {
  const courseMeta = useRecoilValue(CourseMetaDataAtom);

  const router = useRouter();
  const courseId = router.query.courseId;
  const isLoading = courseMeta?.id !== courseId;

  return (
    <div className={`${styles.aboutTabContainer}`}>
      <AboutCard isDataLoaded={isLoading} />

      <div className={`${styles.aboutSection}`}>
        <Lists title="Benefits" list={courseMeta.benefits} />
      </div>

      <div className={`${styles.aboutSection}`}>
        <Lists title="Learning Objective" list={courseMeta.outcomes} />
      </div>

      <div className={`${styles.aboutSection}`}>
        <Lists title="Pre-quisites" list={courseMeta.prequisites} />
      </div>

      <div className={`${styles.aboutSection}`}>
        <TargetAudienceList goodFor={courseMeta.goodFor} mustFor={courseMeta.mustFor} />
      </div>
      <div className={`${styles.aboutSection}`}>
        <Inclusions languages={courseMeta.language} />
      </div>
      <div className={`${styles.aboutSection}`}>
        <Lists title="Related Skills" list={courseMeta.relatedSkills} isPills={true} />
      </div>
    </div>
  );
}
