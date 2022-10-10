import React, { useEffect, useState } from 'react';
import styles from './customTooltip.module.scss';

const CustomTooltip = ({ info, image }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [show]);

  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShow(true);
        }}
        className={styles.infoButton}>
        <img src="/images/svg/error_outline_dark.svg" alt="tooltip icon" />
      </button>
      {show && (
        <div className={`${show ? styles.info : ''}`}>
          {image && (
            <div>
              <img src={image} alt="" />
            </div>
          )}
          <span>{info}</span>
        </div>
      )}
    </>
  );
};

export default CustomTooltip;
