import CourseDetails from '../../CourseDetails';
import CourseAbout from '../CourseAbout';
import CourseConfiguration from '../../CourseConfiguration';
import CourseMaster from '../CourseMaster';
import CourseTopic from '../../CourseTopic';

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
    component: <CourseTopic /> // this is new
  },
  {
    name: 'Configuration',
    component: <CourseConfiguration />
  }
];
