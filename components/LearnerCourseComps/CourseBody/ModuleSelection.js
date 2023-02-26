import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  ActiveCourseDataAtom,
  CourseModuleIdsAtom,
  CourseModulesAtomFamily,
} from '../atoms/learnerCourseComps.atom';
import ZicopsSkeleton from '../common/ZicopsSkeleton';
import styles from '../learnerCourseComps.module.scss';

export default function ModuleSelection() {
  const [activeCourseData, setActiveCourseData] = useRecoilState(ActiveCourseDataAtom);
  const courseModuleIds = useRecoilValue(CourseModuleIdsAtom);
  const moduleData = useRecoilValue(CourseModulesAtomFamily(activeCourseData?.moduleId));

  let moduleIndex = courseModuleIds?.findIndex((modId) => modId === activeCourseData?.moduleId);
  if (moduleIndex < 0) moduleIndex = null;

  const moduleId = activeCourseData?.moduleId;
  const isLoading = !moduleId || moduleData?.length === 0;

  return (
    <div className={styles.moduleSelection}>
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

      <div>
        <p className={styles.moduleName}>
          {isLoading ? (
            <ZicopsSkeleton variant="rounded" height={30} width={200} />
          ) : (
            moduleData?.name
          )}
        </p>

        <p className={styles.moduleDescription}>
          {isLoading ? (
            <>
              <ZicopsSkeleton variant="text" height={30} width={700} />
              <ZicopsSkeleton variant="text" height={30} width={400} />
              <ZicopsSkeleton variant="text" height={30} width={100} />
            </>
          ) : (
            <>
              {moduleData?.description}

              <span>Expertise Level: {moduleData?.level}</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
