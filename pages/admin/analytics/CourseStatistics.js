import React from 'react'
import styles from './analytics.module.scss'
import { statisticsCardData } from '@/components/DashboardComponents/Logic/dashboardData.helper'
import StatisticsCard from '@/components/DashboardComponents/StatisticsCard'

export default function CourseStatistics() {
  return (
    <div className={`${styles.wrapper}`}>
    <div className={`${styles.wrapperHeading}`}>Multilingual course availability</div>
    {statisticsCardData.map((data) => {
        return(
            <StatisticsCard props = {data}/>
        )
    })}
    
  </div>
  )
}
