import { FolderIcon, PlusIcon } from '@/components/common/ZicopsIcons';
import styles from '../../learnerCourseComps.module.scss';

export default function CourseTitle({ name = '', isAssigned = false }) {
  return (
    <section className={`${styles.courseTitle}`}>
      <h1>{name}</h1>

      <span className={`${styles.assignBtn}`}>
        {isAssigned ? <FolderIcon color={styles.primary} /> : <PlusIcon color={styles.primary} />}
      </span>
    </section>
  );
}
