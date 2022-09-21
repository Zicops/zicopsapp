import React, { useState } from 'react';
import styles from './accordion.module.scss';

const Accordion = ({ title, children, customClass, isOpen = false }) => {
  const [isActive, setIsActive] = useState(!!isOpen);
  return (
    <>
      <div className={`${styles.accordion} ${customClass}`}>
        <div className={`${styles.accordion_item}`}>
          <section
            className={isActive ? `${styles.accordion_title_active}` : `${styles.accordion_title}`}
            onClick={() => setIsActive(!isActive)}>
            <div className={`${styles.accordion_title_text}`}>{title}</div>
            <div>
              {isActive ? (
                <img src="/images/accordionOn.png" />
              ) : (
                <img src="/images/accordionOff.png" />
              )}
            </div>
          </section>
          {isActive && <div className={`${styles.accordion_content}`}>{children}</div>}
        </div>
      </div>
    </>
  );
};

export default Accordion;
