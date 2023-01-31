import CategoryAndExpertiseAvailability from "@/components/AdminAnalyticsDashboardComp/CategoryAndExpertiseAvailability";
import AdminHeader from "@/components/common/AdminHeader";
import MainBody from "@/components/common/MainBody";
import MainBodyBox from "@/components/common/MainBodyBox";
import Sidebar from "@/components/common/Sidebar";
import { analyticsSideBarData } from "@/components/common/Sidebar/Logic/sidebar.helper";
import CategoryConsumption from "@/components/AdminAnalyticsDashboardComp/CategoryConsumption";
import CourseStatisticsAndCourseViewAnalytics from "@/components/AdminAnalyticsDashboardComp/CourseStatisticsAndCourseViewAnalytics";
import FirstFourCards from "./FirstFourCards";
import MultilingualAndMyCourseAvailability from "@/components/AdminAnalyticsDashboardComp/MultilingualAndMyCourseAvailability";

const CourseDashboard = () => {
  return (
    <>
      <Sidebar sidebarItemsArr={analyticsSideBarData} />
      <MainBody>
        <AdminHeader title={'Course Dashboard'} pageRoute="/admin/analytics/course-dashboard" />
          <MainBodyBox>
            <div style={{display:'flex', flexDirection:'column',gap:'1rem'}}>
              <FirstFourCards />
              <CategoryAndExpertiseAvailability/>
              <MultilingualAndMyCourseAvailability/>
              {/* <CategoryConsumption/> */}
              <CourseStatisticsAndCourseViewAnalytics/>
            </div>
          </MainBodyBox>
      </MainBody>
    </>
  );
};

export default CourseDashboard;
