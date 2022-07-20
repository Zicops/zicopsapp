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

export const courseData = [
  { id: 1, title: 'React Course' },
  { id: 2, title: 'Java Course' },
  { id: 3, title: 'HTML Course' },
  { id: 4, title: 'CSS Course' },
  { id: 5, title: 'SCSS Course' },
  { id: 6, title: 'Kotlin Course' },
  { id: 7, title: 'Go Course' },
  { id: 8, title: 'Andriod Course' },
  { id: 9, title: 'IoT Course' },
  { id: 10, title: 'HTML Course' },
  { id: 11, title: 'React Course' },
  { id: 12, title: 'Java Course' },
  { id: 13, title: 'HTML Course' },
  { id: 14, title: 'CSS Course' },
  { id: 15, title: 'SCSS Course' },
  { id: 16, title: 'Kotlin Course' },
  { id: 17, title: 'Go Course' },
  { id: 18, title: 'Andriod Course' },
  { id: 19, title: 'IoT Course' },
  { id: 20, title: 'IoT Course' }
];
