import React from 'react'
import Pill from '../Pill'
import ProgressBar from '../ProgressBar'
import styles from '../dashboardComponents.module.scss'


export default function AvailabilityCard({props}) {
    let data ={
        displayText: '15 course'
    } 
  return (
    <div className={`${styles.availabilityCard}`}>
        <div className={`${styles.availabilityCardFirst}`}>
            <div className={`${styles.imgText}`}>
                <img src='/images/svg/translate.svg'/>
                <p className={`${styles.language}`}>{props.language}</p>
            </div>
            <Pill displayText={'45 courses'}/>
        </div>
        <div className={`${styles.availabilityCardSecond}`}>
            <div className={`${styles.card_count}`}>{props.Progress}%</div>
            <div className={`${styles.card_text}`}>Availability</div>
        </div>
        <ProgressBar />
    </div>
  )
}
