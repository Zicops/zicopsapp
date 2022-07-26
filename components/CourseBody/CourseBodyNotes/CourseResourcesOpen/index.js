import { Fragment } from 'react';
import LearnerPageContainer from '../common/LearnerPageContainer';
import LineText from '../common/LineText';
import CourseResourceLoop from './CourseResourceLoop';
import styles from './courseResourcesOpen.module.scss';

export default function CourseResourcesOpen({ isResourceShown, resources }) {
  // sort based on type, making similar type consecutive
  if (!isResourceShown) return null;

  return (
    <>
    </>
  );
}
