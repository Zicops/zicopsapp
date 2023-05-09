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

  const dateObj = new Date(watchTime * 1000);
  const hours = dateObj.getUTCHours();
  const minutes = dateObj.getUTCMinutes();
  const seconds = dateObj.getUTCSeconds();
  const hoursDecimal = (hours + minutes / 60 + seconds / 3600).toFixed(2);

  return (
    <div className={`${styles.watchTimeDataAndGraphContainer}`}>
      <div className={`${styles.watchTimeDataContainer}`}>
        <h4>Total Watch Time</h4>
        <div className={`${styles.watchTimeDataFact}`}>
          <img src="/images/svg/total-watch-time-icon.svg" />
          <div className={`${styles.dynamicFactContainer}`}>
            <p className={`${styles.dynamicFact}`}>{hoursDecimal || '0.00'}</p>
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
