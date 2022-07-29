import UserAboutTab from '../UserAboutTab';
import UserCalenderTab from '../UserCalenderTab';
import UserCohortTab from '../UserCohortTab';
import DetailsTab from '../UserCohortTab/CohortPopUp/DetailsTab';
import UserCoursesTab from '../UserCoursesTab';
import UserLearningDashBoardTab from '../UserLearningDashBoardTab';

export const tabs = [
  { name: 'About', comp: <UserAboutTab /> },
  { name: 'Cohort', comp: <UserCohortTab /> },
  { name: 'Courses', comp: <UserCoursesTab /> },
  { name: 'Dashboard', comp: <UserLearningDashBoardTab /> },
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

export const cohortData = [
  {
    id: 1,
    title: 'Design Cohort',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    joinedOn: '20:04:2022',
    isManager: true,
    isResigned: false
  },
  {
    id: 2,
    title: 'Development Cohort',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    joinedOn: '20:04:2022',
    isManager: false,
    isResigned: false
  },
  {
    id: 3,
    title: 'Business & Finance Cohort',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    joinedOn: '20:04:2022',
    isManager: false,
    isResigned: false
  },
  {
    id: 4,
    title: 'Product Management Cohort',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    joinedOn: '20:04:2022',
    isManager: false,
    isResigned: true
  }
];

export const cohortTabData = [
  {
    name: 'Course Master',
    component: <DetailsTab />
  },
  {
    name: 'Details',
    component: <DetailsTab />
  },
  {
    name: 'About',
    component: <DetailsTab />
  },
  {
    name: 'Topics',
    component: <DetailsTab />
  },
  {
    name: 'Configuration',
    component: <DetailsTab />
  }
];
