import UserAboutTab from '../UserAboutTab';
import UserCalenderTab from '../UserCalenderTab';
import UserCoursesTab from '../UserCoursesTab';
import UserLearningDashBoardTab from '../UserLearningDashBoardTab';
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
  { name: 'Learning Dashboard', comp: <UserLearningDashBoardTab /> },
  { name: 'Calender', comp: <UserCalenderTab /> }
];
