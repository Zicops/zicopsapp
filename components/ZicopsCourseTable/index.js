import { useQuery } from '@apollo/client';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { GET_LATEST_COURSES, queryClient } from '../../API/Queries';
import { getQueryData } from '../../helper/api.helper';
import CourseHead from '../CourseHead';
import { columns } from './Logic/zicopsCourseTable.helper';

export default function ZicopsCourseTable() {
  const { data } = useQuery(GET_LATEST_COURSES, {
    variables: {
      publish_time: Date.now(),
      pageSize: 50,
      pageCursor: ''
    },
    client: queryClient
  });
  let data1 = data?.latestCourses.courses;

  return (
    <>
      <div className="content-panel">{data1 && <DataGrid columns={columns} rows={data1} />}</div>

      {/* move to .scss */}
      <style jsx>
        {`
          .content-panel {
            margin: 30px 10px 10px 10px;
            color: var(--white);
            height: 475px;
            box-shadow: -2px 2px 10px 0 #000000, 2px -2px 5px 0 #686868;
            border-radius: 10px;
          }
        `}
      </style>
    </>
  );
}
