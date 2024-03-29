import React from 'react'
import styles from '../dashboardComponents.module.scss';


export default function CardHeader({props}) {
  return (
    <div className={`${styles.cardHeader}`}>
      <img src={props.image}/>
      <p>{props.text}</p>
    </div>
  )
}


