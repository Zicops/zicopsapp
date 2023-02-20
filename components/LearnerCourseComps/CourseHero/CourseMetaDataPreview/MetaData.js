import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  ActiveCourseHeroAtom,
  courseHeroObj,
  CourseMetaDataAtom,
} from '../../atoms/learnerCourseComps.atom';
import ButtonWithNoStyles from '../../common/ButtonWithNoStyles';
import KeyValueWithColon from '../../common/KeyValueWithColon';
import ZicopsSkeleton from '../../common/ZicopsSkeleton';
import styles from '../../learnerCourseComps.module.scss';
import CourseBtn from './CourseBtn';
import CourseTitle from './CourseTitle';

export default function MetaData() {
  const [activeHero, setActiveHero] = useRecoilState(ActiveCourseHeroAtom);
  const courseMeta = useRecoilValue(CourseMetaDataAtom);
  const durationInMinutes = isNaN(+courseMeta?.duration)
    ? null
    : Math.floor(courseMeta?.duration / 60);

  const isAssigned = false;
  const router = useRouter();
  const courseId = router.query.courseId;

  const isLoading = courseMeta?.id !== courseId;

  const catSubCatData = [
    courseMeta?.category,
    courseMeta?.subCategory,
    durationInMinutes ? `Duration: ${durationInMinutes} mins` : null,
  ];
  const keyValues = [
    { id: 1, key: 'Course Benefits', value: courseMeta?.benefits },
    { id: 2, key: 'Expertise Level', value: courseMeta?.expertiseLevel },
    { id: 3, key: 'Prerequisites', value: courseMeta?.prequisites },
    { id: 4, key: 'Good For', value: courseMeta?.goodFor },
    { id: 5, key: 'Must For', value: courseMeta?.mustFor },
  ];

  return (
    <div className={`${styles.courseDataContainer}`}>
      <CourseTitle name={courseMeta?.name} isLoading={isLoading} />

      <p className={`${styles.textGray}`}>
        {isLoading ? (
          <ZicopsSkeleton variant="text" height={30} width={400} />
        ) : (
          <>
            This course is provisioned by{' '}
            <span className={`${styles.boldWhite}`}>{courseMeta?.owner}</span> and published by{' '}
            <span className={`${styles.boldWhite}`}>{courseMeta?.publisher}</span>
          </>
        )}
      </p>

      <ul className={`${styles.catSubCat}`}>
        {catSubCatData?.map((data) => {
          if (!data) return null;
          if (isLoading) return <ZicopsSkeleton variant="text" height={30} width={100} />;

          <li>{data}</li>;
        })}
      </ul>

      <summary className={`${styles.caption} ${styles.textGray}`}>
        {isLoading ? (
          <ZicopsSkeleton variant="rounded" height={40} width={600} />
        ) : (
          courseMeta?.summary
        )}
      </summary>

      <section className={`${styles.detailsSection}`}>
        <div className={`${styles.details}`}>
          {keyValues.slice(0, 2).map((obj) => (
            <KeyValueWithColon
              key={obj.id}
              keyData={{ text: obj.key, textColor: styles.primary }}
              valueData={{ text: obj.value, textColor: styles.darkThree }}
              isLoading={isLoading}
            />
          ))}
        </div>

        <CourseBtn
          isAssigned={isAssigned}
          isLoading={isLoading}
          // completionDateUnix={courseMeta?.completionDateUnix}
          suggestedDurationInDays={+courseMeta?.expectedCompletion}
          handleClick={() => {
            if (!isAssigned) return setActiveHero(courseHeroObj.coursePreviewVideo);
          }}
        />

        <div className={`${styles.details}`}>
          {keyValues.slice(2).map((obj) => (
            <KeyValueWithColon
              key={obj.id}
              keyData={{ text: obj.key, textColor: styles.primary }}
              valueData={{ text: obj.value, textColor: styles.darkThree }}
              isLoading={isLoading}
            />
          ))}
        </div>
      </section>

      {!!isAssigned && (
        <ButtonWithNoStyles
          text="Preview the course"
          styleClass={`${styles.coursePreviewBtn}`}
          handleClick={() => setActiveHero(courseHeroObj.coursePreviewVideo)}
        />
      )}
    </div>
  );
}

MetaData.defaultProps = {
  expertiseLevel: '',
  benefits: '',
  prequisites: '',
  goodFor: '',
  mustFor: '',
  suggestedDurationInSeconds: null,

  isAssigned: false,
  completionDateUnix: null,
};

MetaData.propTypes = {
  expertiseLevel: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  benefits: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  prequisites: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  goodFor: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  mustFor: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  suggestedDurationInSeconds: PropTypes.number,

  isAssigned: PropTypes.bool,
  completionDateUnix: PropTypes.number,
};
