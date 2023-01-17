import React from 'react'
import styles from './badge.module.scss';

export default function Badge({props}) {
    console.log(props);
  return (
    <div className={`${styles.badge_wrapper}`}>
      <p className={`${styles.badge_count}`}>{props.badgeCount}</p>
      <p className={`${styles.badge_text}`}>{props.badgeText}</p>
    </div>
  )
}
