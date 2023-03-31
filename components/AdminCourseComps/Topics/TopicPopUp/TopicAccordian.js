import { PlusIcon } from '@/common/ZicopsIcons';
import { useState } from 'react';
import styles from '../../adminCourseComps.module.scss';

export default function TopicAccordian({ title, description, children, isDisabled = false }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={`${styles.topicAccordianContainer}`}>
      <div
        className={`${styles.header} ${isDisabled ? 'disabled' : ''}`}
        onClick={() => children && !isDisabled && setIsActive(!isActive)}>
        <div className={`${styles.title}`}>
          <p>{title}</p>

          <div className={`${styles.imgContainer}`}>
            {!isActive ? (
              <PlusIcon color={styles.primary} />
            ) : (
              <div className={`${styles.minus}`}></div>
            )}
          </div>
        </div>
        <div className={`${styles.description}`}>
          <span>{description}</span>
        </div>
      </div>

      {isActive && <div className={`${styles.body}`}>{children}</div>}
    </div>
  );
}
