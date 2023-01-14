import AdminHeader from "@/components/common/AdminHeader";
import MainBody from "@/components/common/MainBody";
import MainBodyBox from "@/components/common/MainBodyBox";
import Sidebar from "@/components/common/Sidebar";
import { analyticsSideBarData } from "@/components/common/Sidebar/Logic/sidebar.helper";

const CourseDashboard = () => {
  return (
    <>
      <Sidebar sidebarItemsArr={analyticsSideBarData} />
      <MainBody>
        <AdminHeader title={'Course Dashboard'} pageRoute="/admin/analytics/course-dashboard" />
              <MainBodyBox>
                  
        </MainBodyBox>
      </MainBody>
    </>
  );
};

export default CourseDashboard;
