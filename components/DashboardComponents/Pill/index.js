import React from 'react'
import styles from '../dashboardComponents.module.scss';

export default function Pill({displayText}) {

  return (
    <div className={`${styles.badge_wrapper}`}>
      <p className={`${styles.badge_count}`}>{displayText} </p>
    </div>
  )
}
