import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import { CourseMetaDataAtom } from '../../atoms/learnerCourseComps.atom';
import KeyValueWithColon from '../../common/KeyValueWithColon';
import styles from '../../learnerCourseComps.module.scss';
import CourseBtn from './CourseBtn';
import CourseTitle from './CourseTitle';

export default function MetaData() {
  const courseMeta = useRecoilValue(CourseMetaDataAtom);
  const durationInMinutes = isNaN(+courseMeta?.duration)
    ? null
    : Math.floor(courseMeta?.duration / 60);

  const isAssigned = false;

  const keyValues = [
    { id: 1, key: 'Course Benefits', value: courseMeta?.benefits },
    { id: 2, key: 'Expertise Level', value: courseMeta?.expertiseLevel },
    { id: 3, key: 'Prerequisites', value: courseMeta?.prequisites },
    { id: 4, key: 'Good For', value: courseMeta?.goodFor },
    { id: 5, key: 'Must For', value: courseMeta?.mustFor }
  ];
  return (
    <div className={`${styles.courseDataContainer}`}>
      <CourseTitle name={courseMeta?.name} />

      <p className={`${styles.textGray}`}>
        This course is provisioned by{' '}
        <span className={`${styles.boldWhite}`}>{courseMeta?.owner}</span> and published by{' '}
        <span className={`${styles.boldWhite}`}>{courseMeta?.publisher}</span>
      </p>

      <ul className={`${styles.catSubCat}`}>
        {!!courseMeta?.category && <li>{courseMeta?.category}</li>}
        {!!courseMeta?.subCategory && <li>{courseMeta?.subCategory}</li>}
        {!!durationInMinutes && <li>Duration: {durationInMinutes} mins</li>}
      </ul>

      <summary className={`${styles.caption} ${styles.textGray}`}>{courseMeta?.summary}</summary>

      <section className={`${styles.detailsSection}`}>
        <div className={`${styles.details}`}>
          {keyValues.slice(0, 2).map((obj) => (
            <KeyValueWithColon
              key={obj.id}
              keyData={{ text: obj.key, textColor: styles.primary }}
              valueData={{ text: obj.value, textColor: styles.darkThree }}
            />
          ))}
        </div>

        <CourseBtn
          isAssigned={isAssigned}
          // completionDateUnix={courseMeta?.completionDateUnix}
          suggestedDurationInDays={+courseMeta?.expectedCompletion}
        />

        <div className={`${styles.details}`}>
          {keyValues.slice(2).map((obj) => (
            <KeyValueWithColon
              key={obj.id}
              keyData={{ text: obj.key, textColor: styles.primary }}
              valueData={{ text: obj.value, textColor: styles.darkThree }}
            />
          ))}
        </div>
      </section>

      <div className={`${styles.coursePreviewBtn}`}>Preview the course</div>
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
  completionDateUnix: null
};

MetaData.propTypes = {
  expertiseLevel: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  benefits: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  prequisites: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  goodFor: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  mustFor: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  suggestedDurationInSeconds: PropTypes.number,

  isAssigned: PropTypes.bool,
  completionDateUnix: PropTypes.number
};
