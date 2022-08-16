import { GET_USERS_FOR_ADMIN, userQueryClient } from '@/api/UserQueries';
import EllipsisMenu from '@/common/EllipsisMenu';
import LabeledRadioCheckbox from '@/common/FormComponents/LabeledRadioCheckbox';
import ZicopsTable from '@/common/ZicopsTable';
import { getPageSizeBasedOnScreen } from '@/helper/utils.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

export default function MyUser({ getUser }) {
  const [userId, setUserId] = useState([]);
  const [data, setData] = useState([]);

  const [loadUsersData, { error: errorUserData, refetch }] = useLazyQuery(GET_USERS_FOR_ADMIN, {
    client: userQueryClient
  });

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const router = useRouter();

  useEffect(async () => {
    getUser(userId);
    const currentTime = new Date().getTime();

    const sendData = {
      publish_time: Math.floor(currentTime / 1000),
      pageCursor: '',
      pageSize: 100
    };
    const res = await loadUsersData({ variables: sendData }).catch((err) => {
      console.log(err);
      return setToastMsg({ type: 'danger', message: `${err}` });
    });
    const usersData = res?.data?.getUsersForAdmin?.users;
    if (usersData)
      var uData = usersData.map((item) => ({
        id: item?.id,
        email: item?.email,
        first_name: item?.first_name,
        last_name: item?.last_name,
        status: item?.status,
        role: item?.role
      }));
    // console.log(uData);
    return setData([...uData]);
  }, [userId]);

  const columns = [
    {
      field: 'emails',
      headerClassName: 'course-list-header',
      flex: 1,
      renderHeader: (params) => (
        <div className="center-elements-with-flex">
          <LabeledRadioCheckbox
            type="checkbox"
            isChecked={userId.length === data.length}
            changeHandler={(e) => {
              setUserId(e.target.checked ? [...data.map((row) => row.id)] : []);
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
              isChecked={userId?.includes(params.id)}
              changeHandler={(e) => {
                const userList = [...userId];

                if (e.target.checked) {
                  userList.push(params.id);
                } else {
                  const index = userList.findIndex((id) => id === params.id);
                  userList.splice(index, 1);
                }

                setUserId(userList);
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
      flex: 0.5
    },
    {
      field: 'last_name',
      headerClassName: 'course-list-header',
      headerName: 'Last Name',
      flex: 0.5
    },
    {
      field: 'role',
      headerClassName: 'course-list-header',
      headerName: 'Role',
      flex: 0.5
    },
    {
      field: 'status',
      headerClassName: 'course-list-header',
      headerName: 'Status',
      flex: 0.5
    },
    {
      field: 'action',
      headerClassName: 'course-list-header',
      headerName: 'Action',
      flex: 0.5,
      renderCell: (params) => (
        <>
          <EllipsisMenu
            buttonArr={[
              { handleClick: () => router.push(`/admin/user/my-users/${params.id}`) },
              { handleClick: () => alert(`Edit ${params.id}`) },
              { text: 'Disable', handleClick: () => alert(`Disable ${params.id}`) }
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
      />
    </>
  );
}
