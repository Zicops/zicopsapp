import styles from '../../learnerCourseComps.module.scss';

export default function TopBarCenterTitle({ title = '', subtitle = '' }) {
  return (
    <>
      <div className={`${styles.topBarCenterTitle}`}>
        <span className={`${styles.title}`}>{title || ''}</span>
        <span>{subtitle || ''}</span>
      </div>
    </>
  );
}
