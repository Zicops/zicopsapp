import { useState } from 'react';
import styles from './zicopsAccordian.module.scss';
import { DownArrowIcon } from '../ZicopsIcons';

export default function ZicopsAccordian({ title, description, children, defaultState = false }) {
  const [isActive, setIsActive] = useState(defaultState);

  return (
    <div className={`${styles.zicopsAccordianContainer}`}>
      <div className={`${styles.header}`} onClick={() => children && setIsActive(!isActive)}>
        <div className={`${styles.title}`}>
          <h3>{title}</h3>

          <DownArrowIcon color="#ffffff" turns={isActive ? '0.5' : '0'}></DownArrowIcon>
        </div>
        <div className={`${styles.description}`}>
          <span>{description}</span>
        </div>
      </div>

      {isActive && <div className={`${styles.body}`}>{children}</div>}
    </div>
  );
}
