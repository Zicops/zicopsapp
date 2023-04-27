import styles from '../adminCourse.module.scss';
import { useEffect, useState } from 'react';
import useHandleIndividualCourseAnalytics from '../Logic/useHandleIndividualCourseAnalytics';
import { CourseMetaDataAtom } from '@/state/atoms/courses.atom';
import { useRecoilValue } from 'recoil';
import { COURSE_MAP_STATUS } from '@/helper/constants.helper';

export default function HeaderDataContainer() {
  const [dynamicFact, setDynamicFact] = useState({ isAssigned: 0, inProgress: 0, isCompleted: 0 });

  const courseMetaData = useRecoilValue(CourseMetaDataAtom);

  const { getCourseAnalyticsById } = useHandleIndividualCourseAnalytics();

  const courseHeaderData = [
    {
      title: 'Assigned to',
      subText: 'Learners',
      iconSrc: '/images/svg/assigned-to-dahsboard-icon.svg',
      dynamicfact: dynamicFact?.isAssigned,
    },
    {
      title: 'In progress',
      subText: 'Learners',
      iconSrc: '/images/svg/in-progress-dashboard-icon.svg',
      dynamicfact: dynamicFact?.inProgress,
    },
    {
      title: 'Completed by',
      subText: 'Learners',
      iconSrc: '/images/svg/completed-dashboard-icon.svg',
      dynamicfact: dynamicFact?.isCompleted,
    },
  ];

  useEffect(() => {
    getCourseAnalyticsById(courseMetaData?.id, COURSE_MAP_STATUS?.open)?.then((resp) =>
      setDynamicFact((prev) => ({
        ...prev,
        isAssigned: resp?.getCourseAnalyticsDataById?.count || 0,
      })),
    );

    getCourseAnalyticsById(courseMetaData?.id, COURSE_MAP_STATUS?.started)?.then((resp) =>
      setDynamicFact((prev) => ({
        ...prev,
        inProgress: resp?.getCourseAnalyticsDataById?.count || 0,
      })),
    );

    getCourseAnalyticsById(courseMetaData?.id, COURSE_MAP_STATUS?.completed)?.then((resp) =>
      setDynamicFact((prev) => ({
        ...prev,
        isCompleted: resp?.getCourseAnalyticsDataById?.count || 0,
      })),
    );
  }, []);

  return (
    <div className={`${styles.dataFrame}`}>
      {courseHeaderData?.map((data) => {
        return (
          <div className={`${styles.dataContainer}`}>
            <div className={`${styles.factContainer}`}>
              <p>{data?.title}</p>
              <div className={`${styles.factSubtext}`}>
                <p className={`${styles.dynamicFact}`}>{data?.dynamicfact} </p>
                <p className={`${styles.subText}`}>{data?.subText}</p>
              </div>
            </div>
            <div className={`${styles.iconContainer}`}>
              <img src={data?.iconSrc} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
