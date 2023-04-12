import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import KeyValueWithColon from '../../common/KeyValueWithColon';
import styles from '../../learnerCourseComps.module.scss';
import AboutCard from './AboutCard';
import Inclusions from './Inclusions';
import Lists from './Lists';
import SectionTitle from './SectionTitle';
import { CourseMetaDataAtom } from '@/state/atoms/courses.atom';

export default function AboutTab() {
  const courseMeta = useRecoilValue(CourseMetaDataAtom);

  const router = useRouter();
  const courseId = router.query.courseId;
  const isLoading = courseMeta?.id !== courseId;

  const targetAudienceList = [
    { key: 'Good For', value: courseMeta?.goodFor },
    { key: 'Must For', value: courseMeta?.mustFor },
  ];

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
        <SectionTitle title="Target Audience" />

        <div className={`${styles.gapBetweenPointers}`}>
          {targetAudienceList?.map((inclusion) => (
            <KeyValueWithColon
              keyData={{ text: inclusion?.key, textColor: styles.primary, flex: 1.5 }}
              valueData={{ text: inclusion?.value, textColor: styles.primary }}
            />
          ))}
        </div>
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
