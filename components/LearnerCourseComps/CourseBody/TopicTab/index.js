import { useRecoilState, useRecoilValue } from 'recoil';
import { ActiveCourseDataAtom, CourseModuleIdsAtom } from '../../atoms/learnerCourseComps.atom';
import styles from '../../learnerCourseComps.module.scss';
import ModuleSelection from '../ModuleSelection';
import ModuleView from './ModuleView';

export default function TopicTab() {
  const [activeCourseData, setActiveCourseData] = useRecoilState(ActiveCourseDataAtom);
  const courseModuleIds = useRecoilValue(CourseModuleIdsAtom);

  let moduleIndex = courseModuleIds?.findIndex((modId) => modId === activeCourseData?.moduleId);
  if (moduleIndex < 0) moduleIndex = null;

  return (
    <div className={`${styles.topicTab}`}>
      <ModuleSelection />

      <ModuleView moduleId={activeCourseData?.moduleId} />
    </div>
  );
}

TopicTab.defaultProps = {};

TopicTab.propTypes = {};
