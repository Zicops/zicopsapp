import EllipsisMenu from '@/common/EllipsisMenu';
import LabeledRadioCheckbox from '@/common/FormComponents/LabeledRadioCheckbox';
import ZicopsTable from '@/common/ZicopsTable';
import ConfirmPopUp from '@/components/common/ConfirmPopUp';
import { USER_STATUS } from '@/helper/constants.helper';
import { getUserAboutObject, useUpdateUserAboutData } from '@/helper/hooks.helper';
import { getPageSizeBasedOnScreen } from '@/helper/utils.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { getUsersForAdmin } from '../Logic/getUsersForAdmin';

export default function MyUser({ getUser }) {
  const [selectedUser, setSelectedUser] = useState([]);
  const [data, setData] = useState([]);
  const [disableAlert, setDisableAlert] = useState(false);

  const { newUserAboutData, setNewUserAboutData, updateAboutUser, isFormCompleted } =
    useUpdateUserAboutData();

  const [isLoading, setLoading] = useState(true);

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const router = useRouter();

  useEffect(async () => {
    setLoading(true);

    const usersData = await getUsersForAdmin();
    console.log(usersData);

    if (usersData?.error) {
      setLoading(false);
      return setToastMsg({ type: 'danger', message: `${usersData?.error}` });
    }
    setLoading(false);
    setData([...usersData]);
    return;
  }, []);

  useEffect(() => {
    getUser(selectedUser);
  }, [selectedUser]);

  const columns = [
    {
      field: 'emails',
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
        return <>{params?.row?.status || 'Invited'}</>;
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
                  setNewUserAboutData(
                    getUserAboutObject({
                      ...params.row,
                      is_active: false,
                      status: USER_STATUS.disable
                    })
                  );
                  setDisableAlert(true);
                }
              }
            ]}
          />
        </>
      )
    }
  ];

  return (
    <>
      <ZicopsTable
        columns={columns}
        data={data}
        pageSize={getPageSizeBasedOnScreen()}
        rowsPerPageOptions={[3]}
        tableHeight="75vh"
        loading={isLoading}
      />

      {disableAlert && (
        <ConfirmPopUp
          title={`Are you sure you want to disable user with email ${newUserAboutData?.email}`}
          btnObj={{
            handleClickLeft: async () => {
              await updateAboutUser();
              setDisableAlert(false);
            },
            handleClickRight: () => setDisableAlert(false)
          }}
        />
      )}
    </>
  );
}
