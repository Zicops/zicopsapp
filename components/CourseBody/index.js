import { useContext } from 'react';
import { courseContext } from '../../state/contexts/CourseContext';
import { moduleContext } from '../../state/contexts/ModuleContext';
import Dropdown from '../common/Dropdown';
import BottomTabsMenu from '../small/BottomTabsMenu';
import CoursePageTabs from './CoursePageTabs';
import { tabs } from './Logic/courseBody.helper';
import useShowData from './Logic/useShowData';

export default function CourseBody() {
  const moduleContextData = useContext(moduleContext);
  const courseContextData = useContext(courseContext);
  console.log(moduleContextData);
  const {
    myRef,
    showActiveTab,
    activeCourseTab,
    setActiveCourseTab,
    getModuleOptions, 
    moduleData
  } = useShowData(courseContextData, moduleContextData);

  const props = {
    activeCourseTab: activeCourseTab,
    setActiveCourseTab: setActiveCourseTab,
    refProp: myRef
  };

  return (
    <>
      <div className="coursebody">
        <CoursePageTabs
          tabData={tabs}
          ref={myRef}
          activeCourseTab={activeCourseTab}
          setActiveTab={setActiveCourseTab}
        />

        {showActiveTab(activeCourseTab)}

        {activeCourseTab !== tabs[tabs.length - 1].name && (
          <>
            {/* <Dropdown options={options} /> */}
            <BottomTabsMenu props={props} />
          </>
        )}
      </div>

      {/* move styles to .scss */}
      <style jsx>
        {`
          .coursebody {
            background-color: #1a1d21;
          }
        `}
      </style>
    </>
  );
}
