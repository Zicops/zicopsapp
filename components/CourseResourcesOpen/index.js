import { useRecoilValue } from 'recoil';
import { ResourcesAtom } from '../../state/atoms/module.atoms';
import LineText from '../common/LineText';
import CourseResourceLoop from '../CourseResourceLoop';
import CourseShowContainer from '../CourseShowContainer';
import styles from './courseResourcesOpen.module.scss';

const CourseResourcesOpen = ({ isResourceShown }) => {
  const resources = useRecoilValue(ResourcesAtom);
  console.log('resources', resources);

  if (!isResourceShown) return null;

  return (
    <>
      <LineText text={isResourceShown.split('|:|')[1]} />
      <CourseShowContainer>
        {resources.length === 0 ? (
          <div className={`${styles.resourceType}`}>No Resources Uploaded</div>
        ) : (
          <>
            <div className={`${styles.resourceType}`}>PDF</div>
            <div className={`${styles.gridThree}`}>
              {resources.map((r) => (
                <CourseResourceLoop resource={r} key={r.name + r.created_at + Math.random()} />
              ))}
            </div>
          </>
        )}
      </CourseShowContainer>
    </>
  );
};

export default CourseResourcesOpen;
