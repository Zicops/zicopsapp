import { GET_COHORT_MAINS, userQueryClient } from '@/api/UserQueries';
import ToolTip from '@/components/common/ToolTip';
import { ADMIN_USERS } from '@/components/common/ToolTip/tooltip.helper';
import ZicopsTable from '@/components/common/ZicopsTable';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { getCurrentEpochTime } from '@/helper/common.helper';
import { sortArrByKeyInOrder } from '@/helper/data.helper';
import { isWordIncluded } from '@/helper/utils.helper';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { UsersOrganizationAtom } from '@/state/atoms/users.atom';


const UserCohorts = () => {
  const { viewBtn, editBtn, downloadBtn } = ADMIN_USERS.userCohort;
  const [cohortList, setCohortList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const [userOrgData , setUserOrgData] = useRecoilState(UsersOrganizationAtom);

  useEffect(async () => {
    const lspId = sessionStorage.getItem('lsp_id');
    const _lspId = userOrgData?.lsp_id ? userOrgData?.lsp_id : lspId;
    const sendData = {
      lsp_id: _lspId,
      publish_time: getCurrentEpochTime(),
      pageCursor: '',
      pageSize: 100
      // ,searchText: searchQuery
    };
    const resCohortData = await loadQueryDataAsync(
      GET_COHORT_MAINS,
      { ...sendData },
      {},
      userQueryClient
    );
    const data = resCohortData?.getCohortMains?.cohorts;
    if (!data) return setLoading(false);
    const list = data.map((item) => {
      // console.log(item);
      return { ...item, id: item?.cohort_id };
    });
    const cohorts = list?.filter((item) => item?.is_active);
    setCohortList(sortArrByKeyInOrder([...cohorts], 'created_at', false), setLoading(false));
    // }, [searchQuery]);
  }, []);

  const columns = [
    {
      field: 'name',
      headerClassName: 'course-list-header',
      headerName: 'Cohort Name',
      flex: 1
    },
    {
      field: 'code',
      headerClassName: 'course-list-header',
      headerName: 'Cohort code',
      flex: 1
    },
    {
      field: 'size',
      headerName: 'Size',
      headerClassName: 'course-list-header',
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
            <ToolTip title={viewBtn}>
              <button
                style={{
                  cursor: 'pointer',
                  backgroundColor: 'transparent',
                  outline: '0',
                  border: '0'
                }}
                onClick={() => {
                  router.push(router.asPath + `/view-cohort/${params?.row?.id}`);
                }}>
                <img src="/images/svg/eye-line.svg" width={20}></img>
              </button>
            </ToolTip>
            <ToolTip title={editBtn}>
              <button
                style={{
                  cursor: 'pointer',
                  backgroundColor: 'transparent',
                  outline: '0',
                  border: '0'
                }}
                onClick={() => {
                  router.push(router.asPath + `/${params?.row?.id}`);
                }}>
                <img src="/images/svg/edit-box-line.svg" width={20}></img>
              </button>
            </ToolTip>
            {/* <button
              style={{
                cursor: 'pointer',
                backgroundColor: 'transparent',
                outline: '0',
                border: '0'
              }}
              // onClick={() => {
              //   setSelectedQB(getQuestionBankObject(params.row));
              //   setEditPopUp(true);
              // }}
            >
              <img src="/images/svg/download-white.svg" width={20}></img>
            </button> */}
          </>
        );
      },
      flex: 0.5
    }
  ];
  return (
    <>
      {/* <CohortMasterTab /> */}
      <ZicopsTable
        columns={columns}
        data={cohortList?.filter((cohort) => isWordIncluded(cohort?.name, searchQuery))}
        tableHeight="70vh"
        hideFooterPagination={true}
        loading={loading}
        showCustomSearch={true}
        searchProps={{
          handleSearch: (val) => setSearchQuery(val),
          delayMS: 0
        }}
      />
    </>
  );
};

export default UserCohorts;
