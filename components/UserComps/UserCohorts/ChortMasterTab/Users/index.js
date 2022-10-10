import { GET_USERS_FOR_ADMIN, userQueryClient } from '@/api/UserQueries';
import PopUp from '@/components/common/PopUp';
import ZicopsTable from '@/components/common/ZicopsTable';
import { getUsersForAdmin } from '@/components/UserComps/Logic/getUsersForAdmin';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from '../../../userComps.module.scss';
import { getUsersForCohort } from '../Logic/cohortMaster.helper';
import useCohortUserData from '../Logic/useCohortUserData';
import AddUsers from './AddUsers';

const Users = ({ isEdit = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState([]);
  const [cohortUserData, setCohortUserData] = useState(null);
  const [refetch, setRefetch] = useState(true);

  const { getCohortUser } = useCohortUserData();

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const router = useRouter();

  useEffect(async () => {
    if (!refetch) return;

    if (!router?.query?.cohortId) {
      const users = await getUsersForCohort(true);
      if (users?.error) return setToastMsg({ type: 'danger', message: users?.error });
      return setUserData([...users]);
    }
    const cohortUser = await getCohortUser(router?.query?.cohortId);
    if (!cohortUser?.length)
      return setToastMsg({ type: 'info', message: 'None verified users found!' });
    // console.log(cohortUser,'cohort user');
    setCohortUserData([...cohortUser]);
    setRefetch(false);

    const users = await getUsersForAdmin(true);
    const notMembers = [];
    if (!users?.length) return setToastMsg({ type: 'info', message: 'None verified users found!' });
    for (let i = 0; i < users?.length; i++) {
      let found = false;
      for (let j = 0; j < cohortUser?.length; j++) {
        if (cohortUser[j]?.id === users[i]?.id) {
          found = true;
          break;
        }
      }
      if (!found) {
        notMembers.push(users[i]);
      }
    }
    setUserData([...notMembers]);
    // console.log(notMembers);
  }, [router?.query, refetch]);

  const columns = [
    {
      field: 'first_name',
      headerClassName: 'course-list-header',
      headerName: 'First Name',
      flex: 1
    },
    {
      field: 'last_name',
      headerClassName: 'course-list-header',
      headerName: 'Last Name',
      flex: 1
    },
    {
      field: 'email',
      headerName: 'Email ID',
      headerClassName: 'course-list-header',
      flex: 1
    },
    {
      field: 'role',
      headerClassName: 'course-list-header',
      headerName: 'Role in Cohort',
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
              onClick={() => {
                router.push(`/admin/user/my-users/${params.id}`);
              }}>
              <img src="/images/svg/edit-box-line.svg" width={20}></img>
            </button>
          </>
        );
      },
      flex: 0.5
    }
  ];

  return (
    <div className={`${styles.usersContainer}`}>
      <div className={`${styles.usersTopContainer}`}>
        <span>Total Users: {cohortUserData?.length}</span>
        <button
          className={`${styles.cohortButton1}`}
          onClick={() => {
            setIsOpen((prevValue) => !prevValue);
          }}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M22 22V10H26V22H38V26H26V38H22V26H10V22H22Z" fill="black" />
          </svg>
          Add Users to Cohort
        </button>
      </div>
      <ZicopsTable
        columns={columns}
        data={cohortUserData}
        // pageSize={getPageSizeBasedOnScreen()}
        // rowsPerPageOptions={[3]}
        tableHeight="49vh"
        customStyles={{ padding: '10px 0' }}
        hideFooterPagination={true}
        loading={refetch}
      />

      <PopUp popUpState={[isOpen, setIsOpen]} isFooterVisible={false}>
        <AddUsers
        cohortUsers={cohortUserData}
          usersData={userData}
          popUpSetState={setIsOpen}
          onUserAdd={() => setRefetch(true)}
        />
        {/* <LearnerStatistics /> */}
      </PopUp>
    </div>
  );
};

export default Users;
