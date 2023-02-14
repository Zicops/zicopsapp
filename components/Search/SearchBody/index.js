import CourseCard from '@/components/common/CourseCard';
import Loader from '@/components/common/Loader';
import { useRouter } from 'next/router';
import styles from '../search.module.scss';

export default function SearchBody({ courses, isLoading, lastItemRef }) {
  const router = useRouter();
  return (
    <>
      <div className={`${styles.searchBodyTitle}`}>Search Results</div>
      <div className={`${styles.searchBody}`}>
        {isLoading && (
          <Loader
            customStyles={{ height: '100px', background: 'transparent', gridColumn: '1/10' }}
          />
        )}

        {!courses?.length && !isLoading && (
          <div className={`${styles.notFound}`}>No Courses Found</div>
        )}

        {!!courses?.length &&
          !isLoading &&
          courses?.map((course) => (
            <CourseCard
              showAssignSymbol={true}
              key={course?.id}
              image={course.tileImage}
              courseData={course}
            />
          ))}
      </div>

      <span ref={lastItemRef}></span>
    </>
  );
}
