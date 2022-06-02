import Card from '../../common/Card';
import styles from '../search.module.scss';

export default function SearchBody({ courses, lastItemRef }) {
  return (
    <>
      <div className={`${styles.searchBodyTitle}`}>Search Results</div>
      <div className={`${styles.searchBody}`}>
        {courses.map((course) => (
          <Card data={course} key={course.id} />
        ))}
      </div>

      <span ref={lastItemRef}></span>
    </>
  );
}
