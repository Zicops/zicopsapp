import AdminHeader from '../../../../components/common/AdminHeader';
import MainBody from '../../../../components/common/MainBody';
import MainBodyBox from '../../../../components/common/MainBodyBox';
import Sidebar from '../../../../components/common/Sidebar';
import { userSideBarData } from '../../../../components/common/Sidebar/Logic/sidebar.helper';
import MyUser from '../../../../components/UserComps/MyUser';

export default function MyUserPage() {
  return (
    <>
      <Sidebar sidebarItemsArr={userSideBarData} />
      <MainBody>
        <AdminHeader title="Profile" pageRoute="/admin/user/my-users/invite" isAddShown={true} />

        <MainBodyBox>
          <MyUser />
        </MainBodyBox>
      </MainBody>
    </>
  );
}
