import { GET_COURSE, GET_LATEST_COURSES, queryClient } from '@/api/Queries';
import { ADD_USER_COURSE, userClient } from '@/api/UserMutations';
import { GET_USER_COURSE_MAPS, GET_USER_COURSE_PROGRESS } from '@/api/UserQueries';
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
import { useRecoilState } from 'recoil';
import Accordian from '../../../components/UserProfile/Accordian';

// import AssignedCourses from '../../AssignedCourses';
import AssignCourses from './AssignCourses';
import styles from './coursesAccordian.module.scss';
import CurrentCourses from './CurrentCourses';
const CoursesAccordian = () => {
  const { courseAssignData, setCourseAssignData } = useState({
    endDate: new Date(),
    isMandatory: false,
    isCourseAssigned: false
  });

  const [loadLastestCourseData, { error: error }] = useLazyQuery(GET_LATEST_COURSES, {
    client: queryClient
  });
  const [addUserCourse] = useMutation(ADD_USER_COURSE, { client: userClient });

  const [isPopUpDataPresent, setIsPopUpDataPresent] = useRecoilState(IsDataPresentAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const router = useRouter();
  const currentUserId = router?.query?.userId;
  const [assignedCourses, setAssignedCourses] = useState([]);
  const [userCourseData, setUserCourseData] = useState(null);
  const [dataCourse, setDataCourse] = useState([]);
  const [selected, setSelected] = useState(3);
  const [selectedPage, setSelectedPage] = useState('');
  const [isAssignedPage, setIsAssignedPage] = useState(false);
  const [isAssignPopUpOpen, setIsAssignPopUpOpen] = useState(false);

  function handleAssign(item) {
    // const { user_lsp_id } = JSON.parse(sessionStorage.getItem('lspData'));
    setIsAssignPopUpOpen(true);
    setUserCourseData({ ...item });
  }

  async function handleSubmit() {
    setIsPopUpDataPresent(false);
    const { id } = getUserData();
    const sendData = {
      userId: router.query?.userId,
      userLspId: 'Zicops',
      courseId: userCourseData?.id,
      addedBy: JSON.stringify({ userId: id, role: 'admin' }),
      courseType: userCourseData.type,
      isMandatory: courseAssignData?.isMandatory,
      courseStatus: 'open',
      endDate: getUnixFromDate(courseAssignData?.endDate)?.toString()
    };
    console.log(sendData);

    let isError = false;
    const res = await addUserCourse({ variables: sendData }).catch((err) => {
      console.log(err);
      return setToastMsg({ type: 'danger', message: 'Course Assign Error' });
    });
    console.log(res);
    if (isError) return setToastMsg({ type: 'danger', message: 'Course Assign Error' });
    const courseArray = dataCourse.filter((item) => item.id !== sendData?.courseId);
    setDataCourse([...courseArray]);
    setCourseAssignData({ ...courseAssignData, isCourseAssigned: true });
    setIsAssignPopUpOpen(false);

    loadAssignedCourseData();
  }

  const courseSections = [
    { displayType: 'Current Courses', footerType: 'onGoing', data: assignedCourses },
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
    const courseData = res?.data?.latestCourses?.courses;

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
    if (!currentUserId) return;
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

    const allAssignedCourses = [];
    for (let i = 0; i < assignedCoursesToUser.length; i++) {
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
        completedPercentage: userProgressArr?.length ? courseProgress : 0
      });
    }

    if (allAssignedCourses?.length) setAssignedCourses(allAssignedCourses);
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
                lists?.length > 3? styles.marginBottom : ''
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
                Current courses:{' '}
                {assignedCourses?.filter((courses) => courses.completedPercentage)?.length}
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
        {!isAssignedPage && <AssignCourses type="currentCourses" section={courseSections[0]} />}
        {/* {selectedPage === 'Current Courses' && <AssignCourses section={courseSections[1]} />} */}
        {selectedPage === 'Assign Courses' && (
          <AssignCourses
            isFolder={true}
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
          />
        )}
        <PopUp
          popUpState={[isAssignPopUpOpen, setIsAssignPopUpOpen]}
          size="small"
          title="Assign Course To User"
          positionLeft="50%"
          submitBtn={{ handleClick: handleSubmit }}>
          <div className={`${styles.assignCoursePopUp}`}>
            <section>
              <label htmlFor="endDate">Course End Date:</label>
              <InputDatePicker
                selectedDate={courseAssignData?.endDate}
                changeHandler={(date) => {
                  setIsPopUpDataPresent(true);
                  setCourseAssignData({ ...courseAssignData, endDate: date });
                }}
              />
            </section>

            <LabeledRadioCheckbox
              type="checkbox"
              label="Is Mandatory"
              name="isMandatory"
              isChecked={courseAssignData?.isMandatory}
              changeHandler={(e) =>
                setCourseAssignData({ ...courseAssignData, isMandatory: e.target.checked })
              }
            />
          </div>
        </PopUp>
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
