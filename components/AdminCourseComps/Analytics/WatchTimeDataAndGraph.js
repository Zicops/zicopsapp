import styles from '../adminCourse.module.scss';
import CourseViewAnalytics from '@/components/AdminAnalyticsDashboardComp/CourseStatisticsAndCourseViewAnalytics/CourseViewAnalytics';
import OverallCourseWatchTime from './OverallCourseWatchTime';

export default function WatchTimeDataAndGraph() {
  return (
    <div className={`${styles.watchTimeDataAndGraphContainer}`}>
      <div className={`${styles.watchTimeDataContainer}`}>
        <h4>Total Watch Time</h4>
        <div className={`${styles.watchTimeDataFact}`}>
          <img src="/images/svg/total-watch-time-icon.svg" />
          <div className={`${styles.dynamicFactContainer}`}>
            <p className={`${styles.dynamicFact}`}>78.5</p>
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
