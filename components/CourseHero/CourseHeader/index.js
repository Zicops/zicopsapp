import { Skeleton } from '@mui/material';
import style from './courseHeader.module.scss';

export default function CourseHeader({
  courseTitle,
  provisionedBy,
  category,
  subCategory,
  duration
}) {
  return (
    <div className={`${style.heading} row`}>
      <div className="col_75">
        <h1>
          {courseTitle || (
            <Skeleton sx={{ bgcolor: 'dimgray' }} variant="text" height={50} width={400} />
          )}
          {/* This is a big title that can be too big to displat byt we still have to sidplay it anyhow. */}
        </h1>
        {provisionedBy ? (
          <p>
            This course is provisioned by <span>{provisionedBy}</span>
          </p>
        ) : (
          <Skeleton sx={{ bgcolor: 'dimgray' }} variant="text" height={20} width={100} />
        )}

        <ul>
          <li>
            {category || (
              <Skeleton sx={{ bgcolor: 'dimgray' }} variant="text" height={20} width={100} />
            )}
          </li>
          <li>
            {subCategory || (
              <Skeleton sx={{ bgcolor: 'dimgray' }} variant="text" height={20} width={100} />
            )}
          </li>
          <li>
            Duration:{' '}
            {duration || (
              <Skeleton sx={{ bgcolor: 'dimgray' }} variant="text" height={20} width={50} />
            )}{' '}
            mins
          </li>
        </ul>
      </div>
      <div className="icons col_25"></div>
    </div>
  );
}
