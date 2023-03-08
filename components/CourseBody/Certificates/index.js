import Loader from '@/components/common/Loader';
import { COURSE_MAP_STATUS } from '@/helper/constants.helper';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { UserCourseDataAtom } from '@/state/atoms/video.atom';
import { courseContext } from '@/state/contexts/CourseContext';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import moment from 'moment';
import { useContext } from 'react';
import { useRecoilValue } from 'recoil';
import styles from '../courseBody.module.scss';
import ZicopsCourseCertificate from './ZicopsCourseCertificate';

export default function Certificates() {
  const { fullCourse } = useContext(courseContext);
  const userData = useRecoilValue(UserStateAtom);
  const userCourseData = useRecoilValue(UserCourseDataAtom);

  const isCourseCompleted =
    userCourseData?.userCourseMapping?.course_status !== COURSE_MAP_STATUS.completed;

  if (!userCourseData?.userCourseMapping?.course_status)
    return <Loader customStyles={{ backgroundColor: 'transparent', height: '500px' }} />;

  if (!isCourseCompleted)
    return (
      <div className={`${styles.fallBackMsg}`}>
        Certificate will be available after Course Completion
      </div>
    );

  // Dec 5, 2022 to Feb 28, 2023
  const startDate = moment(userCourseData?.userCourseMapping?.created_at * 1000).format(
    'MMM DD, YYYY'
  );
  const endDate = moment(userCourseData?.userCourseMapping?.updated_at * 1000).format(
    'MMM DD, YYYY'
  );

  const pdfProps = {
    to: `${userData?.first_name || ''} ${userData?.last_name || ''}`,
    courseName: fullCourse?.name,
    completionDate: `${startDate} to ${endDate}`
  };

  return (
    <>
      <div className={`${styles.certificate}`}>
        <PDFViewer style={{ height: '580px', width: '810px' }} showToolbar={false}>
          <ZicopsCourseCertificate {...pdfProps} />
        </PDFViewer>

        <PDFDownloadLink
          fileName={`${fullCourse?.name?.toLowerCase()?.replaceAll(' ', '-')}-certificate.pdf`}
          document={<ZicopsCourseCertificate {...pdfProps} />}
          className={styles.downloadBtn}>
          Download
        </PDFDownloadLink>
      </div>
    </>
  );
}
