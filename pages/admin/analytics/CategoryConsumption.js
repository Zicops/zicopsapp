import React from 'react'
import styles from './analytics.module.scss'
import BarGraph from '@/components/DashboardComponents/BarGraph';

export default function CategoryConsumption() {
  return (
    <div className={`${styles.wrapper}`}>
    <div className={`${styles.wrapperHeading}`}>Category consumption</div>
    <div className={`${styles.wrapperSubHeading}`}>All categories</div>
    <BarGraph/>
  </div>
  )
}
