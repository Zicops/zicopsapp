import CardContainer from '@/components/LearnerUserProfile/UserCoursesTab/CardContainer';
import { COURSE_STATUS } from '@/helper/constants.helper';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useHandleVendorCourses from '../Logic/useHandleVendorCourses';
import styles from './addvendor.module.scss';

export default function AddVendorCourses() {
  const [savedCourses, setSavedCourses] = useState([]);
  const [forApprovalCourses, setForApprovalCourses] = useState([]);
  const [publishedCourses, setPublishedCourses] = useState([]);

  const router = useRouter();
  const { getVendorCourses } = useHandleVendorCourses();

  useEffect(() => {
    getVendorCourses(COURSE_STATUS.save).then((courses) => setSavedCourses(courses));
    getVendorCourses(COURSE_STATUS.approvalPending).then((courses) =>
      setForApprovalCourses(courses)
    );
    getVendorCourses(COURSE_STATUS.publish).then((courses) => setPublishedCourses(courses));
  }, []);

  const courseSections = [
    {
      displayType: 'Saved Courses',
      footerType: 'adminFooter',
      data: savedCourses,
      buttonText: 'Edit',
      handleClick: (course) => router.push(`/admin/courses/${course?.id}`)
    },
    {
      displayType: 'Send For Approval Courses',
      footerType: 'adminFooter',
      buttonText: 'View',
      data: forApprovalCourses,
      handleClick: (course) => router.push(`/admin/courses/${course?.id}`)
    },
    {
      displayType: 'Published Courses',
      footerType: 'adminFooter',
      buttonText: 'View',
      data: publishedCourses,
      handleClick: (course) => router.push(`/admin/courses/${course?.id}`)
    }
  ];

  return (
    <div className={styles.vendorCourseTab}>
      {!savedCourses?.length && !forApprovalCourses?.length && !publishedCourses?.length ? (
        <div className={styles.fallback}>No Courses Added</div>
      ) : (
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
        })
      )}
    </div>
  );
}
