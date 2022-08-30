import { STATUS } from '@/state/atoms/utils.atoms';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { courseContext } from '../../state/contexts/CourseContext';
import Button from '../common/Button';
import TabContainer from '../common/TabContainer';
import styles from './courseTabs.module.scss';
import {
  CourseTabAtom,
  getDateTimeFromUnix,
  isCourseUploadingAtom,
  tabData
} from './Logic/tabs.helper';
import useSaveCourse from './Logic/useSaveCourse';

export default function CourseTabs() {
  const courseContextData = useContext(courseContext);

  const { fullCourse, saveCourseData } = useSaveCourse(courseContextData);
  const router = useRouter();

  const [tab, setTab] = useRecoilState(CourseTabAtom);
  const isCourseUploading = useRecoilValue(isCourseUploadingAtom);

  // TODO: set to first tab when new course is opened
  // useEffect(() => {
  //   console.log(router);
  //   setTab(tabData[0].name);
  // }, [fullCourse?.id]);

  const displayTime =
    fullCourse.updated_at || fullCourse.created_at
      ? `(at ${getDateTimeFromUnix(fullCourse.updated_at || fullCourse.created_at)})`
      : '';

  return (
    <>
      <TabContainer
        tabData={tabData}
        tab={tab}
        setTab={setTab}
        footerObj={{
          status: isCourseUploading ? (
            isCourseUploading
          ) : (
            <>
              {fullCourse.status || STATUS.display[0]}{' '}
              <span style={{ fontSize: '12px', fontWeight: '400' }}>
                {isCourseUploading ? '' : displayTime}
              </span>
            </>
          ),
          submitDisplay: fullCourse.id ? 'Update' : 'Save',
          disableSubmit: !!isCourseUploading,
          handleSubmit: () => saveCourseData(false),
          cancelDisplay: 'Cancel',
          handleCancel: () => router.push('/admin/course/my-courses')
        }}>
        {fullCourse.id && (
          <div className={`${styles.previewButtonContainer}`}>
            <Button
              clickHandler={async () => {
                await saveCourseData(false, 0, false);
                router.push(`/preview?courseId=${fullCourse.id}`);
              }}
              text="Preview"
            />
          </div>
        )}
      </TabContainer>
    </>
  );
}
