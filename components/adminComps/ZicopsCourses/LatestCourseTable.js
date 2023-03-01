// components\adminComps\ZicopsCourses\LatestCourseTable.js

import { GET_MY_COURSES, queryClient } from '@/api/Queries';
import { GET_USER_VENDORS, userQueryClient } from '@/api/UserQueries';
import ZicopsTable from '@/components/common/ZicopsTable';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { COURSE_STATUS, USER_LSP_ROLE } from '@/helper/constants.helper';
import { sortArrByKeyInOrder } from '@/helper/data.helper';
import { getPageSizeBasedOnScreen, getUnixFromDate } from '@/helper/utils.helper';
import { FeatureFlagsAtom } from '@/state/atoms/global.atom';
import { CourseTypeAtom } from '@/state/atoms/module.atoms';
import { UsersOrganizationAtom, UserStateAtom } from '@/state/atoms/users.atom';
import { useLazyQuery } from '@apollo/client';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

export default function LatestCourseTable({ isEditable = false, zicopsLspId = null }) {
  const [loadMyCourses, { loading }] = useLazyQuery(GET_MY_COURSES, {
    client: queryClient
  });

  const courseType = useRecoilValue(CourseTypeAtom);
  const userData = useRecoilValue(UserStateAtom);
  const userOrgData = useRecoilValue(UsersOrganizationAtom);
  const { isDemo } = useRecoilValue(FeatureFlagsAtom);

  const [latestCourses, setLatestCourse] = useState([]);
  const [courseStatus, setCourseStatus] = useState(COURSE_STATUS.save);
  const [searchParam, setSearchParam] = useState('');

  useEffect(async () => {
    if (!userOrgData?.lsp_id) return;
    const time = getUnixFromDate();

    const courseFiltes = {
      Type: courseType,
      SearchText: searchParam?.trim(),
      LspId: zicopsLspId || userOrgData?.lsp_id
    };

    if (userOrgData.user_lsp_role?.toLowerCase()?.includes(USER_LSP_ROLE.vendor)) {
      const vendorDetail = await loadQueryDataAsync(
        GET_USER_VENDORS,
        { user_id: userData?.id },
        {},
        userQueryClient
      );
      courseFiltes.Owner = vendorDetail?.getUserVendor?.[0]?.name;
      // courseFiltes.Publisher = vendorDetail?.getUserVendor?.[0]?.name;
    }

    loadMyCourses({
      variables: {
        publish_time: time,
        pageSize: 1000,
        pageCursor: '',
        status: zicopsLspId ? COURSE_STATUS.publish : courseStatus,
        filters: courseFiltes
      }
    }).then((res) => {
      const _latestCourses = sortArrByKeyInOrder(
        res?.data?.latestCourses?.courses?.filter((c) => c?.is_active),
        'created_at',
        false
      );
      setLatestCourse(_latestCourses);
    });
  }, [userOrgData?.lsp_id, searchParam, courseStatus, zicopsLspId, courseType]);

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
              style={{
                cursor: 'pointer',
                backgroundColor: 'transparent',
                outline: '0',
                border: '0'
              }}
              onClick={() => Router.push(`/preview?courseId=${params.row.id}`)}>
              <img src="/images/svg/eye-line.svg" width={20}></img>
            </button>
            {isEditable ? (
              <button
                style={{
                  cursor: 'pointer',
                  backgroundColor: 'transparent',
                  outline: '0',
                  border: '0'
                }}
                onClick={() => Router.push(`/admin/courses/${params.row.id}`)}>
                <img src="/images/svg/edit-box-line.svg" width={20}></img>
              </button>
            ) : (
              <></>
              // <button
              //   style={{
              //     cursor: 'pointer',
              //     backgroundColor: 'transparent',
              //     outline: '0',
              //     border: '0'
              //   }}>
              //   <Switch
              //     inputProps={{ 'aria-label': 'Switch demo' }}
              //     defaultChecked
              //     color="success"
              //   />
              // </button>
            )}
          </>
        );
      },
      flex: 0.5
    }
  ];

  const filterOptions = [
    { label: 'Saved', value: COURSE_STATUS.save },
    { label: 'For Approval', value: COURSE_STATUS.approvalPending },
    { label: 'Published', value: COURSE_STATUS.publish }
  ];

  if (zicopsLspId == null) {
    filterOptions.push({ label: 'Expired', value: COURSE_STATUS.reject });
  }

  return (
    <>
      <ZicopsTable
        columns={columns}
        data={latestCourses}
        pageSize={getPageSizeBasedOnScreen()}
        rowsPerPageOptions={[3]}
        tableHeight="70vh"
        loading={loading}
        showCustomSearch={true}
        searchProps={{
          options: [
            { label: 'Name', value: 'Name' },
            { label: 'Owner', value: 'Owner', isDisabled: true },
            { label: 'Category', value: 'Category', isDisabled: true }
          ],
          handleSearch: (val) => setSearchParam(val),
          filterOptions: !zicopsLspId ? filterOptions : [],
          handleFilterOptionChange: setCourseStatus,
          selectedFilter: courseStatus,
          filterDisplayText: 'Filter By Status'
        }}
      />
    </>
  );
}
