import { GET_COURSE, GET_LATEST_COURSES, queryClient } from '@/api/Queries';
import { ADD_USER_COURSE, UPDATE_USER_COURSE, userClient } from '@/api/UserMutations';
import { GET_USER_COURSE_MAPS, GET_USER_COURSE_PROGRESS } from '@/api/UserQueries';
import UserButton from '@/common/UserButton';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import InputDatePicker from '@/components/common/InputDatePicker';
import PopUp from '@/components/common/PopUp';
import { IsDataPresentAtom } from '@/components/common/PopUp/Logic/popUp.helper';
import { courseData } from '@/components/LearnerUserProfile/Logic/userBody.helper';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { getUserData } from '@/helper/loggeduser.helper';
import { getUnixFromDate } from '@/helper/utils.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Accordian from '../../../components/UserProfile/Accordian';

// import AssignedCourses from '../../AssignedCourses';
import ConfirmPopUp from '@/components/common/ConfirmPopUp';
import AssignCourses from './AssignCourses';
import styles from './coursesAccordian.module.scss';
import _styles from '../userProfile.module.scss';
import useHandleUpdateCourse from './Logic/useHandleUpdateCourse';
import { UserDataAtom } from '@/state/atoms/global.atom';
import CurrentCourses from './CurrentCourses';

const CoursesAccordian = ({ currentUserData = null }) => {
  const [courseAssignData, setCourseAssignData] = useState({
    endDate: new Date(),
    isMandatory: false,
    isCourseAssigned: false
  });

  const [loadLastestCourseData, { error: error }] = useLazyQuery(GET_LATEST_COURSES, {
    client: queryClient
  });
  const [addUserCourse, { loading: addCoueseLoading }] = useMutation(ADD_USER_COURSE, {
    client: userClient
  });
  const [updateUserCouse] = useMutation(UPDATE_USER_COURSE, { client: userClient });

  const [isPopUpDataPresent, setIsPopUpDataPresent] = useRecoilState(IsDataPresentAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const userDataGlobal = useRecoilValue(UserDataAtom);

  const router = useRouter();
  const currentUserId = router?.query?.userId;
  const [assignedCourses, setAssignedCourses] = useState([]);
  const [currentCourses, setCurrentCourses] = useState([]);
  const [userCourseData, setUserCourseData] = useState(null);
  const [dataCourse, setDataCourse] = useState([]);
  const [selected, setSelected] = useState(3);
  const [selectedPage, setSelectedPage] = useState('');
  const [isAssignedPage, setIsAssignedPage] = useState(false);
  const [isAssignPopUpOpen, setIsAssignPopUpOpen] = useState(false);
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const [loading, setLoading] = useState(false);
  const [courseLoading , setCourseLoading] = useState(false);

  const { updateCourse } = useHandleUpdateCourse();

  async function handleAssign(item, isRemove = false) {
    // const { user_lsp_id } = JSON.parse(sessionStorage.getItem('lspData'));
    setUserCourseData({ ...item });

    if (!isRemove) return setIsAssignPopUpOpen(true);

    return setShowConfirmBox(true);
  }

  async function handleRemove() {
    setLoading(true);
    const checkUpdate = await updateCourse(userCourseData, currentUserId, 'self');
    // console.log(checkUpdate);
    await loadAssignedCourseData();
    setToastMsg({ type: 'success', message: 'Course Removed Succesfully' });
    setLoading(false);
    return setShowConfirmBox(false);
  }

  async function handleSubmit() {
    // console.log(currentUserData);
    if(!currentUserData?.userLspId) return setToastMsg({ type: 'danger', message: 'User lsp load error!' });;
    setLoading(true);
    setIsPopUpDataPresent(false);
    const { id } = getUserData();

    const checkCourse = await updateCourse(userCourseData, currentUserId, 'admin', id);
    // console.log(checkCourse,'hi')
    if (checkCourse) {
      const courseArray = dataCourse.filter((item) => item.id !== userCourseData?.id);
      setDataCourse([...courseArray]);
      setCourseAssignData({ ...courseAssignData, isCourseAssigned: true });

      setLoading(false)
      setToastMsg({ type: 'success', message: 'Course Added Succesfully' });
      await loadAssignedCourseData();
      return setIsAssignPopUpOpen(false);
    }

    // console.log('hi')
    const sendData = {
      userId: router.query?.userId,
      userLspId: currentUserData?.userLspId,
      courseId: userCourseData?.id,
      addedBy: JSON.stringify({ userId: id, role: 'admin' }),
      courseType: userCourseData.type,
      isMandatory: courseAssignData?.isMandatory,
      courseStatus: 'open',
      endDate: getUnixFromDate(courseAssignData?.endDate)?.toString()
    };

    let isError = false;
    const res = await addUserCourse({ variables: sendData }).catch((err) => {
      console.log(err);
      setLoading(false);
      return setToastMsg({ type: 'danger', message: 'Course Assign Error' });
    });

    if (isError) return setToastMsg({ type: 'danger', message: 'Course Assign Error' });
    const courseArray = dataCourse.filter((item) => item.id !== sendData?.courseId);
    setDataCourse([...courseArray]);
    setCourseAssignData({
      ...courseAssignData,
      isCourseAssigned: true,
      endDate: new Date(),
      isMandatory: false
    });
    await loadAssignedCourseData();
    setToastMsg({ type: 'success', message: 'Course Added Succesfully' });
    setIsAssignPopUpOpen(false);
    return setLoading(false);
  }

  const courseSections = [
    { displayType: 'Current Courses', footerType: 'onGoing', data: currentCourses },
    { displayType: 'Current Courses', footerType: 'added', data: courseData },
    {
      displayType: 'Assigned Courses',
      footerType: 'adminFooter',
      data: assignedCourses,
      buttonText: 'Remove'
    },
    {
      displayType: 'All Course',
      footerType: 'adminFooter',
      data: dataCourse,
      buttonText: 'Assign'
    }
  ];
  const [lists, setLists] = useState([
    { id: 1, component: 'Current Courses', onClick: true },
    {
      id: 2,
      component: (
        <svg
          width="24"
          height="25"
          viewBox="0 -3 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <mask
            id="mask0_978_6473"
            // style="mask-type:alpha"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="24"
            height="25">
            <rect y="0.5" width="24" height="24" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_978_6473)">
            <path
              d="M8.02505 22.7008L6.05005 20.7258L14.275 12.5008L6.05005 4.27578L8.02505 2.30078L18.225 12.5008L8.02505 22.7008Z"
              fill="#ACACAC"
            />
          </g>
        </svg>
      ),
      onClick: false
    },
    { id: 3, component: 'Assign Courses', onClick: true }
  ]);

  function handleNode(item) {
    if (item.component === 'Current Courses') {
      if (lists.length > 3) {
        lists.pop();
        lists.pop();
      }
      setIsAssignedPage(!isAssignedPage);
      // setSelectedPage(item.component);
      // setSelected(item.id);
    }
    if (item.component === 'Assign Courses') {
      if (lists.length > 3) {
        lists.pop();
        lists.pop();
      }
      // setSelected(item.id);
      // setSelectedPage(item.component);
    }

    setSelected(item.id);
    setSelectedPage(item.component);
  }

  function handleClickFolder() {
    setLists((prevValue) => [
      ...prevValue,
      {
        id: 4,
        component: (
          <svg
            width="24"
            height="25"
            viewBox="0 -3 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <mask
              id="mask0_978_6473"
              // style="mask-type:alpha"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="24"
              height="25">
              <rect y="0.5" width="24" height="24" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_978_6473)">
              <path
                d="M8.02505 22.7008L6.05005 20.7258L14.275 12.5008L6.05005 4.27578L8.02505 2.30078L18.225 12.5008L8.02505 22.7008Z"
                fill="#ACACAC"
              />
            </g>
          </svg>
        ),
        onClick: false
      },
      { id: 5, component: 'Assigned Courses', onClick: true }
    ]);

    setSelectedPage('Assigned Courses');
    setSelected(5);
  }

  useEffect(async () => {
    const currentTime = new Date().getTime();
    const sendData = {
      publish_time: Math.floor(currentTime / 1000),
      pageCursor: '',
      pageSize: 100
    };
    const res = await loadLastestCourseData({ variables: sendData }).catch((err) => {
      console.log(err);
      return setToastMsg({ type: 'danger', message: `${err}` });
    });
    const courseData = res?.data?.latestCourses?.courses?.filter(
      (c) => c?.is_active && c?.is_display
    );

    setDataCourse([...courseData]);
    // console.log(dataCourse);

    // courseData.forEach(async (item) => {
    //   console.log(item);
    //   let sendData = { course_id: item?.course_id };
    //   const resCourseData = await loadCourseData({ variables: sendData }).catch((err) => {
    //     console.log(err);
    //   });
    //   console.log(resCourseData?.data);
    //   data.push(resCourseData?.data);
    // });
  }, []);

  // load assigned courses
  useEffect(() => {
    loadAssignedCourseData();
  }, [currentUserId]);

  async function loadAssignedCourseData() {
    if (!currentUserId) return setCourseLoading(false);
    setCourseLoading(true);
    const assignedCoursesRes = await loadQueryDataAsync(
      GET_USER_COURSE_MAPS,
      {
        user_id: currentUserId,
        publish_time: Math.floor(Date.now() / 1000),
        pageCursor: '',
        pageSize: 999999999
      },
      {},
      userClient
    );

    if (assignedCoursesRes?.error)
      return setToastMsg({ type: 'danger', message: 'Course Maps Load Error' });
    const assignedCoursesToUser = assignedCoursesRes?.getUserCourseMaps?.user_courses;
    
     if(!assignedCoursesToUser?.length) setCourseLoading(false);

    const allAssignedCourses = [];
    for (let i = 0; i < assignedCoursesToUser?.length; i++) {
      const courseMap = assignedCoursesToUser[i];
      const mapId = courseMap?.user_course_id;
      const course_id = courseMap?.course_id;

      const courseProgressRes = await loadQueryDataAsync(
        GET_USER_COURSE_PROGRESS,
        { userId: currentUserId, userCourseId: mapId },
        {},
        userClient
      );

      if (courseProgressRes?.error) {
        setToastMsg({ type: 'danger', message: 'Course Progress Load Error' });
        continue;
      }
      const userProgressArr = courseProgressRes?.getUserCourseProgressByMapId;

      let topicsStarted = 0;
      userProgressArr?.map((topic) => {
        if (topic?.status !== 'not-started') ++topicsStarted;
      });
      console.log(topicsStarted);
      const courseProgress = userProgressArr?.length
        ? Math.floor((topicsStarted * 100) / userProgressArr?.length)
        : 0;

      const courseRes = await loadQueryDataAsync(GET_COURSE, { course_id: course_id });
      if (courseRes?.error) {
        setToastMsg({ type: 'danger', message: 'Course Load Error' });
        continue;
      }

      allAssignedCourses.push({
        ...courseRes?.getCourse,
        completedPercentage: userProgressArr?.length ? courseProgress : 0,
        added_by: JSON.parse(courseMap?.added_by)
      });
    }

    if (allAssignedCourses?.length) {
      const adminAssignedCourses = allAssignedCourses?.filter(
        (course) => course?.added_by?.role.toLowerCase() === 'admin'
      );

      setCurrentCourses(allAssignedCourses,setCourseLoading(false));
      setAssignedCourses(adminAssignedCourses);
    }
  }

  return (
    <>
      <Accordian height={'auto'} acc_title={'Courses'}>
        {/* <CurrentCourses
          assignedCourses={assignedCourses.filter((courses) => courses.completedPercentage)}
          onAssignClick={() => {
            setIsAssignedPage(!isAssignedPage);
            setSelectedPage('Assign Courses');
            setSelected(3);
          }}
        /> */}
        

        <div className={`${styles.courses_acc_head}`}>
          {isAssignedPage && (
            <div
              className={`${styles.current_courses} ${
                lists?.length > 3 ? styles.marginBottom : ''
              }`}>
              {lists.map((item) => (
                <div
                  key={item.id}
                  onClick={item.onClick ? () => handleNode(item) : () => {}}
                  style={{ color: item.id === selected ? 'var(--primary)' : '' }}>
                  {item.component}
                </div>
              ))}
            </div>
          )}
          {!isAssignedPage && (
            <div className={`${styles.assign}`}>
              <div>
                Courses in learning folder {`(${currentCourses?.length})`}
              </div>

              <div
                onClick={() => {
                  setIsAssignedPage(!isAssignedPage);
                  setSelectedPage('Assign Courses');
                  setSelected(3);
                }}
                className={`${styles.assignInner}`}>
                <img src="/images/svg/add-line-blue.svg" />
                Assign Courses
              </div>
            </div>
          )}
        </div>
        {/* {isAssignedPage && <AssignCourses section={courseSections[3]} />} */}
        {/* {!isAssignedPage && <AssignCourses type="currentCourses" section={courseSections[0]} loading={courseLoading}/>} */}
        {!isAssignedPage && <CurrentCourses courseData={currentCourses} handleSubmit={handleAssign} isLoading={courseLoading}/>}
        {/* {selectedPage === 'Current Courses' && <AssignCourses section={courseSections[1]} />} */}
        {selectedPage === 'Assign Courses' && (
          <AssignCourses
            // isFolder={true}
            isHead={true}
            type="assignCourses"
            assignedCourses={assignedCourses}
            section={courseSections[3]}
            handleClick={handleClickFolder}
            handleSubmit={handleAssign}
            buttonText={courseSections[3].buttonText}
          />
        )}
        {selectedPage === 'Assigned Courses' && (
          <AssignCourses
            type="assignedCourses"
            section={courseSections[2]}
            buttonText={courseSections[2].buttonText}
            handleSubmit={handleAssign}
            isRemove={true}
          />
        )}
        <PopUp
          // title="Course Mapping Configuration"
          // submitBtn={{ handleClick: handleSubmit }}
          popUpState={[isAssignPopUpOpen, setIsAssignPopUpOpen]}
          // size="smaller"
          customStyles={{ width: '400px' }}
          isFooterVisible={false}
          positionLeft="50%">
          <div className={`${styles.assignCoursePopUp}`}>
            <p className={`${styles.assignCoursePopUpTitle}`}>Course Mapping Configuration</p>
            <LabeledRadioCheckbox
              type="checkbox"
              label="Course Mandatory"
              name="isMandatory"
              isChecked={courseAssignData?.isMandatory}
              changeHandler={(e) =>
                setCourseAssignData({ ...courseAssignData, isMandatory: e.target.checked })
              }
            />
            <section>
              <p htmlFor="endDate">Expected Completion date:</p>
              <InputDatePicker
                minDate={new Date()}
                selectedDate={courseAssignData?.endDate}
                changeHandler={(date) => {
                  setIsPopUpDataPresent(true);
                  setCourseAssignData({ ...courseAssignData, endDate: date });
                }}
                styleClass={styles.dataPickerStyle}
              />
            </section>
            <div className={`${styles.assignCourseButtonContainer}`}>
              <UserButton
                text={'Cancel'}
                isPrimary={false}
                type={'button'}
                clickHandler={() => {
                  setIsAssignPopUpOpen(false);
                  setCourseAssignData({ ...courseAssignData, endDate: new Date() });
                }}
              />
              <UserButton
                text={'Save'}
                type={'button'}
                isDisabled={loading}
                clickHandler={() => {
                  handleSubmit();
                }}
              />
            </div>
          </div>
        </PopUp>

        {showConfirmBox && (
          <ConfirmPopUp
            title={'Are you sure about removing this course?'}
            btnObj={{
              leftIsDisable : loading ,
              rightIsDisable : loading,
              handleClickLeft: () => handleRemove(),
              handleClickRight: () => setShowConfirmBox(false)
            }}
          />
        )}

        {/* <div className={`${styles.imageContainer}`}>
          <img
            src={`/images/svg/view_agenda${isBoxView ? '_gray' : ''}.svg`}
            onClick={() => setIsBoxView(false)}
          />
          <img
            src={`/images/svg/grid_view${isBoxView ? '_primary' : ''}.svg`}
            onClick={() => setIsBoxView(true)}
          />
        </div>

        {isBoxView ? (
          <GridCourseCards courses={course} />
        ) : (
          <>
            {course.map((course) => (
              <AssignedCourses />
            ))}
          </>
        )} */}
      </Accordian>
    </>
  );
};

export default CoursesAccordian;
