import Loader from '@/components/common/Loader';
import TileCard from '@/components/common/TileCard';
import { useRouter } from 'next/router';
import styles from '../search.module.scss';

export default function SearchBody({ courses, isLoading, lastItemRef }) {
  const router = useRouter();
  return (
    <>
      <div className={`${styles.searchBodyTitle}`}>Search Results</div>
      <div className={`${styles.searchBody}`}>
        {isLoading && <Loader customStyles={{ height: '100px', background: 'transparent' }} />}

        {!courses?.length && !isLoading && (
          <div className={`${styles.notFound}`}>No Courses Found</div>
        )}

        {!!courses?.length &&
          !isLoading &&
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
              handleClick={() => router.push(`/course/${course?.id}`)}
            />
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
