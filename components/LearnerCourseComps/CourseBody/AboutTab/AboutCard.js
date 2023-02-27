import { useRecoilValue } from 'recoil';
import { CourseMetaDataAtom } from '../../atoms/learnerCourseComps.atom';
import KeyValueWithColon from '../../common/KeyValueWithColon';
import ZicopsSkeleton from '../../common/ZicopsSkeleton';
import styles from '../../learnerCourseComps.module.scss';
import SectionTitle from './SectionTitle';

export default function AboutCard({ isLoading = false }) {
  const courseMeta = useRecoilValue(CourseMetaDataAtom);
  const durationInMinutes = isNaN(+courseMeta?.duration)
    ? null
    : Math.floor(courseMeta?.duration / 60);

  const courseDetails = [
    { key: 'Duration', value: `${durationInMinutes} min${durationInMinutes > 1 ? 's' : ''}` },
    { key: 'Owned By', value: courseMeta?.owner },
    { key: 'Expected Completion Time', value: courseMeta?.expectedCompletion },
    { key: 'Publisher', value: courseMeta?.publisher },
  ];

  return (
    <div className={`${styles.aboutSection} ${styles.aboutTab}`}>
      <SectionTitle title="About this course" />

      <p className={`${styles.courseDescription}`}>
        {isLoading ? <ZicopsSkeleton variant="rounded" height={60} /> : courseMeta.description}
      </p>

      <div className={`${styles.courseDetails}`}>
        {courseDetails?.map((details) => (
          <KeyValueWithColon
            keyData={{ text: details?.key, textColor: styles.primary }}
            valueData={{ text: details?.value, isBold: true }}
          />
        ))}
      </div>
    </div>
  );
}
