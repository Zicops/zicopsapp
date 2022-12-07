// components\Tabs\CourseConfiguration\CourseDetailsTable.js
import styles from '../courseTabs.module.scss';

export default function CourseDetailsTable({ data = [] }) {
  return (
    <div className={`${styles.courseDetailsTable}`}>
      {data?.map((item) => (
        <div>
          <p className={`${styles.title}`}>{item.title}</p>
          <p className={`${styles.value}`}>{item.value}</p>
        </div>
      ))}
    </div>
  );
}
