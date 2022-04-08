import CourseDetails from '../../CourseDetails';
import CourseAbout from '../CourseAbout';
import CourseConfiguration from '../../CourseConfiguration';
import CourseMaster from '../CourseMaster';
import CourseTopics from '../../CourseTopics';

export const tabData = [
  {
    name: 'Course Master',
    component: <CourseMaster />
  },
  {
    name: 'Details',
    component: <CourseDetails />
  },
  {
    name: 'About',
    component: <CourseAbout />
  },
  {
    name: 'Topics',
    component: <CourseTopics />
  },
  {
    name: 'Configuration',
    component: <CourseConfiguration />
  }
];
