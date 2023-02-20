import { EditIcon, SendIcon, ShareIcon } from '@/common/ZicopsIcons';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import { CourseMetaDataAtom } from '../../atoms/learnerCourseComps.atom';
import BackArrowBtn from '../../common/BackArrowBtn';
import styles from '../../learnerCourseComps.module.scss';
import MetaData from './MetaData';

export default function CourseMetaDataPreview() {
  const { backgroundImageUrl } = useRecoilValue(CourseMetaDataAtom);

  const actionIcons = [
    {
      icon: (
        <>
          <ShareIcon color={styles.primary} />
          Share
        </>
      ),
    },
    {
      icon: (
        <>
          <EditIcon color={styles.primary} />
          Feedback
        </>
      ),
    },
    {
      icon: (
        <>
          <SendIcon color={styles.primary} />
          Enquire
        </>
      ),
    },
  ];
  return (
    <div
      className={`${styles.courseHero}`}
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
      <div className={`${styles.container}`}>
        <div className={`${styles.backBtn}`}>
          <BackArrowBtn />
        </div>

        <MetaData />
      </div>

      {/* share, feedback, enquire btn */}
      <div className={`${styles.actionIcons}`}>
        {actionIcons?.map((obj) => (
          <button onClick={obj.handleClick} disabled={obj.isDisabled}>
            {obj.icon}
          </button>
        ))}
      </div>
    </div>
  );
}

CourseMetaDataPreview.defaultProps = {
  courseData: {
    name: '',
    backgroundImageUrl: '',
    provisionedBy: '',
    category: '',
    subCategory: '',
    durationInSeconds: null,
    summary: '',
    expertiseLevel: '',
    benefits: '',
    prequisites: '',
    goodFor: '',
    mustFor: '',
    suggestedDurationInSeconds: null,

    isAssigned: false,
    completionDateUnix: null,
  },
};

CourseMetaDataPreview.propTypes = {
  courseData: PropTypes.shape({
    name: PropTypes.string,
    backgroundImageUrl: PropTypes.string,
    provisionedBy: PropTypes.string,
    category: PropTypes.string,
    subCategory: PropTypes.string,
    durationInSeconds: PropTypes.number,
    summary: PropTypes.string,
    expertiseLevel: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    benefits: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    prequisites: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    goodFor: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    mustFor: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    suggestedDurationInSeconds: PropTypes.number,

    isAssigned: PropTypes.bool,
    completionDateUnix: PropTypes.number,
  }),
};
