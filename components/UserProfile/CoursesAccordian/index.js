import { GET_COURSE, GET_LATEST_COURSES, queryClient } from '@/api/Queries';
import { ADD_USER_COURSE, userClient } from '@/api/UserMutations';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import InputDatePicker from '@/components/common/InputDatePicker';
import PopUp from '@/components/common/PopUp';
import { IsDataPresentAtom } from '@/components/common/PopUp/Logic/popUp.helper';
import useHandleCourseHero from '@/components/CourseHero/Logic/useHandleCourseHero';
import { courseData } from '@/components/LearnerUserProfile/Logic/userBody.helper';
import { getUserData } from '@/helper/loggeduser.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import Accordian from '../../../components/UserProfile/Accordian';

// import AssignedCourses from '../../AssignedCourses';
import AssignCourses from './AssignCourses';
import styles from './coursesAccordian.module.scss';
const CoursesAccordian = () => {
  // const [loadUserCourseData, { error: errorUC }] = useLazyQuery(GET_USER_COURSE_MAPS, {
  //   client: userQueryClient
  // });
  const { courseAssignData, setCourseAssignData } = useHandleCourseHero();

  const [loadLastestCourseData, { error: error }] = useLazyQuery(GET_LATEST_COURSES, {
    client: queryClient
  });
  const [loadCourseData, { error: errorC, refetch }] = useLazyQuery(GET_COURSE, {
    client: queryClient
  });
  const [addUserCourse] = useMutation(ADD_USER_COURSE, { client: userClient });

  const [isPopUpDataPresent, setIsPopUpDataPresent] = useRecoilState(IsDataPresentAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const router = useRouter();
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
      endDate: courseAssignData?.endDate
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
  }

  const courseSections = [
    { displayType: 'Current Courses', footerType: 'onGoing', data: courseData },
    { displayType: 'Current Courses', footerType: 'added', data: courseData },
    {
      displayType: 'Assigned Courses',
      footerType: 'adminFooter',
      data: courseData,
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
    console.log(dataCourse);

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
  let course = ['', '', ''];
  const [isBoxView, setIsBoxView] = useState(true);

  return (
    <>
      <Accordian height={'auto'} acc_title={'Courses'}>
        <div className={`${styles.courses_acc_head}`}>
          {isAssignedPage && (
            <div className={`${styles.current_courses}`}>
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
              <div>Current courses:6</div>
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
        {!isAssignedPage && <AssignCourses isHead={false} section={courseSections[0]} />}
        {/* {selectedPage === 'Current Courses' && <AssignCourses section={courseSections[1]} />} */}
        {selectedPage === 'Assign Courses' && (
          <AssignCourses
            isFolder={true}
            section={courseSections[3]}
            handleClick={handleClickFolder}
            handleSubmit={handleAssign}
            buttonText={courseSections[3].buttonText}
          />
        )}
        {selectedPage === 'Assigned Courses' && (
          <AssignCourses section={courseSections[2]} buttonText={courseSections[2].buttonText} />
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
