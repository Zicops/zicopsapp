import React from 'react';
import styles from '../adminAnalyticsDashboard.module.scss';
import { myCoursesAvailabilityData } from '@/components/DashboardComponents/Logic/dashboardData.helper'
import Card from '@/components/DashboardComponents/Card';
// import useHandleMyCourseAvailability from 'pages/admin/analytics/Logic/useHandleMyCourseAvailability';


export default function MyCoursesAvailability() {
  // const cardData = useHandleMyCourseAvailability();
  const cardData = myCoursesAvailabilityData;
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.wrapperHeading}`}>My courses availability</div>
      <div className={`${styles.categoryAndExpertiseAvailability}`}>
        {cardData.map((data) => {
          return <Card key = {data?.id} {...data} />;
        })}
      </div>
    </div>
  );
}
