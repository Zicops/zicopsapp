import { Skeleton } from '@mui/material';
import { truncateToN } from '../../../helper/common.helper';

import style from './courseHeader.module.scss';

export default function CourseHeader({
  courseTitle,
  provisionedBy,
  category,
  subCategory,
  duration,
  isLoading,
  isCourseAssigned,
  handleAssign,
  isPreview
}) {
  return (
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

        {isLoading ? (
          <Skeleton sx={{ bgcolor: 'dimgray' }} variant="text" height={20} width={300} />
        ) : provisionedBy ? (
          <p>
            This course is provisioned by <span>{provisionedBy}</span>
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

      <div className="icons col_25">
        {!isPreview && (
          <>
            {isCourseAssigned ? (
              <img height={20} alt="" src="/images/svg/folder-primary.svg" />
            ) : (
              <img
                style={{ cursor: 'pointer' }}
                src="/images/plus.png"
                height={20}
                alt=""
                onClick={handleAssign}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
