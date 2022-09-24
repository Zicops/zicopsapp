import { GET_USERS_FOR_ADMIN, userQueryClient } from '@/api/UserQueries';
import PopUp from '@/components/common/PopUp';
import ToolTip from '@/components/common/ToolTip';
import { ADMIN_USERS } from '@/components/common/ToolTip/tooltip.helper';
import ZicopsTable from '@/components/common/ZicopsTable';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { useEffect, useState } from 'react';
import styles from '../../../userComps.module.scss';
import AddUsers from './AddUsers';

const data = [
  {
    id: 'uniwfcno3wo1oe31u9qdj',
    email: 'abc@zicops.com',
    firstName: 'ABC',
    lastName: 'DEF',
    role: 'Learner',
    status: 'Invited'
  },
  {
    id: 2,
    email: 'abc@zicops.com',
    firstName: 'ABC',
    lastName: 'DEF',
    role: 'Learner',
    status: 'Invited'
  },
  {
    id: 3,
    email: 'abc@zicops.com',
    firstName: 'ABC',
    lastName: 'DEF',
    role: 'Learner',
    status: 'Invited'
  },
  {
    id: 4,
    email: 'abc@zicops.com',
    firstName: 'ABC',
    lastName: 'DEF',
    role: 'Learner',
    status: 'Invited'
  },
  {
    id: 5,
    email: 'abc@zicops.com',
    firstName: 'ABC',
    lastName: 'DEF',
    role: 'Learner',
    status: 'Invited'
  },
  {
    id: 6,
    email: 'abc@zicops.com',
    firstName: 'ABC',
    lastName: 'DEF',
    role: 'Learner',
    status: 'Invited'
  },
  {
    id: 7,
    email: 'abc@zicops.com',
    firstName: 'ABC',
    lastName: 'DEF',
    role: 'Learner',
    status: 'Invited'
  },
  {
    id: 8,
    email: 'abc@zicops.com',
    firstName: 'ABC',
    lastName: 'DEF',
    role: 'Learner',
    status: 'Invited'
  },
  {
    id: 9,
    email: 'abc@zicops.com',
    firstName: 'ABC',
    lastName: 'DEF',
    role: 'Learner',
    status: 'Invited'
  },
  {
    id: 64,
    email: 'abc@zicops.com',
    firstName: 'ABC',
    lastName: 'DEF',
    role: 'Learner',
    status: 'Invited'
  },
  {
    id: 27,
    email: 'abc@zicops.com',
    firstName: 'ABC',
    lastName: 'DEF',
    role: 'Learner',
    status: 'Invited'
  },
  {
    id: 85,
    email: 'abc@zicops.com',
    firstName: 'ABC',
    lastName: 'DEF',
    role: 'Learner',
    status: 'Invited'
  }
];

const Users = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState([]);

  useEffect(async () => {
    const currentTime = new Date().getTime();
    const sendData = {
      publish_time: Math.floor(currentTime / 1000),
      pageCursor: '',
      pageSize: 100
    };
    const resUserData = await loadQueryDataAsync(
      GET_USERS_FOR_ADMIN,
      { ...sendData },
      {},
      userQueryClient
    );
    const users = resUserData?.getUsersForAdmin?.users;
    // console.log(users);
    if (users?.length) return setUserData([...users]);
  }, []);

  const columns = [
    {
      field: 'firstName',
      headerClassName: 'course-list-header',
      headerName: 'First Name',
      flex: 1
    },
    {
      field: 'lastName',
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
            <ToolTip title={ADMIN_USERS.userCohort.users.editBtn}>
              <button
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
                <img src="/images/svg/edit-box-line.svg" width={20}></img>
              </button>
            </ToolTip>
          </>
        );
      },
      flex: 0.5
    }
  ];

  return (
    <div className={`${styles.usersContainer}`}>
      <div className={`${styles.usersTopContainer}`}>
        <span>Total Users:{data.length}</span>
        <ToolTip title={ADMIN_USERS.userCohort.users.addUserToCohort}>
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
        </ToolTip>
      </div>
      <ZicopsTable
        columns={columns}
        data={data}
        // pageSize={getPageSizeBasedOnScreen()}
        // rowsPerPageOptions={[3]}
        tableHeight="49vh"
        customStyles={{ padding: '10px 0' }}
        hideFooterPagination={true}
      />

      <PopUp popUpState={[isOpen, setIsOpen]} isFooterVisible={false}>
        <AddUsers usersData={userData} />
        {/* <LearnerStatistics /> */}
      </PopUp>
    </div>
  );
};

export default Users;
