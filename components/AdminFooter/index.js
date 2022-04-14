import Link from 'next/link';
import { useContext } from 'react';
import { courseContext } from '../../state/contexts/CourseContext';
import useSaveCourse from './Logic/useSaveCourse';

export default function AdminFooter() {
  const courseContextData = useContext(courseContext);
  const { fullCourse, saveCourseData, isCourseSaved, returnToMycourses } =
    useSaveCourse(courseContextData);

  return (
    <div className="content-panel">
      <div className="left-text">
        <h3>Status: {isCourseSaved ? fullCourse.status : isCourseSaved}</h3>
      </div>
      <div className="right-text">
        {fullCourse.id && (
          <Link href={`/preview?courseId=${fullCourse.id}`}>
            <a>Preview</a>
          </Link>
        )}

        <button onClick={returnToMycourses}>Cancel</button>

        <button type="submit" onClick={saveCourseData}>
          {isCourseSaved ? 'Update' : 'Save'}
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
