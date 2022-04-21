import { Link, Skeleton } from '@mui/material';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { GET_COURSE } from '../../API/Queries';
import { getQueryData } from '../../helper/api.helper';
import { courseContext } from '../../state/contexts/CourseContext';
import CourseHeader from './CourseHeader';
import Info from './Info';
import style from './courseHero.module.scss';
import { truncateToN } from '../../helper/common.helper';

export default function CourseHero({ set }) {
  const ShowPlayer = () => set(true);

  const router = useRouter();
  const courseContextData = useContext(courseContext);
  const { updateCourseMaster, isDataLoaded, setIsDataLoaded } = courseContextData;
  const {
    data: courseData,
    loading,
    error
  } = getQueryData(GET_COURSE, { course_id: router?.query?.courseId });

  // console.log('courseContextData: ', courseContextData);
  // console.log('loading: ', loading);
  // console.log('Course Data Error: ', error);
  // console.log('isDataLoaded: ', isDataLoaded);
  // console.log('Data from api: ', courseData);
  // console.log('\n');
  useEffect(() => {
    if (courseData?.getCourse && !isDataLoaded) {
      updateCourseMaster(courseData.getCourse);

      setIsDataLoaded(true);
    }
  }, [courseData]);

  const provisionedBy = 'Zicops';
  const {
    name: courseTitle,
    benefits,
    summary,
    image,
    expertise_level: expertiseLevel,
    prequisites,
    goodFor,
    mustFor,
    category,
    sub_category: subCategory,
    duration
  } = courseContextData?.fullCourse;

  return (
    <div className={`${style.course_header}`} style={{backgroundImage: `url(${image})`, backgroundSize: 'cover'}}>
      <div className={`${style.gradient}`}>
        <Link href={`/admin/courses?courseId=${courseContextData?.fullCourse.id}`}>
          <a className={`${style.back_btn}`}>
            <img src="/images/bigarrowleft.png" alt="" />
          </a>
        </Link>

        <div className={`${style.course_header_text}`}>
          <CourseHeader
            courseTitle={courseTitle}
            provisionedBy={provisionedBy}
            category={category}
            subCategory={subCategory}
            duration={duration?.toString()}
          />

          <div className={`${style.summary}`}>
            {truncateToN(summary, 400) || (
              <Skeleton sx={{ bgcolor: 'dimgray' }} variant="text" height={70} width={500} />
            )}
          </div>
          <div className={`${style.more_info}`}>
            <Info name="Key take-aways" data={benefits?.join(', ')} />
            <Info name="Expertise Level" data={expertiseLevel?.split(',').join(' | ')} />
          </div>

          <div className={`${style.course_big_button}`}>
            <button onClick={ShowPlayer}>Preview the course</button>
          </div>
          <div className={`${style.suggested_completion}`}>
            <p>
              ** Suggested duration for completion of this course is{' '}
              {duration?.toString() || (
                <Skeleton sx={{ bgcolor: 'dimgray' }} variant="text" height={20} width={100} />
              )}
            </p>
          </div>

          <div className={`${style.more_info}`}>
            <Info name="Prerequisites" data={prequisites?.join(', ')} />
            <Info name="Good for" data={goodFor?.join(', ')} />
            <Info name="Must for" data={mustFor?.join(', ')} />
          </div>
        </div>
      </div>
    </div>
  );
}
