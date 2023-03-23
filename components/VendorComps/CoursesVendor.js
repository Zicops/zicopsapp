import { COURSE_STATUS } from '@/helper/constants.helper';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CardContainer from '../LearnerUserProfile/UserCoursesTab/CardContainer';
import useHandleVendorCourses from './Logic/useHandleVendorCourses';
import styles from './vendorComps.module.scss';

export default function CoursesVendor() {
  const [publishedCourses, setPublishedCourses] = useState([]);

  const router = useRouter();
  const { getVendorCourses } = useHandleVendorCourses();

  useEffect(() => {
    getVendorCourses(COURSE_STATUS.publish).then((courses) => setPublishedCourses(courses));
  }, []);

  const courseSections = [
    {
      displayType: 'Published Courses',
      footerType: 'adminFooter',
      buttonText: 'View',
      data: publishedCourses,
      handleClick: (course) => router.push(`/admin/courses/${course?.id}`)
    }
  ];

  return (
    <div>
      {!publishedCourses?.length && <div className={styles.fallback}>No Courses Added</div>}

      {!!publishedCourses?.length &&
        courseSections.map((section, index) => {
          return (
            <div key={index}>
              <CardContainer
                type={section?.displayType}
                footerType={section?.footerType}
                courseData={section?.data}
                isRemove={section?.isRemove ? section?.isRemove : false}
                handleSubmit={section?.handleClick ? section?.handleClick : () => {}}
                buttonText={section?.buttonText ? section?.buttonText : ''}
                isAdmin={true}
                customStyles={{ fontSize: '15px' }}
              />
            </div>
          );
        })}
    </div>
  );
}
