import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ActiveCourseDataAtom, CourseModuleIdsAtom } from '../../atoms/learnerCourseComps.atom';
import styles from '../../learnerCourseComps.module.scss';
import ModuleView from './ModuleView';

export default function TopicTab() {
  const [activeCourseData, setActiveCourseData] = useRecoilState(ActiveCourseDataAtom);
  const courseModuleIds = useRecoilValue(CourseModuleIdsAtom);

  let moduleIndex = courseModuleIds?.findIndex((modId) => modId === activeCourseData?.moduleId);
  if (moduleIndex < 0) moduleIndex = null;

  return (
    <div className={`${styles.topicTab}`}>
      <LabeledDropdown
        dropdownOptions={{
          inputName: 'moduleSelection',
          placeholder: 'Select course module',
          options: courseModuleIds?.map((modId, i) => ({ value: modId, label: `MODULE ${i + 1}` })),
          value: { value: activeCourseData?.moduleId, label: `MODULE ${moduleIndex + 1 || ''}` },
          isSearchEnable: true,
          isDisabled: !courseModuleIds?.length,
        }}
        styleClass={`${styles.moduleDropdown}`}
        changeHandler={(e) =>
          setActiveCourseData({ ...activeCourseData, moduleId: e?.value || null })
        }
      />

      <ModuleView moduleId={activeCourseData?.moduleId} />
    </div>
  );
}

TopicTab.defaultProps = {};

TopicTab.propTypes = {};
