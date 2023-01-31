import React from 'react';
import styles from '../adminAnalyticsDashboard.module.scss';
import CourseStatistics from './CourseStatistics';

export default function CourseStatisticsAndCourseViewAnalytics() {
  return (
    <div className={`${styles.categoryAndExpertiseAvailability}`}>
      <CourseStatistics />
    </div>
  );
}
