import { FeatureFlagsAtom } from '@/state/atoms/global.atom';
import { getUserCourseDataObj, UserCourseDataAtom } from '@/state/atoms/video.atom';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { courseContext } from '../../state/contexts/CourseContext';
import AlertBox from '../common/AlertBox';
import ConfirmPopUp from '../common/ConfirmPopUp';
import BottomTabsMenu from '../small/BottomTabsMenu';
import {
  coursebody,
  navbarOverrideElement,
  navbarOverrideElementClose,
} from './courseBody.module.scss';
import CoursePageTabs from './CoursePageTabs';
import { tabs } from './Logic/courseBody.helper';
import { ShowNotAssignedErrorAtom } from './Logic/topicBox.helper';
import useLoadUserData from './Logic/useLoadUserData';
import useShowData from './Logic/useShowData';
import { SelectedResourceDataAtom } from '../LearnerCourseComps/atoms/learnerCourseComps.atom';
import PopUp from '../common/PopUp';
import ZicopsFileViewer from '../common/ZicopsFileViewer';
import { COURSE_TYPES } from '@/helper/constants.helper';

export default function CourseBody({ isPreview = false }) {
  const courseContextData = useContext(courseContext);
  const [selectedResourceData, setSelectedResourceData] = useRecoilState(SelectedResourceDataAtom);

  const {
    myRef,
    showActiveTab,
    activeCourseTab,
    setActiveCourseTab,
    getModuleOptions,
    moduleData,
    setSelectedModule,
    setIsResourceShown,
  } = useShowData(courseContextData);

  const router = useRouter();
  useLoadUserData(isPreview, setSelectedModule, getModuleOptions);
  const [userCourseData, setUserCourseData] = useRecoilState(UserCourseDataAtom);
  const [showAlert, setShowAlert] = useRecoilState(ShowNotAssignedErrorAtom);
  const { isDemo, isDev } = useRecoilValue(FeatureFlagsAtom);
  let newTabs = [...tabs];

  const i = newTabs?.findIndex((tab) => tab?.name === 'Certificates');
  if (i >= 0) newTabs[i].isHidden = !isDemo;
  if (courseContextData?.fullCourse?.type === COURSE_TYPES[1]) {
    newTabs = newTabs.filter((tab) => tab?.isRegister === false);
    console.info(newTabs);
  }
  useEffect(() => {
    setActiveCourseTab(newTabs[0].name);
    setIsResourceShown(null);
    setSelectedModule(getModuleOptions()[0]);
    if (isPreview) setUserCourseData(getUserCourseDataObj());
  }, []);

  const props = {
    activeCourseTab: activeCourseTab,
    setActiveCourseTab: setActiveCourseTab,
    refProp: myRef,
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
          tabData={newTabs}
          ref={myRef}
          activeCourseTab={activeCourseTab}
          setActiveTab={setActiveCourseTab}
        />

        {showActiveTab(activeCourseTab)}

        {activeCourseTab !== newTabs[newTabs.length - 1].name && (
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
                      shallow: true,
                    },
                  );
                },
                handleClickRight: () => setShowAlert(false),
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
      {!!selectedResourceData?.url && (
        <PopUp
          title={selectedResourceData?.name}
          popUpState={[selectedResourceData?.url, setSelectedResourceData]}
          size="large"
          positionLeft="50%"
          customBodyStyles={{ overflow: 'auto' }}
          isFooterVisible={false}>
          <ZicopsFileViewer filePath={selectedResourceData?.url} />
        </PopUp>
      )}
    </>
  );
}
