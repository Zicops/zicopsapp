import React, { useState } from 'react'
import notificationData from './data'
import styles from './notification.module.scss'
import AllNotifications from './AllNotifications'
import { useRouter } from 'next/router'

const Notifications = () => {
  const router = useRouter()
  return (
    <div className={`${styles.notification_box}`}>
      <div className={`${styles.notification_header}`}>
        <p>Notifications</p>
      </div>
      
        <AllNotifications data={notificationData}/>
      
      <div className={`${styles.notification_footer}`}>
        <button onClick={()=>router.reload('/notification-center')}>Open Notification Center</button>
      </div>
    </div>
  )
}

export default Notifications