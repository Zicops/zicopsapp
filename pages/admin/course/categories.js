import Sidebar from '../../../components/common/Sidebar';
import ZicopsCatsList from '../../../components/adminComps/ZicopsCourses/ZicopsCatsList';
import { courseSidebarData } from '../../../components/common/Sidebar/Logic/sidebar.helper';

const Admin = () => {
  return (
    <div>
      <Sidebar sidebarItemsArr={courseSidebarData} />
      <ZicopsCatsList />
    </div>
  );
};

export default Admin;
