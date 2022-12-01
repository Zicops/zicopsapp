import { sortArrByKeyInOrder } from '@/helper/data.helper';
import { CourseTypeAtom } from '@/state/atoms/module.atoms';
import { UsersOrganizationAtom } from '@/state/atoms/users.atom';
import { useLazyQuery } from '@apollo/client';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { GET_LATEST_COURSES, queryClient } from '../../../API/Queries';
import { getUnixFromDate, TableResponsiveRows } from '../../../helper/utils.helper';
import ZicopsTable from '../../common/ZicopsTable';

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

function MyLatestCourseList({ time, searchParam }) {
  const [pageSize, setPageSize] = useState(6);
  const courseType = useRecoilValue(CourseTypeAtom);
  const userOrgData = useRecoilValue(UsersOrganizationAtom);
  const [latestCourses, setLatestCourse] = useState([]);

  useEffect(() => {
    const screenWidth = window.screen.width;
    console.log(screenWidth);
    TableResponsiveRows.forEach((r, i) => {
      if (r.breakpoint <= screenWidth) {
        setPageSize(r.pageSize);
      }
    });
  }, []);

  useEffect(() => {
    if (!userOrgData?.lsp_id) return;

    loadMyCourses({
      variables: {
        publish_time: time,
        pageSize: 1000,
        pageCursor: '',
        filters: {
          Type: courseType,
          SearchText: searchParam,
          LspId: userOrgData?.lsp_id
        }
      }
    }).then((res) => {
      const _latestCourses = sortArrByKeyInOrder(
        res?.data?.latestCourses.courses?.filter((c) => c?.is_active),
        'created_at',
        false
      );
      setLatestCourse(_latestCourses);
    });
  }, [userOrgData?.lsp_id, searchParam]);

  const [loadMyCourses, { loading }] = useLazyQuery(GET_LATEST_COURSES, {
    client: queryClient
  });

  // let latestCourses = sortArrByKeyInOrder(
  //   data?.latestCourses.courses?.filter((c) => c?.is_active),
  //   'created_at',
  //   false
  // );

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
let debounceTimer;

const MyCourseList = () => {
  var time = getUnixFromDate();
  const [searchParam, setSearchParam] = useState('');

  function startSearch(val, delay) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      setSearchParam(val);
    }, delay);
  }

  return (
    <>
      <div className="content-panel">
        <div className="search-area">
          <select className="search" name="search">
            <option value="Name">Name</option>
            <option value="Owner" disabled>
              Owner
            </option>
            <option value="Category" disabled>
              Category
            </option>
          </select>
          <input
            className="search"
            type="text"
            placeholder="Search..."
            onChange={(e) => startSearch(e.target.value, 1000)}
          />
        </div>
        <MyLatestCourseList time={time} searchParam={searchParam} />
      </div>

      <style jsx>
        {`
          .content-panel {
            margin: 30px 10px 10px 10px;
            color: var(--white);
            box-shadow: -2px 2px 10px 0 #000000, 2px -2px 5px 0 #686868;
            border-radius: 10px;
          }
          .search-area {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding: 0 40px;
            height: 60px;
            gap: 10px;
          }
          .search {
            align: right;
            padding: 5px;
            margin-bottom: -20px;
            background-color: transparent;
            border: none;
            color: var(--dark_three);
            border-bottom: 1px solid;
          }
        `}
      </style>
    </>
  );
};

export default MyCourseList;
