import SwitchButton from '@/components/DashboardComponents/SwitchButton'
import React from 'react'
import styles from './analytics.module.scss'
export default function CategoryAvailability() {
  return (
    <div className={`${styles.wrapper}`}>
    <div className={`${styles.wrapperHeading}`}>Category availability</div>
    <div className={`${styles.wrapperSubHeading}`}>
        Showing data for:
        <SwitchButton text={'Sub-categories'}/>
    </div>
  </div>
  )
}
