import React from 'react'
import styles from '../adminAnalyticsDashboard.module.scss';
import { statisticsCardData } from '@/components/DashboardComponents/Logic/dashboardData.helper'
import StatisticsCard from '@/components/DashboardComponents/StatisticsCard'

export default function CourseStatistics() {
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.wrapperHeading}`}>Course statistics</div>
      {statisticsCardData.map((data) => {
        return <StatisticsCard key = {data?.id} props={data} />;
      })}
    </div>
  );
}
