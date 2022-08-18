import { useRouter } from 'next/router'
import React, { useState } from 'react'
import styles from './singleNotification.module.scss'

const SingleNotification = ({description,img,link,duration,status,style,customStyle}) => {
    const {notification_info_status_unread} = styles
    const router = useRouter()

  return (
    <div className={`${styles.notification_block} ${status === 'unread' ? notification_info_status_unread : ''}`} style={style} onClick={()=>router.push(link)}>
        <div className={`${styles.notification_img}`}>
            <img src={img} alt="error" />
        </div>
        <div className={`${styles.notification_description_block}`} style={customStyle}>
            <div className={`${styles.notification_description}`} >
                <p>{description}</p>
            </div>
            <div className={`${styles.notification_info}`} >
                <p className={`${styles.notification_info_duration}`}>{duration}</p>
                <a href={link} className={`${styles.notification_info_link}`}>{link}</a>
            </div>
        </div>
    </div>
  )
}

export default SingleNotification