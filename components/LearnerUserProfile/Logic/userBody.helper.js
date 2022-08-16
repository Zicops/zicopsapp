import UserAboutTab from '../UserAboutTab';
import UserCalenderTab from '../UserCalenderTab';
import UserCohortTab from '../UserCohortTab';
import CoursesTab from '../UserCohortTab/CohortPopUp/CoursesTab';
import DetailsTab from '../UserCohortTab/CohortPopUp/DetailsTab';
import InviteTab from '../UserCohortTab/CohortPopUp/InviteTab';
import LeaderboardTab from '../UserCohortTab/CohortPopUp/LeaderboardTab';
import MembersTab from '../UserCohortTab/CohortPopUp/MembersTab';
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
  { id: 1, name: 'React Course' },
  { id: 2, name: 'Java Course' },
  { id: 3, name: 'HTML Course' },
  { id: 4, name: 'CSS Course' },
  { id: 5, name: 'SCSS Course' },
  { id: 6, name: 'Kotlin Course' },
  { id: 7, name: 'Go Course' },
  { id: 8, name: 'Andriod Course' },
  { id: 9, name: 'IoT Course' },
  { id: 10, name: 'HTML Course' },
  { id: 11, name: 'React Course' },
  { id: 12, name: 'Java Course' },
  { id: 13, name: 'HTML Course' },
  { id: 14, name: 'CSS Course' },
  { id: 15, name: 'SCSS Course' },
  { id: 16, name: 'Kotlin Course' },
  { id: 17, name: 'Go Course' },
  { id: 18, name: 'Andriod Course' },
  { id: 19, name: 'IoT Course' },
  { id: 20, name: 'IoT Course' }
];

export const cohortData = [
  {
    id: 1,
    name: 'Design Cohort',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    joinedOn: '20:04:2022',
    isManager: true,
    isResigned: false
  },
  {
    id: 2,
    name: 'Development Cohort',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    joinedOn: '20:04:2022',
    isManager: false,
    isResigned: false
  },
  {
    id: 3,
    name: 'Business & Finance Cohort',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    joinedOn: '20:04:2022',
    isManager: false,
    isResigned: false
  },
  {
    id: 4,
    name: 'Product Management Cohort',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    joinedOn: '20:04:2022',
    isManager: false,
    isResigned: true
  }
];

export const cohortTabData = [
  { name: 'Course Master', component: <DetailsTab /> },
  { name: 'Members', component: <MembersTab /> },
  { name: 'Leaderboard', component: <LeaderboardTab /> },
  { name: 'Courses', component: <CoursesTab /> },
  { name: 'Invites', component: <InviteTab /> }
];
