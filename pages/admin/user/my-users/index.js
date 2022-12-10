import ConfirmPopUp from '@/components/common/ConfirmPopUp';
import { ADMIN_USERS } from '@/components/common/ToolTip/tooltip.helper';
import { useUpdateUserAboutData } from '@/helper/hooks.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import AdminHeader from '../../../../components/common/AdminHeader';
import MainBody from '../../../../components/common/MainBody';
import MainBodyBox from '../../../../components/common/MainBodyBox';
import Sidebar from '../../../../components/common/Sidebar';
import { userSideBarData } from '../../../../components/common/Sidebar/Logic/sidebar.helper';
import MyUser from '../../../../components/UserComps/MyUser';

export default function MyUserPage() {
  const [selectedUser, setSelectedUser] = useState([]);
  const [userType, setUserType] = useState('Internal');
  const [toastMsg , setToastMsg] = useRecoilState(ToastMsgAtom);
  const [disableAlert , setDisableAlert] = useState(false);

  const { setMultiUserArr, updateMultiUserAbout , disableMultiUser , resetMultiPassword } = useUpdateUserAboutData();

  const btnData = [
    {
      text: 'Disable User',
      handleClick: ()=>{
        setDisableAlert(true);
      }
    },
    {
      text: 'Reset  Password',
      handleClick: async() => {
        const success = await resetMultiPassword(selectedUser);
        if(!success) return setToastMsg({type:'danger',message:'Error while resetting password!'});
        return setToastMsg({type:'success',message:'Password resetted successfully.'})
      }
    },
    {
      text: 'Add to Cohort',
      handleClick: () => {
        console.log(selectedUser);
      }
    },
    {
      text: 'Add Courses',
      handleClick: () => {
        console.log(selectedUser);
      }
    }
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
          title="Profile"
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
          <MyUser getUser={(list) => setSelectedUser(list)} />
          {disableAlert && (
        <ConfirmPopUp
          title={`Are you sure you want to disable multiple users?`}
          btnObj={{
            handleClickLeft:async()=> {
              const success = await disableMultiUser(selectedUser);
              // console.log(success);
              if(!success) return setToastMsg({type:'danger',message:'Error while disabling users'});
              setSelectedUser([]);
              setDisableAlert(false);
              return setToastMsg({type:'success',message:'Users are successfully disable.'});
            },
            handleClickRight: () => setDisableAlert(false)
          }
          }
        />
      )}
        </MainBodyBox>
      </MainBody>
    </>
  );
}
