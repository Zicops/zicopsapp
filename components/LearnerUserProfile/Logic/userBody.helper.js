import { USER_LSP_ROLE } from '@/helper/constants.helper';
import UserAboutTab from '../UserAboutTab';
import UserCohortTab from '../UserCohortTab';
import CoursesTab from '../UserCohortTab/CohortPopUp/CoursesTab';
import DetailsTab from '../UserCohortTab/CohortPopUp/DetailsTab';
import InviteTab from '../UserCohortTab/CohortPopUp/InviteTab';
import LeaderboardTab from '../UserCohortTab/CohortPopUp/LeaderboardTab';
import MembersTab from '../UserCohortTab/CohortPopUp/MembersTab';
import UserCoursesTab from '../UserCoursesTab';
import UserLearningDashBoardTab from '../UserLearningDashBoardTab';
import UserScheduleTab from '../UserScheduleTab';

export const tabs = [
  {
    name: 'About',
    comp: <UserAboutTab />,
    roleAccess: [USER_LSP_ROLE.admin, USER_LSP_ROLE.vendor]
  },
  { name: 'Cohort', comp: <UserCohortTab /> },
  { name: 'Courses', comp: <UserCoursesTab /> },
  { name: 'Dashboard', comp: <UserLearningDashBoardTab />, isDemo: true },
  { name: 'Schedule', comp: <UserScheduleTab /> }
];

export const courseData = [
  {
    id: 1,
    name: 'React Course',
    title: 'React Course',
    category: 'Development',
    subCategory: 'JAVA',
    level: 'Competent',
    footerType: 'completed'
  },
  {
    id: 2,
    name: 'Java Course',
    title: 'Java Course',
    category: 'Development',
    subCategory: 'JAVA',
    level: 'Competent',
    footerType: 'completed'
  },
  {
    id: 3,
    name: 'HTML Course',
    title: 'HTML Course',
    category: 'Development',
    subCategory: 'JAVA',
    level: 'Competent',
    footerType: 'onGoing'
  },
  {
    id: 4,
    name: 'CSS Course',
    title: 'CSS Course',
    category: 'Development',
    subCategory: 'JAVA',
    level: 'Competent',
    footerType: 'onGoing'
  },
  {
    id: 5,
    name: 'SCSS Course',
    title: 'SCSS Course',
    category: 'Development',
    subCategory: 'JAVA',
    level: 'Competent',
    footerType: 'completed'
  },
  {
    id: 6,
    name: 'Kotlin Course',
    title: 'Kotlin Course',
    category: 'Development',
    subCategory: 'JAVA',
    level: 'Competent',
    footerType: 'completed'
  },
  {
    id: 7,
    name: 'Go Course',
    title: 'Go Course',
    category: 'Development',
    subCategory: 'JAVA',
    level: 'Competent',
    footerType: 'completed'
  }
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
  { name: 'Details', component: <DetailsTab /> },
  { name: 'Members', component: <MembersTab /> },
  { name: 'Leaderboard', component: <LeaderboardTab /> },
  { name: 'Courses', component: <CoursesTab /> },
  { name: 'Invites', component: <InviteTab /> }
];
export const memberTabData = [
  {
    id: 1,
    name: 'Devansh Kumar',
    description: 'Tata Consultancy Services',
    designation: 'Product Manager',
    joinedOn: '20:04:2022',
    isManager: true,
    isMember: false
  },
  {
    id: 2,
    name: 'Kumar Vasu',
    description: 'Tata Consultancy Services',
    designation: 'Product Manager',
    joinedOn: '20:04:2022',
    isManager: false,
    isMember: true
  },
  {
    id: 3,
    name: 'Lisa Menon',
    description: 'Tata Consultancy Services',
    designation: 'Product Manager',
    joinedOn: '20:04:2022',
    isManager: false,
    isMember: true
  },
  {
    id: 4,
    name: 'Deepika Rajput',
    description: 'Tata Consultancy Services',
    designation: 'Product Manager',
    joinedOn: '20:04:2022',
    isManager: false,
    isMember: true
  },
  {
    id: 5,
    name: 'Kumar Vasu',
    description: 'Tata Consultancy Services',
    designation: 'Product Manager',
    joinedOn: '20:04:2022',
    isManager: false,
    isMember: true
  },
  {
    id: 6,
    name: 'Lisa Menon',
    description: 'Tata Consultancy Services',
    designation: 'Product Manager',
    joinedOn: '20:04:2022',
    isManager: false,
    isMember: true
  },
  {
    id: 7,
    name: 'Deepika Rajput',
    description: 'Tata Consultancy Services',
    designation: 'Product Manager',
    joinedOn: '20:04:2022',
    isManager: false,
    isMember: true
  }
];
export const inviteTabData = [
  {
    id: 1,
    firstName: 'Joy',
    lastName: 'Joy',
    emailId: 'abc@gmail.com'
  },
  {
    id: 2,
    firstName: 'Abhishek',
    lastName: 'Ghosh',
    emailId: 'xyz@gmail.com'
  },
  {
    id: 3,
    firstName: 'Ankit',
    lastName: 'Joy',
    emailId: 'pqr@gmail.com'
  },
  {
    id: 4,
    firstName: 'Sonali',
    lastName: 'Sonali',
    emailId: 'stu@gmail.com'
  },
  {
    id: 5,
    firstName: 'Lorem',
    lastName: 'Ipsum',
    emailId: 'efg@gmail.com'
  },

  {
    id: 6,
    firstName: 'Demo',
    lastName: 'Zicops',
    emailId: 'hij@gmail.com'
  },
  {
    id: 7,
    firstName: 'Vajresh',
    lastName: 'Joy',
    emailId: 'lmn@gmail.com'
  }
];
