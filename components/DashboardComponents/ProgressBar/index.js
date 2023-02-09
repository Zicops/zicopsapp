import React from 'react'
import styles from '../dashboardComponents.module.scss'

export default function ProgressBar() {
    let progress = 68
  return (
    <div className={`${styles.progressBarFooter}`}>
       <div className={styles.progress}>
        <span className={`w-${progress}`}></span>
      </div>
   </div>
  )
}
