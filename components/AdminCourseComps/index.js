import { useState } from 'react';
import TabContainer from '../common/TabContainer';
import CourseMaster from './CourseMaster';

const tabData = [
  {
    name: 'Course Master',
    component: <CourseMaster />
  },
  {
    name: 'Details',
    component: '<CourseDetails />'
  },
  {
    name: 'About',
    component: '<CourseAbout />'
  },
  {
    name: 'Topics',
    component: '<CourseTopic />'
  },
  {
    name: 'Configuration',
    component: '<CourseConfiguration />'
  }
];

export default function AdminCourseComps() {
  const [tab, setTab] = useState(tabData?.[0]?.name);

  return (
    <>
      <TabContainer tabData={tabData} tab={tab} setTab={setTab}></TabContainer>
    </>
  );
}
