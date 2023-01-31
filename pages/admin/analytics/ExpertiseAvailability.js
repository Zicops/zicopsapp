import VennDiagram from '@/components/DashboardComponents/VennDiagram'
import React from 'react'
import styles from './analytics.module.scss'
import { data } from '@/components/DashboardComponents/Logic/dashboardData.helper';


export default function ExpertiseAvailability() {
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.wrapperHeading}`}>Expertise availability</div>
      <div className={`${styles.wrapperSubHeading}`}>All categories</div>
        <VennDiagram data={data}/>
    </div>
  )
}
