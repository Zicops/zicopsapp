import ZicopsCarousel from '@/components/ZicopsCarousel';
import { COURSE_STATUS } from '@/helper/constants.helper';
import { useEffect, useState } from 'react';
import useHandleVendorCourses from '../Logic/useHandleVendorCourses';
import styles from './addvendor.module.scss';

const skeletonCardCount = 5;

export default function AddVendorCourses() {
  const [savedCourses, setSavedCourses] = useState([...Array(skeletonCardCount)]);
  const [forApprovalCourses, setForApprovalCourses] = useState([...Array(skeletonCardCount)]);
  const [publishedCourses, setPublishedCourses] = useState([...Array(skeletonCardCount)]);

  const { getVendorCourses } = useHandleVendorCourses();

  useEffect(() => {
    getVendorCourses(COURSE_STATUS.save).then((courses) => setSavedCourses(courses));
    getVendorCourses(COURSE_STATUS.approvalPending).then((courses) =>
      setForApprovalCourses(courses)
    );
    getVendorCourses(COURSE_STATUS.publish).then((courses) => setPublishedCourses(courses));
  }, []);

  return (
    <div>
      {!savedCourses?.length && !forApprovalCourses?.length && !publishedCourses?.length && (
        <div className={styles.fallback}>No Courses Added</div>
      )}
      {!!savedCourses?.length && (
        <ZicopsCarousel title="Saved Courses" type="small" data={savedCourses} />
      )}
      {!!forApprovalCourses?.length && (
        <ZicopsCarousel title="Send For Approval Courses" type="small" data={forApprovalCourses} />
      )}
      {!!publishedCourses?.length && (
        <ZicopsCarousel title="Published Courses" type="small" data={publishedCourses} />
      )}
    </div>
  );
}
