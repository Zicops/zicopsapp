import SmallCard from '@/components/ZicopsCarousel/SmallCard';
import Card from '../../common/Card';
import styles from '../search.module.scss';

export default function SearchBody({ courses, lastItemRef }) {
  return (
    <>
      <div className={`${styles.searchBodyTitle}`}>Search Results</div>
      <div className={`${styles.searchBody}`}>
        {courses.map((course) => (
          <Card data={course} key={course.id} />

          // <SmallCard
          //   key={course.id}
          //   styleClass={course.id === 0 ? 'card_ietms_start' : ''}
          //   // carouselRefData={carouselRefData.current}
          //   image={course?.tileImg}
          //   courseData={course}
          // />
        ))}
      </div>

      <span ref={lastItemRef}></span>
    </>
  );
}
