import { GET_USERS_FOR_ADMIN, userQueryClient } from '@/api/UserQueries';
import ConfirmPopUp from '@/components/common/ConfirmPopUp';
import PopUp from '@/components/common/PopUp';
import ToolTip from '@/components/common/ToolTip';
import { ADMIN_USERS } from '@/components/common/ToolTip/tooltip.helper';
import ZicopsTable from '@/components/common/ZicopsTable';
import { getUsersForAdmin } from '@/components/UserComps/Logic/getUsersForAdmin';
import { loadQueryDataAsync, sendEmail, sendNotification } from '@/helper/api.helper';
import { getNotificationMsg } from '@/helper/common.helper';
import { NOTIFICATION_TITLES } from '@/helper/constants.helper';
import { FcmTokenAtom } from '@/state/atoms/notification.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { CohortMasterData } from '@/state/atoms/users.atom';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styles from '../../../userComps.module.scss';
import addUserData from '../Logic/addUserData';
import { getUsersForCohort } from '../Logic/cohortMaster.helper';
import useCohortUserData from '../Logic/useCohortUserData';

import AddUsers from './AddUsers';

const Users = ({ isEdit = false, isReadOnly = false }) => {
  const fcmToken = useRecoilValue(FcmTokenAtom);

  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState([]);
  const [cohortUserData, setCohortUserData] = useState(null);
  const [refetch, setRefetch] = useState(true);
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const [loading, setLoading] = useState(false);

  const [cohortData, setCohortData] = useRecoilState(CohortMasterData);
  const { removeCohortUser } = addUserData();
  const [selectedUser, setSelectedUser] = useState(null);

  const { getCohortUser } = useCohortUserData();

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const router = useRouter();

  useEffect(async () => {
    if (!refetch) return;

    if (!router?.query?.cohortId && !cohortData?.id) {
      // const users = await getUsersForAdmin(true);
      // if (users?.error) return setToastMsg({ type: 'danger', message: users?.error });
      return setCohortUserData([], setRefetch(false));
      return setUserData([...users]);
    }
    if (!router?.query?.cohortId && cohortData?.id) {
      setLoading(true);
      const users = await getUsersForAdmin(true);
      const cohortUser = await getCohortUser(cohortData?.id);
      if (!cohortUser?.length) return setToastMsg({ type: 'info', message: 'No users found!' });
      const _nonMembers = users?.filter(
        ({ id: id1 }) => !cohortUser?.some(({ id: id2 }) => id1 === id2)
      );
      setUserData([..._nonMembers], setLoading(false));
      return setCohortUserData([...cohortUser], setRefetch(false));
      // setRefetch(false);
    }
    setLoading(true);
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
        if (
          cohortUser[j]?.id === users[i]?.id &&
          cohortUser[j]?.membership_status?.toLowerCase() === 'active'
        ) {
          found = true;
          break;
        }
      }
      if (!found) {
        notMembers.push(users[i]);
      }
    }
    setUserData([...notMembers], setLoading(false));
    // console.log(notMembers);
  }, [router?.query, refetch]);

  async function handleRemoveUser(userData = null, cohortData = null) {
    if (!userData) return setToastMsg({ type: 'danger', message: 'User Data not found!' });
    if (!cohortData) return setToastMsg({ type: 'danger', message: 'Cohort Data not found!' });
    setLoading(true);
    // const cohortSize = cohortData?.size ;
    let cohortSize;
    if (cohortUserData?.length) cohortSize = cohortUserData?.length;
    // console.log(cohortSize,'cohrotSIsfiasbf');
    const isRemoved = await removeCohortUser(userData, cohortData, cohortSize);
    // console.log(a,'adds');
    if (!isRemoved)
      return setToastMsg({ type: 'danger', message: 'Error while removing user from cohort!' });
    setToastMsg({ type: 'success', message: 'User removed succesfully!' });
    const notificationBody = getNotificationMsg('cohortUnassign', {
      cohortName: cohortData?.cohort_name
    });
    if (!notificationBody)
      setToastMsg({ type: 'danger', message: 'Error while sending notification' });

    const bodyData = {
      user_name: userData?.first_name,
      lsp_name: sessionStorage?.getItem('lsp_name'),
      cohort_name: cohortData?.cohort_name
    };
    const sendEmailBody = {
      to: [userData?.email],
      sender_name: sessionStorage?.getItem('lsp_name'),
      user_name: [userData?.first_name],
      body: JSON.stringify(bodyData),
      template_id: EMAIL_TEMPLATE_IDS?.cohortUnassign
    };
    // await sendNotification(
    //   {
    //     title: NOTIFICATION_TITLES?.cohortUnassign,
    //     body: notificationBody,
    //     user_id: [userData?.user_id]
    //   },
    //   { context: { headers: { 'fcm-token': fcmToken || sessionStorage.getItem('fcm-token') } } }
    // );
    await sendEmail(sendEmailBody, {
      context: { headers: { 'fcm-token': fcmToken || sessionStorage.getItem('fcm-token') } }
    });
    setLoading(false);
    setRefetch(true);
    setShowConfirmBox(false);
    return;
  }
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
            <ToolTip title={ADMIN_USERS.userCohort.users.editBtn}>
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
            </ToolTip>
            {!isReadOnly && (
              <button
                style={{
                  cursor: 'pointer',
                  backgroundColor: 'transparent',
                  outline: '0',
                  border: '0'
                }}
                onClick={async () => {
                  // router.push(`/admin/user/my-users/${params.id}`);
                  // console.log(params?.row , cohortData)

                  // const isRemoved = await removeCohortUser(params?.row , cohortData);
                  setSelectedUser(params?.row);
                  setShowConfirmBox(true);
                  // handleRemoveUser(params?.row , cohortData);
                }}>
                <img src="/images/svg/delete-outline.svg" width={20}></img>
              </button>
            )}
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
        {!isReadOnly && (
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
        )}
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
          loading={loading}
        />
        {/* <LearnerStatistics /> */}
      </PopUp>
      {showConfirmBox && (
        <ConfirmPopUp
          title={'Are you sure you want to remove this user from cohort?'}
          btnObj={{
            leftIsDisable: loading,
            rightIsDisable: loading,
            handleClickLeft: () => handleRemoveUser(selectedUser, cohortData),
            handleClickRight: () => setShowConfirmBox(false)
          }}
        />
      )}
    </div>
  );
};

export default Users;
