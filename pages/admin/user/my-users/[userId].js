import AdminHeader from '../../../../components/common/AdminHeader';
import MainBody from '../../../../components/common/MainBody';
import MainBodyBox from '../../../../components/common/MainBodyBox';
import Sidebar from '../../../../components/common/Sidebar';
import { userSideBarData } from '../../../../components/common/Sidebar/Logic/sidebar.helper';

export default function userProfilePage() {
  return (
    <>
      <Sidebar sidebarItemsArr={userSideBarData} />
      <MainBody>
        <AdminHeader
          title={
            <div>
              <img src="" alt="" />
              <div>
                <p>Name</p>
                <p>Description</p>
              </div>
            </div>
          }
        //   subHeaderData={{
        //     leftBtnData: userIds.length ? btnData : [],
        //     dropdownData: {
        //       label: 'User Type:',
        //       value: userType,
        //       handleChange: (e) => setUserType(e.target.value)
        //     }
        //   }}
        />

        <MainBodyBox>User Profile</MainBodyBox>
      </MainBody>
    </>
  );
}
