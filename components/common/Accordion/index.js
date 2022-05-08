import React, { useState } from 'react';
import styles from './accordion.module.scss';

const Accordion = ({ title, children }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <div className={`${styles.accordion}`}>
        <div className={`${styles.accordion_item}`}>
          <div
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
          </div>
          {isActive && <div className={`${styles.accordion_content}`}>{children}</div>}
        </div>
      </div>
      {/* <style jsx>{`
        .accordion {
          max-width: 100%;
          // margin: 2rem auto;
          margin: auto;
        }

        .accordion-title {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          cursor: pointer;
          background-color: #000000;
          color: #808080;
          position: relative;
        }
        .accordion-title-active {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          cursor: pointer;
          background-color: #000000;
          color: #ffffff;
          position: relative;
        }
        .accordion-title:after {
          content: '';
          height: 1px;
          margin-top: 12px;
          background-color: #808080;
          width: 80%;
        }
        .accordion-title-active:after {
          content: '';
          height: 1px;
          margin-top: 12px;
          background-color: #ffffff;
          width: 80%;
        }
        .accordion-title:hover,
        .accordion-title-active:hover {
          background-color: #111111;
        }
        .accordion-title img,
        .accordion-title-active img {
          width: 20px;
          margin-right: 10px;
        }
        .accordion-title .accordion-title-text,
        .accordion-title-active .accordion-title-text {
          width: 20%;
        }
        .accordion-title,
        .accordion-title-active,
        .accordion-content {
          padding: 1rem;
        }

        .accordion-content {
          background-color: #1a1a1a;
          color: #858f8f;
          font-size: 13px;
        }
      `}</style> */}
    </>
  );
};

export default Accordion;
