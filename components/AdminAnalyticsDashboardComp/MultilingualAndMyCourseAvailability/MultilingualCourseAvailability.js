import AvailabilityCard from '@/components/DashboardComponents/AvailabilityCard'
import React from 'react'
import styles from '../adminAnalyticsDashboard.module.scss';
import { availabilityCardData } from '@/components/DashboardComponents/Logic/dashboardData.helper'



export default function MultilingualCourseAvailability() {
  return (
    <div className={`${styles.wrapper}`}>
    <div className={`${styles.wrapperHeading}`}>Multilingual course availability</div>
    {availabilityCardData.map((data) => {
        return(
            <AvailabilityCard key={data?.id} props = {data}/>
        )
    })}
    
  </div>
  )
}
