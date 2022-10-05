import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { courseContext } from '../../state/contexts/CourseContext';
import BottomTabsMenu from '../small/BottomTabsMenu';
import {
  coursebody,
  navbarOverrideElement,
  navbarOverrideElementClose
} from './courseBody.module.scss';
import CoursePageTabs from './CoursePageTabs';
import { tabs } from './Logic/courseBody.helper';
import useLoadUserData from './Logic/useLoadUserData';
import useShowData from './Logic/useShowData';

export default function CourseBody({ isPreview = false }) {
  const courseContextData = useContext(courseContext);

  const {
    myRef,
    showActiveTab,
    activeCourseTab,
    setActiveCourseTab,
    getModuleOptions,
    moduleData,
    setSelectedModule,
    setIsResourceShown
  } = useShowData(courseContextData);

  const router = useRouter();
  useLoadUserData(isPreview, setSelectedModule, getModuleOptions);

  useEffect(() => {
    setActiveCourseTab(tabs[0].name);
    setIsResourceShown(null);
  }, []);

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
          <span className={navbarOverrideElementClose} onClick={() => router.back()}>
            <img src="/images/circular-cross.png" alt="" width={50} />
          </span>
          {/* <Link href={`/admin/courses/${courseContextData?.fullCourse.id}`}>
            <a className={navbarOverrideElementClose}>
              <img src="/images/circular-cross.png" alt="" width={50} />
            </a>
          </Link> */}
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
