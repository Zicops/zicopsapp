import React from 'react';
import styles from './vennDiagram.module.scss';
import  {levelCount}  from '../Logic/dashboardData.helper';
import  {difficultyLevel}  from '../Logic/dashboardData.helper';
import {data} from '../Logic/dashboardData.helper';

export default function VennDiagram(props) {
  return (
    <>
    <h1>Venn Diagram</h1>
    <div className={`${styles.wrapperContainer}`}>
      <div className={`${styles.expLevelA}`}>
        <h1> {props.levelCount}</h1>
        <p>{props.difficultyLevel}</p>
      </div>
      <div className={`${styles.expLevelB}`}>
        <h1>{props.levelCount}</h1>
        <p>{props.difficultyLevel}</p>
      </div>
      <div className={`${styles.expLevelC}`}>
        <h1>{props.levelCount}</h1>
        <p>{props.difficultyLevel}</p>
      </div>
      </div>
    </>
  )
}
