import React, { useEffect, useState } from 'react';
import styles from './customTooltip.module.scss';

const CustomTooltip = ({ info, image, customStyle, customColor }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [show]);

  return (
    <span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShow(true);
        }}
        className={styles.infoButton}>
        {/* <img src="/images/svg/error_outline_dark.svg" alt="tooltip icon" /> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none">
          <path
            d="M11 15H13V17H11V15ZM11 7H13V13H11V7ZM11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z"
            fill={customColor ? 'black' : '#6bcfcf'}
          />
        </svg>
      </button>
      {show && (
        <div className={`${show ? styles.info : ''}`} style={customStyle}>
          <button onClick={() => setShow(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="58"
              height="58"
              viewBox="0 0 58 58"
              fill="none">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M29 56.0667C43.9485 56.0667 56.0667 43.9485 56.0667 29C56.0667 14.0515 43.9485 1.93333 29 1.93333C14.0515 1.93333 1.93333 14.0515 1.93333 29C1.93333 43.9485 14.0515 56.0667 29 56.0667ZM29 58C45.0163 58 58 45.0163 58 29C58 12.9837 45.0163 0 29 0C12.9837 0 0 12.9837 0 29C0 45.0163 12.9837 58 29 58Z"
                fill="white"
              />
              <path
                d="M40.1817 15.0156L31.5515 27.9609L31.1817 28.5156L31.5515 29.0703L40.1817 42.0156H36.7919L29.8378 31.3527L29.0002 30.0684L28.1626 31.3527L21.2085 42.0156H17.9236L27.3899 29.107L27.8137 28.5292L27.4028 27.9422L18.3542 15.0156H21.1959L28.1522 26.1456L28.9731 27.4591L29.8322 26.1703L37.2687 15.0156H40.1817Z"
                fill="white"
                stroke="white"
                stroke-width="2"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15.5049 13.5312H22.0178L29.013 24.7236L36.4746 13.5312H42.953L32.9641 28.5146L42.953 43.4979H35.9881L28.9999 32.7827L22.0117 43.4979H14.9961L25.9887 28.508L15.5049 13.5312ZM17.3616 14.4979L27.1778 28.5211L16.9037 42.5312H21.4881L28.9999 31.0131L36.5117 42.5312H41.1468L31.8023 28.5146L41.1468 14.4979H36.9919L28.9868 26.5056L21.482 14.4979H17.3616Z"
                fill="white"
              />
            </svg>
          </button>
          {image && (
            <div>
              <img src={image} alt="" />
            </div>
          )}
          <span>{info}</span>
        </div>
      )}
    </span>
  );
};

export default CustomTooltip;
