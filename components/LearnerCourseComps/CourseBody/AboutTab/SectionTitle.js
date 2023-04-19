import styles from '../../learnerCourseComps.module.scss';

export default function SectionTitle({ title = '' }) {
  return <div className={`${styles.sectionTitle}`}>{title}</div>;
}
