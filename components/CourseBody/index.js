import { useContext } from 'react';
import { courseContext } from '../../state/contexts/CourseContext';
import BottomTabsMenu from '../small/BottomTabsMenu';
import {
  coursebody,
  navbarOverrideElement,
  navbarOverrideElementClose
} from './courseBody.module.scss';
import CoursePageTabs from './CoursePageTabs';
import { tabs } from './Logic/courseBody.helper';
import useShowData from './Logic/useShowData';
import Link from 'next/link';

export default function CourseBody({ isPreview = false }) {
  const courseContextData = useContext(courseContext);

  const {
    myRef,
    showActiveTab,
    activeCourseTab,
    setActiveCourseTab,
    getModuleOptions,
    moduleData
  } = useShowData(courseContextData, isPreview);

  const props = {
    activeCourseTab: activeCourseTab,
    setActiveCourseTab: setActiveCourseTab,
    refProp: myRef
  };

  return (
    <>
      {isPreview && (
        <div className={navbarOverrideElement}>
          This is Preview Page
          <Link href={`/admin/courses/${courseContextData?.fullCourse.id}`}>
            <a className={navbarOverrideElementClose}>
              {/* X */}
              <img src="/images/circular-cross.png" alt="" width={50} />
            </a>
          </Link>
        </div>
      )}

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
