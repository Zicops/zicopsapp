import React from 'react'
import styles from '../dashboardComponents.module.scss'
import Pill from '../Pill'

export default function StatisticsCard({props}) {
    let displayText = ''
        
  return (
    <div className={`${styles.card_wrapper}`}>
        <div className={`${styles.card_head}`}>
            <div className={`${styles.card_title}`}>{props.cardTitle}</div>
            <div className={`${styles.card_img}`}>
                <img src={props.cardImage}/>
            </div>
        </div>
        <div className={`${styles.card_count}`}>{props.cardText}</div>
        <div className={`${styles.pill_wrapper}`}>
            <Pill displayText={'45 learners'}/>
            <Pill displayText={'Type : Open'}/>
        </div>

    

    </div>
  )
}
