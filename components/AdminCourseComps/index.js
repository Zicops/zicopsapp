import { useState } from 'react';
import TabContainer from '../common/TabContainer';
import About from './About';
import Configuration from './Configuration';
import Topics from './Topics';
import Commercials from './Commercials';
import CourseMaster from './CourseMaster';
import Details from './Details';

const tabData = [
  {
    name: 'Course Master',
    component: <CourseMaster/>
  },
  {
    name: 'Details',
    component: <Details/>
  },
  {
    name: 'About',
    component: <About/>
  },
  {
    name: 'Topics',
    component: <Topics/>
  },
  {
    name:'Commercials',
    component:<Commercials/>
  },
  {
    name: 'Configuration',
    component:<Configuration/>
  },
];

export default function AdminCourseComps() {
  const [tab, setTab] = useState(tabData?.[0]?.name);

  return (
    <>
      <TabContainer tabData={tabData} tab={tab} setTab={setTab}></TabContainer>
    </>
  );
}
