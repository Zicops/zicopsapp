import { userClient } from '@/api/UserMutations';
import { GET_USER_LSP_ROLES } from '@/api/UserQueries';
import EllipsisMenu from '@/common/EllipsisMenu';
import LabeledRadioCheckbox from '@/common/FormComponents/LabeledRadioCheckbox';
import ZicopsTable from '@/common/ZicopsTable';
import ConfirmPopUp from '@/components/common/ConfirmPopUp';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { USER_LSP_ROLE, USER_MAP_STATUS, USER_TYPE } from '@/helper/constants.helper';
import { sortArrByKeyInOrder } from '@/helper/data.helper';
import { getUserAboutObject, useUpdateUserAboutData } from '@/helper/hooks.helper';
import { getPageSizeBasedOnScreen, isWordIncluded } from '@/helper/utils.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import {
  AdminLearnerListAtom,
  DisabledUserAtom,
  InviteUserAtom,
  UserStateAtom
} from '@/state/atoms/users.atom';
import { useRouter } from 'next/router';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import useAdminQuery, { getUsersForAdmin } from '../Logic/getUsersForAdmin';

const MyUserTable = forwardRef(
  ({ getUser, isAdministration = false, customStyle = {}, userType = USER_TYPE?.internal }, ref) => {
    const [selectedUser, setSelectedUser] = useState([]);
    const [data, setData] = useState([]);
    const [disableAlert, setDisableAlert] = useState(false);
    const [isMakeAdminAlert, setIsMakeAdminAlert] = useState(false);
    const [disabledUserList, setDisabledUserList] = useRecoilState(DisabledUserAtom);
    const [adminLearnerList, setAdminLearnerList] = useRecoilState(AdminLearnerListAtom);
    const userData = useRecoilValue(UserStateAtom);
    const [currentDisabledUser, setCurrentDisabledUser] = useState(null);
    const [currentSelectedUser, setCurrentSelectedUser] = useState(null);
    const [invitedUsers, setInvitedUsers] = useRecoilState(InviteUserAtom);

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
    const [pageCursor, setPageCursor] = useState(null);

    const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
    const router = useRouter();

    const { getLspUsers } = useAdminQuery();

    // function exposed to parent
    useImperativeHandle(ref, () => ({
      clearSelection() {
        setSelectedUser([]);
      }
    }));

    async function sortArray(arr, param) {
      const sortedArr = await arr?.sort((a, b) => a?.[`${param}`] - b?.[`${param}`]);
      return sortedArr;
    }

    useEffect(async () => {
      // loadUserData();
      const lspUsers = await getLspUsers();
      const _lspUsers = lspUsers?.filter((user) => !!user?.roleData) || [];

      const usersTableData = isAdministration
        ? _lspUsers?.filter((user) => user?.role?.toLowerCase() === USER_LSP_ROLE?.admin)
        : _lspUsers;

      setData(sortArrByKeyInOrder([...usersTableData], 'created_at', false), setLoading(false));
      return;
      const _usersData = await getUsersForAdmin(true);
      if (_usersData?.error) {
        setLoading(false);
        return setToastMsg({ type: 'danger', message: `${_usersData?.error}` });
      }
      setData(sortArrByKeyInOrder([..._usersData], 'created_at', false), setLoading(false));
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
        const lspRoleArr = res?.getUserLspRoles;

        let roleData = {};
        if (lspRoleArr?.length > 1) {
          const latestUpdatedRole = await sortArray(lspRoleArr, 'updated_at');
          roleData = latestUpdatedRole?.pop();
        } else {
          roleData = lspRoleArr[0];
        }

        user.role = roleData?.role;
        user.roleData = roleData;
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
      // setLoading(false);
      console.info(users, 'users');
      setData(sortArrByKeyInOrder([...users], 'created_at', false));
      return;
    }, []);

    useEffect(() => {
      getUser(selectedUser);
    }, [selectedUser]);

    // async function loadUserData() {
    //   setLoading(true);

    //   const lspId = sessionStorage.getItem('lsp_id');
    //   const queryVariables = { lsp_id: lspId, pageCursor: '', Direction: '', pageSize: 30 };
    //   if (pageCursor) queryVariables.pageCursor = pageCursor;

    //   loadQueryDataAsync(GET_USER_LSP_MAP_BY_LSPID, queryVariables, {}, userQueryClient).then(
    //     async (lspMapRes) => {
    //       if (lspMapRes?.error) return { error: 'Error while while loading lsp maps!' };

    //       const lspMapData = lspMapRes?.getUserLspMapsByLspId;
    //       if (lspMapData?.pageCursor) setPageCursor(lspMapData?.pageCursor);

    //       //removing duplicate values
    //       const _lspUsers = lspMapData?.user_lsp_maps?.filter(
    //         (v, i, a) => a?.findIndex((v2) => v2?.user_id === v?.user_id) === i
    //       );
    //       const _userIds = _lspUsers?.map((user) => user?.user_id)?.filter((userId) => !!userId);

    //       const userDetailsRes = await loadQueryDataAsync(
    //         GET_USER_DETAIL,
    //         { user_id: _userIds },
    //         {},
    //         userQueryClient
    //       );

    //       if (userDetailsRes?.error) return { error: 'Error while while loading user detail!' };
    //     }
    //   );

    //   setLoading(false);
    // }

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
        flex: 0.8
      },
      {
        field: 'last_name',
        headerClassName: 'course-list-header',
        headerName: 'Last Name',
        flex: 0.8
      },
      {
        field: 'role',
        headerClassName: 'course-list-header',
        headerName: 'Role',
        flex: 0.5,
        renderCell: (params) => {
          return <span style={{ textTransform: 'capitalize' }}>{params?.row?.role}</span>;
        }
      },
      {
        field: 'status',
        headerClassName: 'course-list-header',
        headerName: 'Status',
        flex: 0.5,
        renderCell: (params) => {
          let status = '';
          // let lspStatus = '';
          if (disabledUserList?.includes(params?.row?.id)) status = USER_MAP_STATUS?.disable;
          if (invitedUsers?.includes(params?.row?.id)) status = 'invited';

          let lspStatus = !status?.length ? params?.row?.lsp_status : status;

          return (
            <span style={{ textTransform: 'capitalize' }}>
              {lspStatus?.trim()?.length ? lspStatus : 'Invited'}
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
        flex: 0.5,
        renderCell: (params) => {
          let status = '';
          if (disabledUserList?.includes(params?.row?.id)) status = 'disable';
          let _lspStatus = params?.row?.lsp_status;
          if (status === 'disable') {
            _lspStatus = USER_MAP_STATUS.disable;
          }

          let isLearner = false;
          let isAdmin = false;
          isAdmin = params?.row?.role?.toLowerCase() !== 'learner';
          isLearner = !isAdmin;

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
            {
              text: _lspStatus === USER_MAP_STATUS.disable ? 'Enable' : 'Disable',
              handleClick: () => {
                const lspStatus = _lspStatus;
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
              },
              isDisabled: userData?.id === params.id
            },
            {
              text:
                params?.row?.role?.toLowerCase() !== USER_LSP_ROLE?.admin
                  ? 'Make Admin'
                  : 'Demote Admin',
              handleClick: () => {
                let isLearner = params?.row?.role?.toLowerCase() !== USER_LSP_ROLE?.admin;
                setCurrentSelectedUser({
                  ...params?.row,
                  updateTo: isLearner ? 'Admin' : 'Learner'
                });
                setIsMakeAdminAlert(true);
              },
              isDisabled: userData?.id === params.id
            }
          ];

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
          data={data?.filter(
            (user) =>
              isWordIncluded(user?.[filterCol], searchQuery) &&
              user?.type?.toLowerCase() === userType?.toLowerCase()
          )}
          pageSize={getPageSizeBasedOnScreen()}
          rowsPerPageOptions={[3]}
          tableHeight="70vh"
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
                const isRoleUpdate = await updateUserRole(currentSelectedUser);
                if (!isRoleUpdate)
                  return setToastMsg({
                    type: 'danger',
                    message: `Error while changing role of ${currentSelectedUser?.email}`
                  });

                setData((prev) => {
                  const _data = structuredClone(prev);
                  const index = _data?.findIndex((user) => user?.id === currentSelectedUser?.id);
                  if (index >= 0) _data[index].role = currentSelectedUser?.updateTo;
                  return _data;
                });
                // if (currentSelectedUser?.updateTo?.toLowerCase() === USER_LSP_ROLE?.admin) {
                //   const _updatedList = adminLearnerList?.learners?.filter((userId) => {
                //     return userId !== isRoleUpdate?.user_id;
                //   });

                //   setAdminLearnerList((prevValue) => ({
                //     admins: [...prevValue?.admins, isRoleUpdate?.user_id],
                //     learners: [..._updatedList]
                //   }));
                // }

                // // same thing for learner also
                // if (currentSelectedUser?.updateTo?.toLowerCase() === USER_LSP_ROLE?.learner) {
                //   const _updatedList = adminLearnerList?.admins?.filter((userId) => {
                //     return userId !== isRoleUpdate?.user_id;
                //   });
                //   setAdminLearnerList((prevValue) => ({
                //     admins: [..._updatedList],
                //     learners: [...prevValue?.learners, isRoleUpdate?.user_id]
                //   }));
                // }
                setToastMsg({
                  type: 'success',
                  message: `Changed ${currentSelectedUser?.email} role successfully.`
                });
                setCurrentSelectedUser(null);
                return setIsMakeAdminAlert(false);
              },
              handleClickRight: () => {
                setCurrentSelectedUser(null);
                setIsMakeAdminAlert(false);
              }
            }}
          />
        )}
      </>
    );
  }
);

export default MyUserTable;
