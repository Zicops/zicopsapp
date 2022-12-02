import { atom } from 'recoil';
import CourseConfiguration from '../CourseConfiguration';
import CourseAbout from '../CourseAbout';
import CourseDetails from '../CourseDetails';
import CourseMaster from '../CourseMaster';
import CourseTopic from '../CourseTopic';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { GET_LEARNINGSPACES_BY_ORGID, userQueryClient } from '@/api/UserQueries';

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

export const IsCourseSavedAtom = atom({
  key: 'isCourseSaved',
  default: true
});

export const isCourseUploadingAtom = atom({
  key: 'isCourseUploading',
  default: null
});

export const CourseTabAtom = atom({
  key: 'CourseTab',
  default: tabData[0]?.name
});

export function getDateTimeFromUnix(unixTimestamp) {
  if (!+unixTimestamp) return '';
  // https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript#:~:text=let%20unix_timestamp%20%3D%201549312452,console.log(formattedTime)%3B
  const d = new Date(unixTimestamp * 1000);

  return `${d.toLocaleString()}`;
}

export async function getDefaultLsp(orgId = ""){
  if(orgId === "") return false;
  const res = await loadQueryDataAsync(GET_LEARNINGSPACES_BY_ORGID,{org_id:orgId},{},userQueryClient);
  if(res?.error) return false;
  // console.log(res);
  const defaultLsp = res?.getLearningSpacesByOrgId?.filter((lsp) => lsp?.is_default) ;
  return defaultLsp[0]?.lsp_id ;
}