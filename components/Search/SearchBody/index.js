import TileCard from '@/components/common/TileCard';
import styles from '../search.module.scss';

export default function SearchBody({ courses, lastItemRef }) {
  return (
    <>
      <div className={`${styles.searchBodyTitle}`}>Search Results</div>
      <div className={`${styles.searchBody}`}>
        {courses?.length ? (
          courses?.map((course) => (
            // <Card data={course} key={course.id} />
            <TileCard
              key={course.id}
              tileImg={course?.tileImage}
              type={course?.type}
              courseName={course?.name}
              ownerName={course?.owner}
              level={course?.expertise_level}
              duration={course?.duration?.toString()}
              description={course?.description}
              category={course?.category}
              subCategory={course?.sub_category}
              customClass={styles.card}
            />
            // <SmallCard
            //   key={course.id}
            //   styleClass={course.id === 0 ? 'card_ietms_start' : ''}
            //   // carouselRefData={carouselRefData.current}
            //   image={course?.tileImg}
            //   courseData={course}
            // />
          ))
        ) : (
          <div className={`${styles.notFound}`}>No Courses Found</div>
        )}
      </div>

      <span ref={lastItemRef}></span>
    </>
  );
}
