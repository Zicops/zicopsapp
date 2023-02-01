import CategoryAndExpertiseAvailability from '@/components/AdminAnalyticsDashboardComp/CategoryAndExpertiseAvailability';
import CategoryConsumption from '@/components/AdminAnalyticsDashboardComp/CategoryConsumption';
import CourseStatisticsAndCourseViewAnalytics from '@/components/AdminAnalyticsDashboardComp/CourseStatisticsAndCourseViewAnalytics';
import FirstFourCards from '@/components/AdminAnalyticsDashboardComp/FirstFourCards';
import MultilingualAndMyCourseAvailability from '@/components/AdminAnalyticsDashboardComp/MultilingualAndMyCourseAvailability';
import AdminHeader from '@/components/common/AdminHeader';
import MainBody from '@/components/common/MainBody';
import Sidebar from '@/components/common/Sidebar';
import { analyticsSideBarData } from '@/components/common/Sidebar/Logic/sidebar.helper';
import useHandleFirstFourCard from './Logic/useHandleFirstFourCard';

const CourseDashboard = () => {
  const cardData = useHandleFirstFourCard();
  return (
    <>
      <Sidebar sidebarItemsArr={analyticsSideBarData} />
      <MainBody>
        <AdminHeader title={'Course Dashboard'} pageRoute="/admin/analytics/course-dashboard" />
        {/* <MainBodyBox> */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '50px 0' }}>
          <FirstFourCards cardData={cardData} />
          <CategoryAndExpertiseAvailability />
          <MultilingualAndMyCourseAvailability />
          {/* <CategoryConsumption /> */}
          <CourseStatisticsAndCourseViewAnalytics />
        </div>
        {/* </MainBodyBox> */}
      </MainBody>
    </>
  );
};

export default CourseDashboard;
