import styles from '../adminCourse.module.scss';
import CourseViewAnalytics from '@/components/AdminAnalyticsDashboardComp/CourseStatisticsAndCourseViewAnalytics/CourseViewAnalytics';
import OverallCourseWatchTime from './OverallCourseWatchTime';
import { useEffect, useState } from 'react';
import useHandleIndividualCourseAnalytics from '../Logic/useHandleIndividualCourseAnalytics';
import { useRecoilValue } from 'recoil';
import { CourseMetaDataAtom } from '@/state/atoms/courses.atom';

export default function WatchTimeDataAndGraph() {
  const { getCourseTotalWatchTime } = useHandleIndividualCourseAnalytics();

  const [watchTime, setWatchTime] = useState();
  const courseMetaData = useRecoilValue(CourseMetaDataAtom);

  useEffect(() => {
    getCourseTotalWatchTime(courseMetaData?.id).then((resp) =>
      setWatchTime(resp?.getCourseTotalWatchTime),
    );
  }, []);

  return (
    <div className={`${styles.watchTimeDataAndGraphContainer}`}>
      <div className={`${styles.watchTimeDataContainer}`}>
        <h4>Total Watch Time</h4>
        <div className={`${styles.watchTimeDataFact}`}>
          <img src="/images/svg/total-watch-time-icon.svg" />
          <div className={`${styles.dynamicFactContainer}`}>
            <p className={`${styles.dynamicFact}`}>{watchTime}</p>
            <p>hours</p>
          </div>
        </div>
      </div>
      <div className={`${styles.watchTimeGraphContainer}`}>
        <OverallCourseWatchTime />
      </div>
    </div>
  );
}
