import { Skeleton } from '@mui/material';
import { truncateToN } from '../../../helper/common.helper';

import style from './courseHeader.module.scss';

export default function CourseHeader({
  courseTitle,
  provisionedBy,
  publishedBy,
  category,
  subCategory,
  duration,
  isLoading,
  isCourseAssigned,
  isCourseUnassign,
  handleUnAssign,
  handleAssign,
  isPreview
}) {
  return (
    <>
      <div className={`${style.heading} row`}>
        <div className="col_75">
          <h1>
            {isLoading ? (
              <Skeleton sx={{ bgcolor: 'dimgray' }} variant="text" height={50} width={400} />
            ) : courseTitle ? (
              truncateToN(courseTitle, 55)
            ) : (
              'N/A'
            )}

            {/* This is a big title that can be too big to displat byt we still have to sidplay it anyhow. */}
          </h1>
        </div>

        <div className={`icons col_25 ${style.assignCourseBtn}`}>
          {!isPreview && (
            <div
              tooltip={
                isCourseAssigned ? 'Course is assigned to you' : 'Assign this course to yourself'
              }
              flow="down">
              <img
                style={{ cursor: 'pointer' }}
                src={isCourseAssigned ? '/images/svg/folder-primary.svg' : '/images/plus.png'}
                height={20}
                alt=""
                onClick={() => (isCourseAssigned ? {} : handleAssign())}
              />
            </div>
          )}
          {/* </div>
      <div className={`icons col_25 ${style.assignCourseBtn}`}> */}
          {isCourseUnassign && (
            <div tooltip={'Unassign this course'} flow="down">
              <img
                style={{ cursor: 'pointer' }}
                src={'/images/svg/cross.svg'}
                height={20}
                alt=""
                onClick={() => handleUnAssign()}
              />
            </div>
          )}
        </div>
      </div>
      <div className={`${style.heading}`}>
        {isLoading ? (
          <Skeleton sx={{ bgcolor: 'dimgray' }} variant="text" height={20} width={300} />
        ) : provisionedBy ? (
          <p>
            This course is provisioned by <span>{provisionedBy}</span> and published by{' '}
            <span>{publishedBy}</span>
          </p>
        ) : (
          'N/A'
        )}

        <ul>
          <li>
            {isLoading ? (
              <Skeleton sx={{ bgcolor: 'dimgray' }} variant="text" height={20} width={100} />
            ) : category ? (
              category
            ) : (
              'N/A'
            )}
          </li>
          <li>
            {isLoading ? (
              <Skeleton sx={{ bgcolor: 'dimgray' }} variant="text" height={20} width={100} />
            ) : subCategory ? (
              subCategory
            ) : (
              'N/A'
            )}
          </li>
          <li>
            {isLoading ? (
              <Skeleton sx={{ bgcolor: 'dimgray' }} variant="text" height={20} width={100} />
            ) : subCategory ? (
              `Duration: ${duration} mins`
            ) : (
              'N/A'
            )}
          </li>
        </ul>
      </div>
    </>
  );
}
