import React, { useState } from 'react'
import notificationData from './data'
import styles from './notification.module.scss'
import SingleNotification from './SingleNotification'
import AllNotifications from './AllNotifications'

const Notifications = () => {
  return (
    <div className={`${styles.notification_box}`}>
      <div className={`${styles.notification_header}`}>
        <p>Notifications</p>
      </div>
      
        <AllNotifications data={notificationData}/>
      
      <div className={`${styles.notification_footer}`}>
        <button href='/notification-center'>Open Notification Center</button>
      </div>
    </div>
  )
}

export default Notifications