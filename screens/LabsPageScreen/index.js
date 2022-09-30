import { useEffect, useState } from 'react';
import styles from './labsPageScreen.module.scss';

export default function LabsPageScreen({ login }) {
  const [labopen, setLabOpen] = useState(0);
  const openLab = () => {
    setLabOpen(1);
    setTimeout(() => {
      login();
    }, 1000);
  };
  return (
    <div className={`${styles.labsPageScreen}`}>
      <div className={`${styles.labsDoorLeft} ${labopen ? styles.leftDoorOpen : ''}`}>
        <div className={`${styles.labsDoorLeftContent}`}>
          <div className={`${styles.labHeading}`}>
            <h1>JAVA</h1>
            <p>
              This course is provisioned by <strong>Zicops Labs</strong>
            </p>
            <ul>
              <li>Labs</li>
              <li>Excercises</li>
              <li>Do it Yourself</li>
            </ul>
          </div>
          <div className={`${styles.labLeftBody}`}>
            <div className={`${styles.image}`}>
              <img src="/images/svg/Exercise-icon.svg" alt="" />
            </div>
            <div className={`${styles.textBlock}`}>
              <div className={`${styles.textBlockHeading}`}>Excercise</div>
              <div className={`${styles.textBlockContent}`}>
                <span>9</span> completed out of 84.
              </div>
            </div>
          </div>
          <div className={`${styles.labLeftBody}`}>
            <div className={`${styles.image}`}>
              <img src="/images/svg/Projects-icon.svg" alt="" />
            </div>
            <div className={`${styles.textBlock}`}>
              <div className={`${styles.textBlockHeading}`}>Projects</div>
              <div className={`${styles.textBlockContent}`}>
                <span>2</span> completed out of 84.
              </div>
            </div>
          </div>
          <div className={`${styles.labLeftBody}`}>
            <div className={`${styles.image}`}>
              <img src="/images/svg/time-spent-icon.svg" alt="" />
            </div>
            <div className={`${styles.textBlock}`}>
              <div className={`${styles.textBlockHeading}`}>Time Spent</div>
              <div className={`${styles.textBlockContent}`}>
                <span>5</span> completed out of 84.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.centerCircle}`}>
        <div className={`${styles.labsPasswordEntry} ${labopen ? styles.labsPasswordSubmit : ''}`}>
          <div className={`${styles.fingerprint}`}>
            <img src="/images/svg/Finger-print.svg" alt="" />
          </div>
          <label> Enter Your Zicops Password </label>
          <input
            className={`${styles.labsPasswordInput}`}
            type="password"
            value="*********"
            autoComplete="false"
          />
          <button onClick={openLab}>Enter Lab</button>
        </div>
      </div>
      <div className={`${styles.labsDoorRight} ${labopen ? styles.rightDoorOpen : ''}`}>
        <div className={`${styles.labsDoorRightContent}`}>
          <div className={`${styles.battery}`}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={`${styles.batteryText}`}>
            <p>50 mins Left</p> out of 60 Min
          </div>
        </div>
      </div>
    </div>
  );
}
