import { Fragment } from 'react';
import LearnerPageContainer from '../common/LearnerPageContainer';
import LineText from '../common/LineText';
import CourseResourceLoop from './CourseResourceLoop';
import styles from './courseResourcesOpen.module.scss';

const CourseResourcesOpen = ({ isResourceShown, resources }) => {
  // sort based on type, making similar type consecutive
  resources = resources.sort((r1, r2) => r1.type.localeCompare(r2.type));
  if (!isResourceShown) return null;

  let prevType = null;
  return (
    <>
      <LineText text={isResourceShown.split('|:|')[1]} />
      <LearnerPageContainer>
        {resources.length === 0 ? (
          <div className={`${styles.resourceType}`}>No Resources Uploaded</div>
        ) : (
          <>
            <div className={`${styles.gridThree}`}>
              {resources.map((r, i) => (
                <Fragment key={r.name + i}>
                  {prevType !== r.type && (
                    <h2 className={`${styles.resourceType}`}>{(prevType = r.type)}</h2>
                  )}
                  <CourseResourceLoop resource={r} />
                </Fragment>
              ))}
            </div>
          </>
        )}
      </LearnerPageContainer>
    </>
  );
};

export default CourseResourcesOpen;
