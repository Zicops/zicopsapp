import { useQuery } from '@apollo/client';
import Router from 'next/router';
import ZicopsTable from '../../common/ZicopsTable';
import { TableResponsiveRows } from '../../../helper/utils.helper';
import { useState, useEffect } from 'react';
import { GET_LATEST_COURSES, queryClient } from '../../../API/Queries';
import ToolTip from '@/components/common/ToolTip';
import { ADMIN_COURSES } from '@/components/common/ToolTip/tooltip.helper';
import { useRecoilValue } from 'recoil';
import { CourseTypeAtom } from '@/state/atoms/module.atoms';

const columns = [
  {
    field: 'name',
    headerName: 'Name',
    headerClassName: 'course-list-header',
    flex: 1.5
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
    headerName: 'Action',
    sortable: false,
    renderCell: (params) => {
      return (
        <>
          <button
            style={{ cursor: 'pointer', backgroundColor: 'transparent', outline: '0', border: '0' }}
            onClick={() => Router.push(`/preview?courseId=${params.row.id}`)}>
            <img src="/images/svg/eye-line.svg" width={20}></img>
          </button>
          <button
            style={{ cursor: 'pointer', backgroundColor: 'transparent', outline: '0', border: '0' }}
            onClick={() => editCourse(params.row.id)}>
            <img src="/images/svg/edit-box-line.svg" width={20}></img>
          </button>
        </>
      );
    },
    flex: 0.5
  }
];

function editCourse(courseId) {
  Router.push(`/admin/courses/${courseId}`);
}

function MyLatestCourseList({ time }) {
  const [pageSize, setPageSize] = useState(6);
  const courseType = useRecoilValue(CourseTypeAtom);

  useEffect(() => {
    const screenWidth = window.screen.width;
    console.log(screenWidth);
    TableResponsiveRows.forEach((r, i) => {
      if (r.breakpoint <= screenWidth) {
        setPageSize(r.pageSize);
      }
    });
  }, []);

  const { data, loading } = useQuery(GET_LATEST_COURSES, {
    variables: {
      publish_time: time,
      pageSize: 999999,
      pageCursor: '',
      filters: {
        Type: courseType
      }
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
      loading={loading}
    />
  );
}

const MyCourseList = () => {
  var time = Date.now();
  return (
    <>
      <div className="content-panel">
        <MyLatestCourseList time={time} />
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

export default MyCourseList;
