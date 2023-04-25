import styles from '../../learnerCourseComps.module.scss';
import ModuleSelection from '../ModuleSelection';
import ModuleView from './ModuleView';

export default function TopicTab() {
  return (
    <div className={`${styles.topicTab}`}>
      <ModuleSelection />

      <ModuleView />
    </div>
  );
}

TopicTab.defaultProps = {};

TopicTab.propTypes = {};
