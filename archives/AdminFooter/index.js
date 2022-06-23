import Link from 'next/link';
import { useContext } from 'react';
import { useRecoilValue } from 'recoil';
import { courseContext } from '../../../state/contexts/CourseContext';
import { getDateTimeFromUnix, isCourseUploadingAtom } from '../Logic/tabs.helper';
import useSaveCourse from '../Logic/useSaveCourse';
import { useRouter } from 'next/router';
import { isLoadingAtom } from '../../../state/atoms/module.atoms';

export default function AdminFooter() {
  const courseContextData = useContext(courseContext);
  const { fullCourse, saveCourseData, returnToMycourses } = useSaveCourse(courseContextData);
  const isCourseUploading = useRecoilValue(isCourseUploadingAtom);
  const isLoading = useRecoilValue(isLoadingAtom);
  const router = useRouter();

  const displayTime =
    fullCourse.updated_at || fullCourse.created_at
      ? `(at ${getDateTimeFromUnix(fullCourse.updated_at || fullCourse.created_at)})`
      : '';

  // console.log(isLoading);

  return (
    <div className="content-panel">
      <div className="left-text">
        <h3>
          Status: {isCourseUploading ? isCourseUploading : fullCourse.status}{' '}
          <span style={{ fontSize: '12px', fontWeight: '400' }}>
            {isCourseUploading ? '' : displayTime}
          </span>
        </h3>
      </div>
      <div className="right-text">
        {fullCourse.id && (
          <button
            type="submit"
            onClick={async () => {
              await saveCourseData(false);
              router.push(`/preview?courseId=${fullCourse.id}`);
            }}>
            Preview
          </button>
        )}

        <button onClick={returnToMycourses}>Cancel</button>

        <button type="submit" onClick={() => saveCourseData(false)}>
          {fullCourse.id ? 'Update' : 'Save'}
        </button>
      </div>

      {/* move style to it .scss */}
      <style jsx>{`
        .content-panel {
          margin: -75px 10px 10px 10px;
          color: var(--white);
          height: 65px;
          // box-shadow: -2px 2px 10px 0 #000000, 2px -2px 5px 0 #686868;
          background-color: #000000;
          border-radius: 0 0 10px 10px;

          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .left-text {
          margin-left: 50px;
          font-size: 14px;
        }
        .right-text {
          margin-right: 50px;
        }
        button {
          padding: 10px 20px;
          background-color: transparent;
          color: #858f8f;
          border: 1px solid var(--dark_three);
          border-radius: 50px;
          min-width: 155px;
          margin: 5px;
          font-family: 'Open Sans';
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
        }
        button:hover {
          box-shadow: 0 0 10px 0 #959595;
        }
      `}</style>
    </div>
  );
}
