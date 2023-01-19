import { useState } from 'react';
import styles from './zicopsAccordian.module.scss';
import { DownArrowIcon } from '../ZicopsIcons';

export default function ZicopsAccordian({ title, description, children }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={`${styles.zicopsAccordianContainer}`}
      onClick={() => {
        if (children) setIsActive(!isActive);
      }}>
      <div className={`${styles.header}`}>
        <div className={`${styles.title}`}>
          <h3>{title}</h3>
          <span>
            <DownArrowIcon color="#ffffff" turns={isActive ? '0.5' : '0'}></DownArrowIcon>
          </span>
        </div>
        <div className={`${styles.description}`}>
          <span>{description}</span>
        </div>
      </div>
      {isActive && <div className={`${styles.body}`}>{children}</div>}
    </div>
  );
}
