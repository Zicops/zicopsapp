import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { courseContext } from '../../state/contexts/CourseContext';
import TabContainer from '../common/TabContainer';
import TabFooterButton from '../common/TabContainer/TabFooterButton';
import { CourseTabAtom, getDateTimeFromUnix, isCourseUploadingAtom } from './Logic/tabs.helper';
import useHandleTabs from './Logic/useHandleTabs';
import useSaveCourse from './Logic/useSaveCourse';
import styles from './courseTabs.module.scss';

export default function CourseTabs() {
  const courseContextData = useContext(courseContext);
  const { tabData } = useHandleTabs(courseContextData);

  const { fullCourse, saveCourseData } = useSaveCourse(courseContextData);
  const router = useRouter();

  const [tab, setTab] = useRecoilState(CourseTabAtom);
  const isCourseUploading = useRecoilValue(isCourseUploadingAtom);

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
              {fullCourse.status}{' '}
              <span style={{ fontSize: '12px', fontWeight: '400' }}>
                {isCourseUploading ? '' : displayTime}
              </span>
            </>
          ),
          submitDisplay: fullCourse.id ? 'Update' : 'Save',
          handleSubmit: () => saveCourseData(false),
          cancelDisplay: 'Cancel',
          handleCancel: () => router.push('/admin/zicops-courses')
        }}>
        {fullCourse.id && (
          <div className={`${styles.previewButtonContainer}`}>
            <TabFooterButton
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
