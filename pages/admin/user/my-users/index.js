import { useUpdateUserAboutData } from '@/helper/hooks.helper';
import { useEffect, useState } from 'react';
import AdminHeader from '../../../../components/common/AdminHeader';
import MainBody from '../../../../components/common/MainBody';
import MainBodyBox from '../../../../components/common/MainBodyBox';
import Sidebar from '../../../../components/common/Sidebar';
import { userSideBarData } from '../../../../components/common/Sidebar/Logic/sidebar.helper';
import MyUser from '../../../../components/UserComps/MyUser';

export default function MyUserPage() {
  const [selectedUser, setSelectedUser] = useState([]);
  const [userType, setUserType] = useState('Internal');

  const { setMultiUserArr, updateMultiUserAbout } = useUpdateUserAboutData();

  const btnData = [
    {
      text: 'Disable User',
      handleClick: () => {
        console.log(selectedUser);
        updateMultiUserAbout();
      }
    },
    {
      text: 'Reset  Password',
      handleClick: () => {
        console.log(selectedUser);
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
    console.log(selectedUser);
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
        />

        <MainBodyBox>
          <MyUser getUser={(list) => setSelectedUser(list)} />
        </MainBodyBox>
      </MainBody>
    </>
  );
}
