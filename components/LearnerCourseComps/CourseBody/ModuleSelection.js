import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import { AllCourseModulesDataAtom } from '@/state/atoms/courses.atom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ActiveCourseDataAtom, CourseModulesAtomFamily } from '../atoms/learnerCourseComps.atom';
import ZicopsSkeleton from '../common/ZicopsSkeleton';
import styles from '../learnerCourseComps.module.scss';

export default function ModuleSelection() {
  const [activeCourseData, setActiveCourseData] = useRecoilState(ActiveCourseDataAtom);
  const allModules = useRecoilValue(AllCourseModulesDataAtom);
  const moduleData = useRecoilValue(CourseModulesAtomFamily(activeCourseData?.moduleId));

  const moduleId = activeCourseData?.moduleId;
  const isLoading = !moduleId || moduleData?.length === 0;

  return (
    <div className={styles.moduleSelection}>
      <LabeledDropdown
        dropdownOptions={{
          inputName: 'moduleSelection',
          placeholder: 'Select course module',
          options: allModules?.map((mod, i) => ({
            value: mod?.id,
            label: `MODULE ${mod?.sequence || ''}`,
          })),
          value: {
            value: activeCourseData?.moduleId,
            label: `MODULE ${moduleData?.sequence || ''}`,
          },
          isSearchEnable: true,
          isDisabled: !allModules?.length,
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
