import React from 'react';
import styles from './analytics.module.scss'
import { myCoursesAvailabilityData } from '@/components/DashboardComponents/Logic/dashboardData.helper'
import Card from '@/components/DashboardComponents/Card';


export default function MyCoursesAvailability() {
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.wrapperHeading}`}>My courses availability</div>
      <div className={`${styles.categoryAndExpertiseAvailability}`}>
        {myCoursesAvailabilityData.map((data) => {
            return(
                <Card props = {data}/>
            )
        })}
      </div>
    </div>
  );
}
