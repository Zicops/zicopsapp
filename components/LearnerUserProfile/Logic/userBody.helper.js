import UserAboutTab from '../UserAboutTab';
import UserCalenderTab from '../UserCalenderTab';
import UserCoursesTab from '../UserCoursesTab';
import UserLearningDashboardTab from '../UserLearningDashboardTab';
import UserCohortTab from '../UserCohortTab';

export const tabs = [
  {
    name: 'About',
    comp: <UserAboutTab />
  },
  {
    name: 'Cohort',
    comp: <UserCohortTab />
  },
  {
    name: 'Courses',
    comp: <UserCoursesTab />
  },
  { name: 'Learning Dashboard', comp: <UserLearningDashboardTab /> },
  { name: 'Calender', comp: <UserCalenderTab /> }
];
