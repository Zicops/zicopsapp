import React from 'react'
import styles from './card.module.scss';

export default function Card({props}) {
  return (
    <div className={`${styles.card_wrapper}`}>
        <div className={`${styles.card_head}`}>
            <div className={`${styles.card_title}`}>{props.cardTitle}</div>
            <div className={`${styles.card_img}`}>
                <img src={props.cardImage}/>
            </div>
        </div>
        <div className={`${styles.card_count}`}>{props.cardCount}</div>
        <div className={`${styles.card_text}`}>{props.cardText}</div>

    </div>
  )
}

