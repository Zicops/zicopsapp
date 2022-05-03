import CourseDetails from '../CourseDetails';
import CourseAbout from '../CourseAbout';
import CourseConfiguration from '../../CourseConfiguration';
import CourseMaster from '../CourseMaster';
import CourseTopic from '../CourseTopic';
import { atom } from 'recoil';

export const isCourseUploadingAtom = atom({
  key: 'isCourseUploading',
  default: null
});

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
    component: <CourseTopic />
  },
  {
    name: 'Configuration',
    component: <CourseConfiguration />
  }
];

export function getDateTimeFromUnix(unixTimestamp) {
  if (!unixTimestamp) return '';
  // https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript#:~:text=let%20unix_timestamp%20%3D%201549312452,console.log(formattedTime)%3B
  const d = new Date(unixTimestamp * 1000);

  return `${d.toLocaleString()}`;
}
