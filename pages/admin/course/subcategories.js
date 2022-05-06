import Sidebar from '../../../components/common/Sidebar';
import ZicopsSubcatsList from '../../../components/adminComps/ZicopsCourses/ZicopsSubcatsList';
import { courseSidebarData } from '../../../components/common/Sidebar/Logic/sidebar.helper';

const Admin = () => {
  return (
    <div>
      <Sidebar sidebarItemsArr={courseSidebarData} />
      <ZicopsSubcatsList />
    </div>
  );
};

export default Admin;
