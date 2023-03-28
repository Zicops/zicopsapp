import ConfirmPopUp from '@/components/common/ConfirmPopUp';
import { ADMIN_USERS } from '@/components/common/ToolTip/tooltip.helper';
import MyUser from '@/components/UserComps/MyUser';
import MyUserTable from '@/components/UserComps/MyUser/UserTable';
import { useUpdateUserAboutData } from '@/helper/hooks.helper';
import { FeatureFlagsAtom } from '@/state/atoms/global.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import AdminHeader from '../../../../components/common/AdminHeader';
import MainBody from '../../../../components/common/MainBody';
import MainBodyBox from '../../../../components/common/MainBodyBox';
import Sidebar from '../../../../components/common/Sidebar';
import { userSideBarData } from '../../../../components/common/Sidebar/Logic/sidebar.helper';

export default function MyUserPage() {
  const myUsersRef = useRef();

  const [selectedUser, setSelectedUser] = useState([]);
  const [userType, setUserType] = useState('Internal');
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [disableAlert, setDisableAlert] = useState(false);
  const userData = useRecoilValue(UserStateAtom);
  const { isDev, isDemo } = useRecoilValue(FeatureFlagsAtom);

  const { setMultiUserArr, updateMultiUserAbout, disableMultiUser, resetMultiPassword } =
    useUpdateUserAboutData();

  const btnData = [
    {
      text: 'Disable User',
      handleClick: () => {
        setDisableAlert(true);
      },
      isHidden:
        !!selectedUser?.find((users) => users?.id === userData?.id) && selectedUser?.length === 1
    },
    {
      text: 'Reset  Password',
      handleClick: async () => {
        const success = await resetMultiPassword(selectedUser);
        if (!success)
          return setToastMsg({ type: 'danger', message: 'Error while resetting password!' });

        return setToastMsg({ type: 'success', message: 'Reset password link sent successfully.' });
      }
    }
    // {
    //   text: 'Add to Cohort',
    //   handleClick: () => {
    //     console.log(selectedUser);
    //   }
    // },
    // {
    //   text: 'Add Courses',
    //   handleClick: () => {
    //     console.log(selectedUser);
    //   }
    // }
  ];

  useEffect(() => {
    // console.log(selectedUser,'cureent users');
    setMultiUserArr(selectedUser);
  }, [selectedUser]);

  return (
    <>
      <Sidebar sidebarItemsArr={userSideBarData} />
      <MainBody>
        <AdminHeader
          title="Users"
          pageRoute="/admin/user/my-users/invite"
          isAddShown={true}
          subHeaderData={{
            leftBtnData: selectedUser.length ? btnData : [],
            dropdownData: {
              label: 'User Type:',
              value: userType,
              handleChange: (e) => setUserType(e.target.value)
            }
          }}
          tooltipTitle={ADMIN_USERS.myUsers.addBtn}
        />

        <MainBodyBox>
          {isDev ? (
            <MyUserTable
              ref={myUsersRef}
              getUser={(list) => setSelectedUser(list)}
              userType={userType}
            />
          ) : (
            <MyUser ref={myUsersRef} getUser={(list) => setSelectedUser(list)} />
          )}

          {disableAlert && (
            <ConfirmPopUp
              title={`Are you sure you want to disable ${
                selectedUser?.length > 1 ? 'multiple users' : 'selected user'
              }?`}
              btnObj={{
                handleClickLeft: async () => {
                  const success = await disableMultiUser(selectedUser);
                  if (!success)
                    return setToastMsg({ type: 'danger', message: 'Error while disabling users' });
                  setSelectedUser([]);
                  myUsersRef?.current?.clearSelection();
                  setDisableAlert(false);
                  return setToastMsg({
                    type: 'success',
                    message: 'Users are successfully disable.'
                  });
                },
                handleClickRight: () => setDisableAlert(false)
              }}
            />
          )}
        </MainBodyBox>
      </MainBody>
    </>
  );
}
