import { useContext } from 'react';
import { courseContext } from '../../state/contexts/CourseContext';
import BottomTabsMenu from '../small/BottomTabsMenu';
import { coursebody, navbarOverrideElement } from './courseBody.module.scss';
import CoursePageTabs from './CoursePageTabs';
import { tabs } from './Logic/courseBody.helper';
import useShowData from './Logic/useShowData';

export default function CourseBody() {
  const courseContextData = useContext(courseContext);

  const {
    myRef,
    showActiveTab,
    activeCourseTab,
    setActiveCourseTab,
    getModuleOptions,
    moduleData
  } = useShowData(courseContextData);

  const props = {
    activeCourseTab: activeCourseTab,
    setActiveCourseTab: setActiveCourseTab,
    refProp: myRef
  };

  return (
    <>
      <div className={navbarOverrideElement}>This is Preview Page</div>

      <div className={coursebody}>
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
    </>
  );
}
