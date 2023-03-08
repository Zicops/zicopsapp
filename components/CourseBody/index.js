import { USER_LSP_ROLE } from '@/helper/constants.helper';
import { FeatureFlagsAtom } from '@/state/atoms/global.atom';
import { getUserCourseDataObj, UserCourseDataAtom } from '@/state/atoms/video.atom';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { courseContext } from '../../state/contexts/CourseContext';
import AlertBox from '../common/AlertBox';
import ConfirmPopUp from '../common/ConfirmPopUp';
import BottomTabsMenu from '../small/BottomTabsMenu';
import Certificates from './Certificates';
import {
  coursebody,
  navbarOverrideElement,
  navbarOverrideElementClose
} from './courseBody.module.scss';
import CoursePageTabs from './CoursePageTabs';
import { tabs } from './Logic/courseBody.helper';
import { ShowNotAssignedErrorAtom } from './Logic/topicBox.helper';
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
  const [userCourseData, setUserCourseData] = useRecoilState(UserCourseDataAtom);
  const [showAlert, setShowAlert] = useRecoilState(ShowNotAssignedErrorAtom);
  const { isDev } = useRecoilValue(FeatureFlagsAtom);

  if (!isDev && !tabs?.find((tab) => tab?.name === 'Certificates')) {
    tabs.push({
      name: 'Certificates',
      comp: <Certificates />,
      roleAccess: [USER_LSP_ROLE.admin, USER_LSP_ROLE.vendor]
    });
  }

  useEffect(() => {
    setActiveCourseTab(tabs[0].name);
    setIsResourceShown(null);
    setSelectedModule(getModuleOptions()[0]);
    if (isPreview) setUserCourseData(getUserCourseDataObj());
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

      {showAlert && (
        <>
          {isDev ? (
            <ConfirmPopUp
              title="Course Not Assigned!!"
              message="Please assign course to access the course contents"
              btnObj={{
                textLeft: 'Assign',
                textRight: 'Close',
                handleClickLeft: () => {
                  setShowAlert(false);
                  router.push(
                    { pathname: router.asPath, query: { isAssign: true } },
                    router.asPath,
                    {
                      shallow: true
                    }
                  );
                },
                handleClickRight: () => setShowAlert(false)
              }}
            />
          ) : (
            <AlertBox
              title="Course Not Assigned"
              description="Please assign course to access the course contents"
              handleClose={() => setShowAlert(false)}
            />
          )}
        </>
      )}
    </>
  );
}
