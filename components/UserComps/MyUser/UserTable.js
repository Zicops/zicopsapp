import EllipsisMenu from '@/common/EllipsisMenu';
import LabeledRadioCheckbox from '@/common/FormComponents/LabeledRadioCheckbox';
import ZicopsTable from '@/common/ZicopsTable';
import ConfirmPopUp from '@/components/common/ConfirmPopUp';
import { USER_LSP_ROLE, USER_MAP_STATUS, USER_TYPE } from '@/helper/constants.helper';
import { sortArrByKeyInOrder } from '@/helper/data.helper';
import { getUserAboutObject, useUpdateUserAboutData } from '@/helper/hooks.helper';
import { getPageSizeBasedOnScreen, isWordIncluded } from '@/helper/utils.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { useRouter } from 'next/router';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import useAdminQuery from '../Logic/getUsersForAdmin';

const MyUserTable = forwardRef(
  (
    { getUser, isAdministration = false, customStyle = {}, userType = USER_TYPE?.internal },
    ref
  ) => {
    const [selectedUser, setSelectedUser] = useState([]);
    const [data, setData] = useState([]);
    const [disableAlert, setDisableAlert] = useState(false);
    const [isMakeAdminAlert, setIsMakeAdminAlert] = useState(false);
    const userData = useRecoilValue(UserStateAtom);
    const [currentSelectedUser, setCurrentSelectedUser] = useState(null);

    const { newUserAboutData, setNewUserAboutData, updateUserLsp, updateUserRole } =
      useUpdateUserAboutData();

    const [isLoading, setLoading] = useState(true);
    const [filterCol, setFilterCol] = useState('email');
    const [searchQuery, setSearchQuery] = useState('');
    const [pageCursor, setPageCursor] = useState(null);

    const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
    const router = useRouter();

    const { getLspUsers , getLspUsersByType} = useAdminQuery();

    // function exposed to parent
    useImperativeHandle(ref, () => ({
      clearSelection() {
        setData((prevUsers) => {
          const _data = structuredClone(prevUsers);
          selectedUser.forEach((disableUser) => {
            const index = _data?.findIndex((user) => disableUser?.id === user?.id);
            if (index >= 0 && disableUser?.id !== userData?.id)
              _data[index].lsp_status = USER_MAP_STATUS?.disable;
          });
          return _data;
        });
        setSelectedUser([]);
      }
    }));

    useEffect(async () => {
      // loadUserData();
      const lspUsers = await getLspUsers();
      // const users = await getLspUsersByType();
      // console.log(users,'ss');
      const _lspUsers = lspUsers?.filter((user) => !!user?.roleData) || [];

      const usersTableData = isAdministration
        ? _lspUsers?.filter((user) => user?.role?.toLowerCase() === USER_LSP_ROLE?.admin)
        : _lspUsers;

      setData(sortArrByKeyInOrder([...usersTableData], 'created_at', false), setLoading(false));
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
          let _lspStatus = params?.row?.lsp_status;
          return (
            <span style={{ textTransform: 'capitalize' }}>
              {_lspStatus?.trim()?.length ? _lspStatus : 'Invited'}
            </span>
          );
        }
      }
    ];
    if (!isAdministration && userType?.toLowerCase() === USER_TYPE?.internal) {
      columns.push({
        field: 'action',
        headerClassName: 'course-list-header',
        headerName: 'Action',
        flex: 0.5,
        renderCell: (params) => {
          let _lspStatus = params?.row?.lsp_status;
          const buttonArr = [
            { handleClick: () => router.push(`/admin/user/my-users/${params.id}`) },
            {
              text: _lspStatus === USER_MAP_STATUS.disable ? 'Enable' : 'Disable',
              handleClick: () => {
                const isDisabled =
                  _lspStatus?.toLowerCase() === USER_MAP_STATUS.disable?.toLowerCase();
                setNewUserAboutData(
                  // TODO: delete user here
                  getUserAboutObject({
                    ...params.row,
                    is_active: true,
                    status: isDisabled ? USER_MAP_STATUS.activate : USER_MAP_STATUS.disable
                  })
                );
                setCurrentSelectedUser(params?.row);
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
                  setData((prevUsers) => {
                    const _data = structuredClone(prevUsers);
                    const index = _data?.findIndex((user) => user?.id === currentSelectedUser?.id);
                    if (index >= 0) _data[index].lsp_status = newUserAboutData?.status;
                    return _data;
                  });

                  setCurrentSelectedUser(null);

                  let isDisabled = newUserAboutData?.status === USER_MAP_STATUS?.disable;

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
              handleClickRight: () => {
                setCurrentSelectedUser(null);
                setDisableAlert(false);
              }
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
