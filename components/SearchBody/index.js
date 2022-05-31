import { useLazyQuery } from '@apollo/client';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { GET_LATEST_COURSES, queryClient } from '../../../learning/API/Queries';
import { ToastMsgAtom } from '../../state/atoms/toast.atom';
import Card from '../common/Card';
import styles from './searchBody.module.scss';

const SearchBody = () => {
  const [loadCourses, { error: loadCoursesError, refetch: refetchCourses }] = useLazyQuery(
    GET_LATEST_COURSES,
    { client: queryClient }
  );

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const lastItemRef = useRef(null);

  // state for storing courses data
  const [courses, setCourses] = useState([]);
  const [pageCursor, setPageCursor] = useState(null);
  const [refetchData, setRefetchData] = useState(null);

  // load table data
  useEffect(() => {
    const queryVariables = { publish_time: Date.now(), pageSize: 10, pageCursor: '' };

    loadCourses({ variables: queryVariables }).then(({ data }) => {
      if (loadCoursesError) return setToastMsg({ type: 'danger', message: 'course load error' });

      const courseData = data?.latestCourses;
      setPageCursor(courseData?.pageCursor || null);
      setCourses(courseData?.courses || []);
    });
  }, []);

  function refetchNextCourses() {
    if (!pageCursor) return;
    refetchCourses({ pageCursor: pageCursor }).then(({ data: { latestCourses } }) => {
      console.log('refecth', 'course length', courses.length + latestCourses?.courses?.length);
      setPageCursor(latestCourses?.pageCursor || null);
      setCourses([...courses, ...latestCourses?.courses]);
    });

    if (loadCoursesError) return setToastMsg({ type: 'danger', message: 'course load error' });
  }

  // for reloading new courses
  useEffect(() => {
    var options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    };
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setRefetchData(true);
      }
    }, options);
    if (lastItemRef?.current) observer.observe(lastItemRef?.current);
  }, []);

  useEffect(() => {
    if (refetchData) {
      refetchNextCourses();
      setRefetchData(false);
    }
  }, [refetchData]);

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
};

export default SearchBody;
