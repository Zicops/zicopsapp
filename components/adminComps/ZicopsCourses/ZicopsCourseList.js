import { useQuery } from '@apollo/client';
import Switch from '@mui/material/Switch';
import ZicopsTable from '../../common/ZicopsTable';
import { TableResponsiveRows } from '../../../helper/utils.helper';
import { useState, useEffect } from 'react';
import { GET_LATEST_COURSES, queryClient } from '../../../API/Queries';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const columns = [
  {
    field: 'name',
    headerName: 'Name',
    headerClassName: 'course-list-header',
    flex: 2
  },
  {
    field: 'owner',
    headerClassName: 'course-list-header',
    headerName: 'Owner',
    flex: 1
  },
  {
    field: 'category',
    headerClassName: 'course-list-header',
    headerName: 'Category',
    flex: 1
  },
  {
    field: 'expertise_level',
    headerClassName: 'course-list-header',
    headerName: 'Level',
    flex: 1
  },
  {
    field: 'action',
    headerClassName: 'course-list-header',
    headerName: 'Display',
    sortable: false,
    renderCell: (params) => {
      return (
        <button
          style={{ cursor: 'pointer', backgroundColor: 'transparent', outline: '0', border: '0' }}>
          <Switch {...label} defaultChecked color="success" />
        </button>
      );
    },
    flex: 0.5
  }
];

function LatestCourseList({ time }) {
  const [pageSize, setPageSize] = useState(6);

  useEffect(() => {
    const screenWidth = window.screen.width;
    console.log(screenWidth);
    TableResponsiveRows.forEach((r, i) => {
      if (r.breakpoint <= screenWidth) {
        setPageSize(r.pageSize);
      }
    });
  }, []);

  const { data } = useQuery(GET_LATEST_COURSES, {
    variables: {
      publish_time: time,
      pageSize: 50,
      pageCursor: ''
    },
    client: queryClient
  });

  let latestCourses = data?.latestCourses.courses?.filter((c) => c?.is_active);

  return (
    <ZicopsTable
      columns={columns}
      data={latestCourses}
      pageSize={pageSize}
      rowsPerPageOptions={[3]}
      tableHeight="70vh"
    />
  );
}

const ZicopsCourseList = () => {
  var time = Date.now();
  return (
    <>
      <div className="content-panel">
        <LatestCourseList time={time} />
      </div>

      <style jsx>
        {`
          .content-panel {
            margin: 30px 10px 10px 10px;
            color: var(--white);
            box-shadow: -2px 2px 10px 0 #000000, 2px -2px 5px 0 #686868;
            border-radius: 10px;
          }
        `}
      </style>
    </>
  );
};

export default ZicopsCourseList;
