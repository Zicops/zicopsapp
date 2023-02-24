import { FolderIcon, PlusIcon } from '@/components/common/ZicopsIcons';
import ZicopsSkeleton from '../../common/ZicopsSkeleton';
import styles from '../../learnerCourseComps.module.scss';

export default function CourseTitle({ name = '', isAssigned = false, isLoading = false }) {
  return (
    <section className={`${styles.courseTitle}`}>
      <h1>
        {isLoading ? <ZicopsSkeleton variant="rounded" height={40} width={500} /> : name || 'N/A'}
      </h1>

      <span className={`${styles.assignBtn}`}>
        {isAssigned ? <FolderIcon color={styles.primary} /> : <PlusIcon color={styles.primary} />}
      </span>
    </section>
  );
}
