import React from 'react';
import styles from '../adminAnalyticsDashboard.module.scss';
import CourseStatistics from './CourseStatistics';
import CourseViewAnalytics from './CourseViewAnalytics';

export default function CourseStatisticsAndCourseViewAnalytics() {
  return (
    <div className={`${styles.categoryAndExpertiseAvailability}`}>
      <CourseStatistics />
      <CourseViewAnalytics/>
    </div>
  );
}
