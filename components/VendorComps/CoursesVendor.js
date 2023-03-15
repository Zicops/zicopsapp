import styles from './vendorComps.module.scss';

export default function CoursesVendor({ courseImage }) {
  return (
    <div className={`${styles.courseVendorContainer}`}>
      {courseImage?.map((value, key) => {
        return <img src={value} />;
      })}
    </div>
  );
}
