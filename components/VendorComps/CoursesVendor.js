import styles from './vendorComps.module.scss';

export default function CoursesVendor({ coursesData }) {
  return (
    <div className={`${styles.courseVendorContainer}`}>
      {coursesData.courseImage.map((value, key) => {
        return <img src={value} />;
      })}
    </div>
  );
}
