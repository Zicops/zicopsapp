import React from 'react';
import styles from './registerNow.module.scss';
import { registerationData } from './data';

const RegisterNow = ({ data = {} }) => {
  return (
    <>
      <div className={`${styles.registerNow_certificate}`}>
        <div className={`${styles.registerNow_certificate_fullrow}`}>
          <div className={`${styles.label}`}>
            Certificate<span>:</span>
          </div>
          <div className={`${styles.value}`}>{registerationData.certificate}</div>
        </div>
      </div>
      <div className={`${styles.registerNow_Price}`}>
        <div className={`${styles.registerNow_Icon}`}>
          <img src="/images/svg/sell.svg" alt="" />
        </div>
        Price: Rs. {data?.price}/Seat
        <div className={`${styles.registerNow_partition}`}></div>
        <div className={`${styles.registerNow_Icon}`}>
          <img src="/images/svg/airline_seat_recline_extra.svg" alt="" />
        </div>
        Seat Left: {registerationData.seatsLeft}/{registerationData.totalSeats}
      </div>
      <div className={`${styles.registerNow_BannerButtons}`}>
        <button className={`${styles.bookNowButton}`}>Register</button>
        <button>Preview the Course</button>
        <div className={`${styles.registerNow_scheduleLinks}`}>
          <a>
            <img src="/images/ExamInstructions/Event.png" alt="" /> Schedule
          </a>
          <a>
            <img src="/images/svg/workspace_premium.svg" alt="" /> Certificate
          </a>
        </div>
      </div>

      <div className={`${styles.registerNow_certificate}`}>
        <div className={`${styles.registerNow_certificate_fullrow}`}>
          <div className={`${styles.label}`}>
            Instructor<span>:</span>
          </div>
          <div className={`${styles.value}`}>{data?.by}</div>
        </div>
      </div>
      <div className={`${styles.registerNow_instructions}`}>
        <div className={`${styles.registerNow_certificate}`}>
          <div className={`${styles.registerNow_certificate_row}`}>
            <span className={`${styles.registerNow_label}`}>Batch Starts On</span>
            <span>:</span>
            <span className={`${styles.registerNow_value}`}>{data?.date}</span>
          </div>
          <div className={`${styles.registerNow_certificate_row}`}>
            <span className={`${styles.registerNow_label}`}>Registeration Ends On</span>
            <span>:</span>
            <span className={`${styles.registerNow_value}`}>
              {registerationData.registerationEnd}
            </span>
          </div>
        </div>

        <div className={`${styles.registerNow_shareIcons}`}>
          <a>
            <img src="/images/svg/Share-icon.svg" alt="" /> Share
          </a>
          <a>
            <img src="/images/svg/Edit-icon.svg" alt="" /> Feedback
          </a>
          <a>
            <img src="/images/svg/Send-icon.svg" alt="" /> Enquire
          </a>
        </div>
      </div>
    </>
  );
};

export default RegisterNow;
