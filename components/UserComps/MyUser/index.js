import EllipsisMenu from '@/common/EllipsisMenu';
import LabeledRadioCheckbox from '@/common/FormComponents/LabeledRadioCheckbox';
import ZicopsTable from '@/common/ZicopsTable';
import ConfirmPopUp from '@/components/common/ConfirmPopUp';
import { USER_STATUS } from '@/helper/constants.helper';
import { sortArrByKeyInOrder } from '@/helper/data.helper';
import { getUserAboutObject, useUpdateUserAboutData } from '@/helper/hooks.helper';
import { getPageSizeBasedOnScreen, isWordIncluded } from '@/helper/utils.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { DisabledUserAtom } from '@/state/atoms/users.atom';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { getUsersForAdmin } from '../Logic/getUsersForAdmin';

export default function MyUser({ getUser }) {
  const [selectedUser, setSelectedUser] = useState([]);
  const [data, setData] = useState([]);
  const [disableAlert, setDisableAlert] = useState(false);
  const [disabledUserList, setDisabledUserList] = useRecoilState(DisabledUserAtom);
  const [currentDisabledUser, setCurrentDisabledUser] = useState(null);

  const { newUserAboutData, setNewUserAboutData, updateAboutUser, updateUserLsp, isFormCompleted } =
    useUpdateUserAboutData();

  const [isLoading, setLoading] = useState(true);
  const [filterCol, setFilterCol] = useState('email');
  const [searchQuery, setSearchQuery] = useState('');

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const router = useRouter();

  useEffect(async () => {
    setLoading(true);

    const usersData = await getUsersForAdmin(true);
    console.log(usersData);

    if (usersData?.error) {
      setLoading(false);
      return setToastMsg({ type: 'danger', message: `${usersData?.error}` });
    }
    setLoading(false);
    setData(sortArrByKeyInOrder([...usersData], 'created_at', false));
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
          <LabeledRadioCheckbox
            type="checkbox"
            isChecked={data?.length !== 0 && selectedUser.length === data.length}
            changeHandler={(e) => {
              setSelectedUser(e.target.checked ? [...data.map((row) => row)] : []);
            }}
          />
          Email Id
        </div>
      ),
      renderCell: (params) => {
        return (
          <div className="center-elements-with-flex">
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
        return <>{params?.row?.role || 'Learner'}</>;
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
          <>
            {lspStatus === 'disabled' || lspStatus === 'disable' || status === 'disable'
              ? 'Disabled'
              : params?.row?.status || 'Invited'}
          </>
        );
      }
    },
    {
      field: 'action',
      headerClassName: 'course-list-header',
      headerName: 'Action',
      flex: 0.4,
      renderCell: (params) => (
        <>
          <EllipsisMenu
            buttonArr={[
              { handleClick: () => router.push(`/admin/user/my-users/${params.id}`) },
              // { handleClick: () => alert(`Edit ${params.id}`) },
              {
                text: 'Disable',
                handleClick: () => {
                  // const status = params?.row?.status;
                  const lspStatus = params?.row?.lsp_status;
                  // console.log(status,'status',lspStatus)
                  setNewUserAboutData(
                    // TODO: delete user here
                    getUserAboutObject({
                      ...params.row,
                      is_active: true,
                      status: lspStatus?.length ? USER_STATUS.disable : 'Active'
                    })
                  );
                  setCurrentDisabledUser(params?.row?.id);
                  setDisableAlert(true);
                }
              }
            ]}
          />
        </>
      )
    }
  ];

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
      />

      {disableAlert && (
        <ConfirmPopUp
          title={`Are you sure you want to disable user with email ${newUserAboutData?.email}`}
          btnObj={{
            handleClickLeft: async () => {
              const a = await updateUserLsp();
              setDisableAlert(false);
              if (a) {
                setDisabledUserList((prev) => [...prev, currentDisabledUser]);
                setCurrentDisabledUser(null);
                return setToastMsg({
                  type: 'success',
                  message: `Successfully disabled ${newUserAboutData?.email}`
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
    </>
  );
}
