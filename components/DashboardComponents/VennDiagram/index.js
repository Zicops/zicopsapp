import React from 'react';
import styles from './vennDiagram.module.scss';
import { levelCount } from '../Logic/dashboardData.helper';
import { difficultyLevel } from '../Logic/dashboardData.helper';
import { data } from '../Logic/dashboardData.helper';

export default function VennDiagram({ data }) {

  let total = 0;
  let count = data.length;
  for (let k = 0; k < count; k++) {
    total = total + +data[k]?.levelCount;
  }
  // total = data.reduce((a, b) => parseInt(a.levelCount) + parseInt(b.levelCount), 0);
  return (
    <>
      <div className={`${styles.wrapperContainer}`}>
        {data.map((cd, i) => {
          let cdclass;
          if (cd.difficultyLevel == 'Beginner') {
            cdclass = styles.Beginner;
          } else if (cd.difficultyLevel == 'Competent') {
            cdclass = styles.Competent;
          } else {
            cdclass = styles.Proficient;
          }

          let heightWidth = '50%';
          let rotate = '0 deg';

          heightWidth = `calc(55% + (+${cd.levelCount} / ${total})*20%)`;
          rotate = `360/${count} * ${i}deg`;

          return (
            <div
              key={i}
              className={cdclass}
              style={{
                width: `${heightWidth}`,
                height: `${heightWidth}`,
                transform: `rotate(calc(${rotate}))`
              }}>
              <div style={{ transform: `rotate(calc(-${rotate}))` }}>
                <h4> {cd.levelCount}</h4>
                <p>{cd.difficultyLevel}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
