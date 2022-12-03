import { userClient } from '@/api/UserMutations';
import { GET_USER_LSP_ROLES } from '@/api/UserQueries';
import EllipsisMenu from '@/common/EllipsisMenu';
import LabeledRadioCheckbox from '@/common/FormComponents/LabeledRadioCheckbox';
import ZicopsTable from '@/common/ZicopsTable';
import ConfirmPopUp from '@/components/common/ConfirmPopUp';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { USER_LSP_ROLE, USER_MAP_STATUS } from '@/helper/constants.helper';
import { sortArrByKeyInOrder } from '@/helper/data.helper';
import { getUserAboutObject, useUpdateUserAboutData } from '@/helper/hooks.helper';
import { getPageSizeBasedOnScreen, isWordIncluded } from '@/helper/utils.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { AdminLearnerListAtom, DisabledUserAtom } from '@/state/atoms/users.atom';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { getUsersForAdmin } from '../Logic/getUsersForAdmin';

export default function MyUser({ getUser, isAdministration = false, customStyle = {} }) {
  const [selectedUser, setSelectedUser] = useState([]);
  const [data, setData] = useState([]);
  const [disableAlert, setDisableAlert] = useState(false);
  const [isMakeAdminAlert, setIsMakeAdminAlert] = useState(false);
  const [disabledUserList, setDisabledUserList] = useRecoilState(DisabledUserAtom);
  const [adminLearnerList, setAdminLearnerList] = useRecoilState(AdminLearnerListAtom);
  const [currentDisabledUser, setCurrentDisabledUser] = useState(null);
  const [currentSelectedUser, setCurrentSelectedUser] = useState(null);

  const {
    newUserAboutData,
    setNewUserAboutData,
    updateAboutUser,
    updateUserLsp,
    isFormCompleted,
    updateUserRole
  } = useUpdateUserAboutData();

  const [isLoading, setLoading] = useState(true);
  const [filterCol, setFilterCol] = useState('email');
  const [searchQuery, setSearchQuery] = useState('');

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const router = useRouter();

  useEffect(async () => {
    setLoading(true);

    const _usersData = await getUsersForAdmin(true);
    if (_usersData?.error) {
      setLoading(false);
      return setToastMsg({ type: 'danger', message: `${_usersData?.error}` });
    }
    for (let i = 0; i < _usersData.length; i++) {
      const user = _usersData[i];
      const res = await loadQueryDataAsync(
        GET_USER_LSP_ROLES,
        {
          user_id: user?.id,
          user_lsp_ids: [user?.user_lsp_id]
        },
        {},
        userClient
      );
      user.role = res?.getUserLspRoles?.[0]?.role;
      user.roleData = res?.getUserLspRoles?.[0];
    }
    //make sure no user without role map is shown
    const usersData = _usersData?.filter((user) => !!user?.roleData);
    let users = [];

    if (isAdministration) {
      users = usersData?.filter((user) => user?.role?.toLowerCase() === 'admin');
      // console.log(users,'users')
    } else {
      users = [...usersData];
    }
    setLoading(false);
    setData(sortArrByKeyInOrder([...users], 'created_at', false));
    return;
  }, []);

  useEffect(() => {
    getUser(selectedUser);
  }, [selectedUser]);

  
  const columns = [
    {
      field: 'email',
      headerClassName: 'course-list-header',
      flex: 2,
      renderHeader: (params) => (
        <div className="center-elements-with-flex">
          {!isAdministration && (
            <LabeledRadioCheckbox
              type="checkbox"
              isChecked={data?.length !== 0 && selectedUser.length === data.length}
              changeHandler={(e) => {
                setSelectedUser(e.target.checked ? [...data.map((row) => row)] : []);
              }}
            />
          )}
          Email Id
        </div>
      ),
      renderCell: (params) => {
        return (
          <div className="center-elements-with-flex">
            {!isAdministration && (
              <LabeledRadioCheckbox
                type="checkbox"
                isChecked={selectedUser?.find((u) => u?.id === params.id)}
                changeHandler={(e) => {
                  const userList = [...selectedUser];

                  if (e.target.checked) {
                    userList.push(params?.row);
                  } else {
                    const index = userList.findIndex((u) => u?.id === params.id);
                    userList.splice(index, 1);
                  }

                  setSelectedUser(userList);
                }}
              />
            )}
            {params.row?.email}
          </div>
        );
      }
    },
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
      field: 'role',
      headerClassName: 'course-list-header',
      headerName: 'Role',
      flex: 0.5,
      renderCell: (params) => {
        let isLearner = false;
        let isAdmin = false;
        isAdmin = params?.row?.role?.toLowerCase() !== 'learner';
        if (adminLearnerList?.admins?.includes(params?.row?.id)) {
          isLearner = false;
          isAdmin = true;
        }
        if (adminLearnerList?.learners?.includes(params?.row?.id)) {
          isLearner = true;
          isAdmin = false;
        }

        return (
          <span style={{ textTransform: 'capitalize' }}>{isLearner?'Learner':'Admin'}</span>
        );
      }
    },
    {
      field: 'status',
      headerClassName: 'course-list-header',
      headerName: 'Status',
      flex: 0.5,
      renderCell: (params) => {
        let status = '';
        if (disabledUserList?.includes(params?.row?.id)) status = 'disable';
        const lspStatus = params?.row?.lsp_status?.toLowerCase();
        return (
          <span style={{ textTransform: 'capitalize' }}>
            {lspStatus === 'disabled' || lspStatus === 'disable' || status === 'disable'
              ? 'Disabled'
              : params?.row?.lsp_status || 'Invited'}
          </span>
        );
      }
    }
  ];
  if (!isAdministration) {
    columns.push({
      field: 'action',
      headerClassName: 'course-list-header',
      headerName: 'Action',
      flex: 0.4,
      renderCell: (params) => {
        let isLearner = false;
        let isAdmin = false;
        isAdmin = params?.row?.role?.toLowerCase() !== 'learner';

        if (adminLearnerList?.admins?.includes(params?.row?.id)) {
          isLearner = false;
          isAdmin = true;
        }
        if (adminLearnerList?.learners?.includes(params?.row?.id)) {
          isLearner = true;
          isAdmin = false;
        }

        const buttonArr = [
          { handleClick: () => router.push(`/admin/user/my-users/${params.id}`) },
          // { handleClick: () => alert(`Edit ${params.id}`) },
          {
            text: params?.row?.lsp_status === USER_MAP_STATUS.disable ? 'Enable' : 'Disable',
            handleClick: () => {
              // const status = params?.row?.status;
              const lspStatus = params?.row?.lsp_status;
              const isDisabled =
                lspStatus?.toLowerCase() === USER_MAP_STATUS.disable?.toLowerCase();
              setNewUserAboutData(
                // TODO: delete user here
                getUserAboutObject({
                  ...params.row,
                  is_active: true,
                  status: isDisabled ? USER_MAP_STATUS.activate : USER_MAP_STATUS.disable
                })
              );

              if (isDisabled) setCurrentDisabledUser(params?.row?.id);
              setDisableAlert(true);
            }
          },
          {
            text: isLearner ? 'Make Admin' : 'Demote Admin',
            handleClick: () => {
              setCurrentSelectedUser({
                ...params?.row,
                updateTo: isLearner  ? 'Admin' : 'Learner'
              });
              setIsMakeAdminAlert(true);
            }
          }
        ];

        // if(params?.row?.role?.toLowerCase() === 'learner'){
        //   buttonArr.push({text:'Demote Admin', handleClick:()=>{setIsMakeAdminAlert(true),updateUserRole(params?.row)}})
        // }
        return (
          <>
            <EllipsisMenu buttonArr={buttonArr} />
          </>
        );
      }
    });
  }
  const options = [
    { label: 'Email', value: 'email' },
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' }
  ];

  return (
    <>
      <ZicopsTable
        columns={columns}
        data={data?.filter((user) => isWordIncluded(user?.[filterCol], searchQuery))}
        pageSize={getPageSizeBasedOnScreen()}
        rowsPerPageOptions={[3]}
        tableHeight="75vh"
        loading={isLoading}
        showCustomSearch={true}
        searchProps={{
          handleOptionChange: (val) => setFilterCol(val),
          handleSearch: (val) => setSearchQuery(val),
          options,
          delayMS: 0
        }}
        customStyles={customStyle}
      />

      {disableAlert && (
        <ConfirmPopUp
          title={`Are you sure you want to ${
            newUserAboutData?.status === USER_MAP_STATUS?.disable ? 'disable' : 'enable'
          } user with email ${newUserAboutData?.email}`}
          btnObj={{
            handleClickLeft: async () => {
              const a = await updateUserLsp();
              setDisableAlert(false);
              if (a) {
                const isDisabled = newUserAboutData?.status === USER_MAP_STATUS?.disable;

                if (isDisabled) {
                  setDisabledUserList((prev) => [...prev, currentDisabledUser]);
                } else {
                  const _allDisabledUsers = structuredClone(disabledUserList);
                  const i = _allDisabledUsers?.findIndex(
                    (userId) => userId === newUserAboutData?.id
                  );
                  if (i >= 0) _allDisabledUsers.splice(i, 1);
                  setDisabledUserList(_allDisabledUsers);
                }
                setCurrentDisabledUser(null);

                const _allUsers = structuredClone(data);
                const i = _allUsers?.findIndex((user) => user?.id === newUserAboutData?.id);
                if (i >= 0) _allUsers[i].lsp_status = newUserAboutData?.status;
                setData(_allUsers);

                return setToastMsg({
                  type: 'success',
                  message: `Successfully ${isDisabled ? 'disable' : 'enable'} ${
                    newUserAboutData?.email
                  }`
                });
              }
              if (a === undefined) return;
              return setToastMsg({
                type: 'danger',
                message: `Error while disabling ${newUserAboutData?.email}`
              });
            },
            handleClickRight: () => setDisableAlert(false)
          }}
        />
      )}
      {isMakeAdminAlert && (
        <ConfirmPopUp
          title={`Are you sure you want to make ${currentSelectedUser?.email} to ${currentSelectedUser?.updateTo}`}
          btnObj={{
            handleClickLeft: async () => {
              console.log(currentSelectedUser);
              const isRoleUpdate = await updateUserRole(currentSelectedUser);
              console.log(isRoleUpdate, 'role update');
              if (!isRoleUpdate)
                return setToastMsg({
                  type: 'danger',
                  message: `Error while changing role of ${currentSelectedUser?.email}`
                });
              console.log(isRoleUpdate);
              // we will check updateTo and that key
              // first check if it is in the learner or admin
              // if updated to is admin check learner
              if (currentSelectedUser?.updateTo?.toLowerCase() === USER_LSP_ROLE?.admin) {
                let foundAt = -1;
                //checking if user is in learner atom or not, if he is in this then remove him from this and add them to admin
                const _updatedLearners = adminLearnerList?.learners?.filter((userId, index) => {
                  if (userId === isRoleUpdate?.user_id) {
                    foundAt = index;
                    return true;
                  }
                  return false;
                });
                if (foundAt >= 0) {
                  const learners = structuredClone(adminLearnerList?.learners);
                  learners?.splice(foundAt, 1);
                  console.log('1',learners);
                  setAdminLearnerList((prevValue) => ({
                    admins: [...prevValue?.admins, isRoleUpdate?.user_id],
                    learners: [...learners]
                  }));
                } else {
                  console.log('2');
                  setAdminLearnerList((prevValue) => ({
                    ...prevValue,
                    admins: [...prevValue?.admins, isRoleUpdate?.user_id]
                  }));
                }
              }
              // same thing for learner also
              if (currentSelectedUser?.updateTo?.toLowerCase() === USER_LSP_ROLE?.learner) {
                let foundAt = -1;
                const adminUsers = adminLearnerList?.admins?.filter((userId, index) => {
                  if (userId === isRoleUpdate?.user_id) {
                    foundAt = index;
                    return true;
                  }
                  return false;
                });
                if (foundAt >= 0) {
                  const admins = structuredClone(adminLearnerList?.admins);
                  admins?.splice(foundAt, 1);
                  console.log(admins,'3');
                  setAdminLearnerList((prev) => ({
                    admins: [...admins],
                    learners: [...prev?.learners, isRoleUpdate?.user_id]
                  }));
                } else {
                  console.log('4');
                  setAdminLearnerList((prev) => ({
                    ...prev,
                    learners: [...prev?.learners, isRoleUpdate?.user_id]
                  }));
                }
              }
              setCurrentSelectedUser(null);
              return setIsMakeAdminAlert(false);
            },
            handleClickRight: () => setIsMakeAdminAlert(false)
          }}
        />
      )}
    </>
  );
}
