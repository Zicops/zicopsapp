import { useState } from 'react';
import AdminHeader from '../../../../components/common/AdminHeader';
import MainBody from '../../../../components/common/MainBody';
import MainBodyBox from '../../../../components/common/MainBodyBox';
import Sidebar from '../../../../components/common/Sidebar';
import { userSideBarData } from '../../../../components/common/Sidebar/Logic/sidebar.helper';
import MyUser from '../../../../components/UserComps/MyUser';

export default function MyUserPage() {
  const [userIds, setUserIds] = useState([]);
  const [userType, setUserType] = useState('Internal');

  const btnData = [
    {
      text: 'Disable User',
      handleClick: () => {
        console.log(userIds);
      }
    },
    {
      text: 'Reset  Password',
      handleClick: () => {
        console.log(userIds);
      }
    },
    {
      text: 'Add to Cohort',
      handleClick: () => {
        console.log(userIds);
      }
    },
    {
      text: 'Add Courses',
      handleClick: () => {
        console.log(userIds);
      }
    }
  ];

  return (
    <>
      <Sidebar sidebarItemsArr={userSideBarData} />
      <MainBody>
        <AdminHeader
          title="Profile"
          pageRoute="/admin/user/my-users/invite"
          isAddShown={true}
          subHeaderData={{
            leftBtnData: userIds.length ? btnData : [],
            dropdownData: {
              label: 'User Type:',
              value: userType,
              handleChange: (e) => setUserType(e.target.value)
            }
          }}
        />

        <MainBodyBox>
          <MyUser getUser={(list) => setUserIds(list)} />
        </MainBodyBox>
      </MainBody>
    </>
  );
}
