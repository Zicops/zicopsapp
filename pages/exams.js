import {
  GET_USER_EXAM_ATTEMPTS_BY_EXAMID,
  GET_USER_EXAM_RESULTS,
  userQueryClient
} from '@/api/UserQueries';
import { SCHEDULE_TYPE } from '@/components/AdminExamComps/Exams/ExamMasterTab/Logic/examMasterTab.helper';
import ExamHeroSection from '@/components/LearnerExamComp/ExamHeroSection';
import { useExamData } from '@/components/LearnerExamComp/ExamHeroSection/helper';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { COURSE_TYPES } from '@/helper/constants.helper';
import { getLatestCoursesByFilters } from '@/helper/data.helper';
import useUserCourseData from '@/helper/hooks.helper';
import { getUnixFromDate } from '@/helper/utils.helper';
import { UserDataAtom } from '@/state/atoms/global.atom';
import { UsersOrganizationAtom, UserStateAtom } from '@/state/atoms/users.atom';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import ZicopsSimpleTable from '../components/common/ZicopsSimpleTable';
import ZicopsCarousel from '../components/ZicopsCarousel';

const skeletonCardCount = 5;

export const OnGoingExamAtom = atom({ key: 'OnGoingExam', default: [] });

export default function LearnerExams() {
  const router = useRouter();
  const [userGlobalData, setUserGlobalData] = useRecoilState(UserDataAtom);
  const userData = useRecoilValue(UserStateAtom);
  const userOrg = useRecoilValue(UsersOrganizationAtom);

  const [takeAnyTimeExamsData, setTakeAnyTimeExamsData] = useState([]);
  const [scheduleExamsData, setScheduleExamsData] = useState([]);
  const [activeSubcatArr, setActiveSubcatArr] = useState([]);
  const [examResultTableData, setExamResultTableData] = useState([]);

  const [latestCourses, setLatestCourses] = useState([...Array(skeletonCardCount)]);
  const [learningSpaceCourses, setLearningSpaceCourses] = useState([...Array(skeletonCardCount)]);
  const [subCategory0Courses, setSubCategory0Courses] = useState([...Array(skeletonCardCount)]);
  const [subCategory1Courses, setSubCategory1Courses] = useState([...Array(skeletonCardCount)]);
  const [subCategory2Courses, setSubCategory2Courses] = useState([...Array(skeletonCardCount)]);
  const [subCategory3Courses, setSubCategory3Courses] = useState([...Array(skeletonCardCount)]);
  const [subCategory4Courses, setSubCategory4Courses] = useState([...Array(skeletonCardCount)]);

  const [examOngoingData, setOnOgingData] = useRecoilState(OnGoingExamAtom);
  // const userGlobalData = useRecoilValue(UserDataAtom);

  const [isAttemptsLoaded, setIsAttemptsLoaded] = useState(false);

  const {
    loadExamData,
    examResults,
    examCourseMapping,
    examAttempts,
    onGoingExam,
    setOnGoingExam,
    loading,
    setLoading
  } = useExamData();

  // reset recoil
  useEffect(async () => {
    setOnGoingExam([...Array(skeletonCardCount)]);
    await loadExamData();
  }, []);

  const [inputText, setInputText] = useState('');
  const inputHandler = (e) => {
    let lowerCase = e.target.value.toLowerCase();
    console.log('lowerCase', lowerCase);
    setInputText(lowerCase);
  };
  const realSquare = {
    desktop: {
      breakpoint: { max: 3000, min: 1530 },
      items: 4,
      slidesToSlide: 1
    },
    laptop: {
      breakpoint: { max: 1530, min: 1024 },
      items: 4,
      slidesToSlide: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };
  const tableData = {
    columnHeader: ['Exam Name', 'Course Name', 'Exam Date'],
    rowData: scheduleExamsData
  };
  const buttonObj = {
    style: { margin: '0px 10px', padding: '2px 10px', border: '1px solid var(--primary)' }
  };
  const pageSize = 28;
  const { getUserCourseData } = useUserCourseData();

  useEffect(() => {
    // setLoading(true);

    async function loadAndSetHomePageRows() {
      // setLoading(true);
      const subcatArr = userGlobalData?.preferences;
      // const activeSubcategories = subcatArr?.filter((item) => item?.is_active && !item?.is_base);
      const activeSubcategories = subcatArr?.filter(
        (item) => item?.is_active && item?.sub_category
      );
      const baseSubcategoryObj = subcatArr?.filter((item) => item?.is_base)[0];
      // if (baseSubcategoryObj?.sub_category) setBaseSubcategory(baseSubcategoryObj?.sub_category);

      setActiveSubcatArr(activeSubcategories);

      // const userCourseData = await getUserCourseData(28);
      let ucidArray = [];
      // userCourseData?.map((uc) => ucidArray?.push(uc.id));

      // setOnGoingCourses(
      //   userCourseData?.filter(
      //     (course) =>
      //       course?.course_type === COURSE_TYPES[0] &&
      //       course?.isCourseStarted &&
      //       !course?.isCourseCompleted
      //   )
      // );
      // setMandatoryCourses(
      //   userCourseData?.filter(
      //     (course) =>
      //       course?.course_type === COURSE_TYPES[0] &&
      //       // (+course?.completedPercentage === 0 || course?.completedPercentage === 100)
      //       !course?.isCourseStarted &&
      //       !course?.isCourseCompleted &&
      //       course?.is_mandatory
      //   )
      // );

      const getLatestCourses = await getLatestCoursesByFilters({ Type: COURSE_TYPES[3] }, pageSize);
      setLatestCourses(
        getLatestCourses?.latestCourses?.courses?.filter(
          (c) => c?.is_active && c?.is_display && !ucidArray.includes(c.id)
        ) || []
      );

      // if (baseSubcategoryObj?.sub_category) {
      //   let baseSubCatCourses = await getLatestCoursesByFilters(
      //     { SubCategory: baseSubcategory },
      //     pageSize
      //   );
      //   setBaseSubcategoryCourses(
      //     baseSubCatCourses?.latestCourses?.courses?.filter(
      //       (c) =>
      //         c?.type === COURSE_TYPES[0] &&
      //         c?.is_active &&
      //         c?.is_display &&
      //         !ucidArray.includes(c.id)
      //     ) || []
      //   );
      // } else {
      //   setBaseSubcategoryCourses([]);
      // }

      // const parentOfBase = baseSubcategoryObj?.catData?.Name;
      // if (!!parentOfBase) {
      //   setParentOfBaseSubcategory(parentOfBase);
      //   let baseSubCatParentCourses = await getLatestCoursesByFilters(
      //     { Category: parentOfBase },
      //     pageSize
      //   );
      //   setParentOfBaseSubcategoryCourses(
      //     baseSubCatParentCourses?.latestCourses?.courses?.filter(
      //       (c) =>
      //         c?.type === COURSE_TYPES[0] &&
      //         c?.is_active &&
      //         c?.is_display &&
      //         !ucidArray.includes(c.id)
      //     ) || []
      //   );
      // } else {
      //   setParentOfBaseSubcategory(null);
      //   setParentOfBaseSubcategoryCourses([]);
      // }

      const getLSPCourses = await getLatestCoursesByFilters(
        { LspId: userOrg?.lsp_id, Type: COURSE_TYPES[3] },
        pageSize
      );
      setLearningSpaceCourses(
        getLSPCourses?.latestCourses?.courses?.filter(
          (c) => c?.is_active && c?.is_display && !ucidArray.includes(c.id)
        ) || []
      );

      // const subcatArr = userGlobalData?.preferences;
      // const activeSubcategories = subcatArr?.filter((item) => item?.is_active && !item?.is_base);
      let prefIndex = 0;
      const courseData = [];
      for (let i = 0; i < activeSubcategories?.length; ++i) {
        if (prefIndex === 5) break;

        const subCategory = activeSubcategories?.[i]?.sub_category;
        if (!subCategory) continue;

        let subCatCourses = await getLatestCoursesByFilters(
          { SubCategory: subCategory, Type: COURSE_TYPES[3] },
          pageSize
        );
        ++prefIndex;
        courseData.push(
          subCatCourses?.latestCourses?.courses?.filter(
            (c) => c?.is_active && c?.is_display && !ucidArray.includes(c.id)
          ) || []
        );
      }

      setSubCategory0Courses(courseData?.[0]);
      setSubCategory1Courses(courseData?.[1]);
      setSubCategory2Courses(courseData?.[2]);
      setSubCategory3Courses(courseData?.[3]);
      setSubCategory4Courses(courseData?.[4]);
    }

    loadAndSetHomePageRows();
  }, [userGlobalData?.preferences]);

  useEffect(() => {
    console.info(examResults, 'examresult');
    if (!examResults?.length) return;

    console.info('examCourseMapping', examCourseMapping);

    //loop to finally add results and course name
    const examFinalResult = [];
    if (examCourseMapping?.scheduleExam?.length) {
      for (let i = 0; i < examResults?.length; i++) {
        // examFinalResult.push({...examResults[i] ,...examCourseMapping[`${examResults[i]?.exam_id}`] })

        for (let j = 0; j < examCourseMapping?.scheduleExam?.length; j++) {
          if (examResults[i]?.exam_id === examCourseMapping?.scheduleExam[j]?.examId) {
            examFinalResult.push({ ...examResults[i], ...examCourseMapping?.scheduleExam[j] });
          }
        }
      }
    }
    if (examCourseMapping?.takeAnyTime?.length) {
      for (let i = 0; i < examResults?.length; i++) {
        // examFinalResult.push({...examResults[i] ,...examCourseMapping[`${examResults[i]?.exam_id}`] })
        for (let j = 0; j < examCourseMapping?.takeAnyTime?.length; j++) {
          if (examResults[i]?.exam_id === examCourseMapping?.takeAnyTime[j]?.examId) {
            examFinalResult.push({ ...examResults[i], ...examCourseMapping?.takeAnyTime[j] });
          }
        }
      }
    }
    console.info('examFinalResult', examFinalResult);
    // console.log(examFinalResult, 'final reult');
    // formating exam result table data
    const uniqueArray = examFinalResult.reduce((acc, curr) => {
      if (!acc[curr.user_ea_id]) {
        acc[curr.user_ea_id] = curr;
      }
      return acc;
    }, {});

    const uniqueResult = Object.values(uniqueArray);

    const examsResult = uniqueResult?.map((exam) => ({
      id: exam?.user_ea_id,
      courseName: exam?.courseName,
      examName: exam?.Name,
      examDate: moment.unix(exam?.created_at).format('DD/MM/YYYY'),
      examAttempt: exam?.attempt_no,
      examStatus: exam?.attempt_status?.toUpperCase(),
      examScore: exam?.score,
      totalMarks: exam?.total
    }));
    console.info('examsResult', examsResult);
    if (!examsResult?.length) return;
    let filteredData = examsResult?.filter((el) => {
      if (inputText === '') {
        return el;
      } else {
        return el?.examName.toLowerCase().includes(inputText);
      }
    });
    setExamResultTableData([...filteredData]);
    // setExamResultTableData([...examsResult]);
    return;
  }, [examResults, inputText, examCourseMapping?.scheduleExam, examCourseMapping?.takeAnyTime]);

  useEffect(() => {
    // console.log(screen.width);
    setLoading(true);
    // loadUserAttemptsAndResults();
    // loadExamData();
  }, []);

  const courseFromPrefernces = latestCourses?.filter(
    (c) => !!activeSubcatArr?.find((pref) => pref?.sub_category === c?.sub_category)
  );

  useEffect(() => {
    console.log(onGoingExam, 'examreso');
    if (!onGoingExam?.length) return setOnOgingData([]);

    //loop to finally add results and course name
    const examOngoing = [];

    for (let i = 0; i < onGoingExam?.length; i++) {
      if (!examCourseMapping?.scheduleExam?.length) return;
      // examFinalResult.push({...examResults[i] ,...examCourseMapping[`${examResults[i]?.exam_id}`] })
      console.log(examCourseMapping);
      for (let j = 0; j < examCourseMapping?.scheduleExam?.length; j++) {
        if (onGoingExam[i]?.exam_id === examCourseMapping?.scheduleExam[j]?.examId) {
          examOngoing.push({ ...onGoingExam[i], ...examCourseMapping?.scheduleExam[j] });
        }
      }
    }
    for (let i = 0; i < onGoingExam?.length; i++) {
      if (!examCourseMapping?.takeAnyTime?.length) return;
      // examFinalResult.push({...examResults[i] ,...examCourseMapping[`${examResults[i]?.exam_id}`] })
      console.log(examCourseMapping);
      for (let j = 0; j < examCourseMapping?.takeAnyTime?.length; j++) {
        if (onGoingExam[i]?.exam_id === examCourseMapping?.takeAnyTime[j]?.examId) {
          examOngoing.push({ ...onGoingExam[i], ...examCourseMapping?.takeAnyTime[j] });
        }
      }
    }
    console.log(examOngoing, 'final reult');
    //formating exam result table data
    const uniqueArray = examOngoing.reduce((acc, curr) => {
      if (!acc[curr.user_ea_id]) {
        acc[curr.user_ea_id] = curr;
      }
      return acc;
    }, {});

    const uniqueResult = Object.values(uniqueArray);
    const examsResult = uniqueResult?.map((exam) => ({
      examId: exam?.id,
      courseId: exam?.courseId,
      name: exam?.Name,
      description: exam?.Description,
      category: exam?.Category,
      sub_category: exam?.SubCategory,
      type: exam?.type,
      language: ['English'],
      tileImage: exam?.tileImage,
      duration: exam?.Duration
    }));
    console.log('examsResult', examsResult);

    if (!examsResult?.length) return setOnOgingData([]);
    setOnOgingData(examsResult);
    return;
  }, [onGoingExam, examCourseMapping?.scheduleExam, examCourseMapping?.takeAnyTime]);

  useEffect(() => {
    if (!examCourseMapping?.takeAnyTime?.length) return;
    const takeAnyTimeExamArray = [];
    // loop over each exam and check for their attempts

    for (let i = 0; i < examCourseMapping?.takeAnyTime?.length; i++) {
      // console.log(examCourseMapping?.takeAnyTime[i]);
      const filterAttempt = examAttempts?.filter(
        (exam) => exam?.exam_id === examCourseMapping?.takeAnyTime[i]?.examId
      );
      if (parseInt(examCourseMapping?.takeAnyTime[i]?.noAttempts) === -1) {
        takeAnyTimeExamArray.push({ ...examCourseMapping?.takeAnyTime[i] });
      }
      if (filterAttempt?.length < parseInt(examCourseMapping?.takeAnyTime[i]?.noAttempts)) {
        takeAnyTimeExamArray.push({ ...examCourseMapping?.takeAnyTime[i] });
      }
    }
    if (!takeAnyTimeExamArray?.length) setTakeAnyTimeExamsData([]);
    console.log(takeAnyTimeExamArray, 'sfoho');
    setTakeAnyTimeExamsData([
      ...takeAnyTimeExamArray?.map((exam) => ({
        examData: [exam?.Name, exam?.courseName, `${exam?.Duration / 60} mins`],
        examId: exam?.id,
        courseId: exam?.courseId,
        topicId: exam?.topicId
      }))
    ]);
  }, [examCourseMapping?.takeAnyTime]);

  async function loadUserAttemptsAndResults(examId = null) {
    // if (!userGlobalData?.userDetails?.user_lsp_id?.length) return;
    // setIsAttemptsLoaded(false);
    if (!examId) return [];
    if (!userData?.id) return [];
    const id = userData?.id;
    const resAttempts = await loadQueryDataAsync(
      GET_USER_EXAM_ATTEMPTS_BY_EXAMID,
      { userId: id, examIds: examId, filters: {} },
      {},
      userQueryClient
    );
    console.info(resAttempts);
    if (resAttempts?.error)
      return setToastMsg({ type: 'danger', message: 'Error while loading user attempts' });

    // if no attempts are there there wont be any results as well
    if (!resAttempts?.getUserExamAttemptsByExamIds?.length)
      return setLoading(false, setIsAttemptsLoaded(true));

    const examAttemptIds = resAttempts?.getUserExamAttemptsByExamIds?.map(
      (attempt) => attempt?.user_ea_id
    );

    const attempts = resAttempts?.getUserExamAttemptsByExamIds;

    return resAttempts?.getUserExamAttemptsByExamIds;
  }

  const [showTable, setShowTable] = useState('');

  const examTables = [
    {
      name: 'scheduletable',
      tableData: {
        columnHeader: ['Exam Name', 'Course Name', 'Exam Date'],
        rowData: scheduleExamsData
      },
      tableHeading: 'Schedule Exams'
    },
    {
      name: 'anytimetable',
      tableData: {
        columnHeader: ['Exam Name', 'Course Name', 'Duration'],
        rowData: takeAnyTimeExamsData
      },
      tableHeading: 'Take Anytime Exams'
    }
  ];

  const btnOptions = [
    {
      name: 'Schedule Exams',
      isActive: showTable === 'scheduletable',
      handleClick: () => setShowTable('scheduletable')
    },
    {
      name: 'Take Anytime Exams',
      handleClick: () => setShowTable('anytimetable'),
      isActive: showTable === 'anytimetable'
    },
    // {
    //   name: 'Open Available Exams',
    //   handleClick: () => router.push('/exam'),
    //   isActive: false
    // },
    {
      name: 'Completed Exams',
      isActive: false,
      handleClick: () => {
        setShowTable('');
        const y = simpleTableRef.current.offsetTop - 100;
        window?.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  ];

  const columns = [
    {
      field: 'courseName',
      headerName: 'Course Name',
      headerClassName: 'course-list-header',
      flex: 1.5
    },
    {
      field: 'examName',
      headerName: 'Exam Name',
      headerClassName: 'course-list-header',
      flex: 1.5
    },
    {
      field: 'examDate',
      headerName: 'Exam Date',
      headerClassName: 'course-list-header',
      flex: 1
    },
    {
      field: 'examAttempt',
      headerName: 'Attempt',
      headerClassName: 'course-list-header',
      flex: 1
    },
    {
      field: 'examStatus',
      headerName: 'Status',
      headerClassName: 'course-list-header',
      flex: 1
    },
    {
      field: 'examScore',
      headerName: 'Score',
      headerClassName: 'course-list-header',
      flex: 1
    },
    {
      field: 'totalMarks',
      headerName: 'Total Marks',
      headerClassName: 'course-list-header',
      flex: 1
    }
  ];

  const scheduleColumns = [
    {
      field: 'courseName',
      headerName: 'Course Name',
      headerClassName: 'course-list-header',
      flex: 1
    },
    {
      field: 'examName',
      headerName: 'Exam Name',
      headerClassName: 'course-list-header',
      flex: 1
    },
    {
      field: 'examStartDate',
      headerName: 'Exam Date',
      headerClassName: 'course-list-header',
      flex: 1
    }
  ];
  const data = [
    {
      id: 1,
      courseName: 'Leom Ipsum Dolor',
      endDate: '21-3-2022',
      subCategory: 'Java',
      completion: '21%',
      sortable: false
    },
    {
      id: 2,
      courseName: 'Leom Ipsum Dolor1',
      endDate: '21-3-2022',
      subCategory: 'Java',
      completion: '22%',
      sortable: false
    },
    {
      id: 3,
      courseName: 'Leom Ipsum r3',
      endDate: '21-3-2022',
      subCategory: 'Java',
      completion: '43%',
      sortable: false
    },
    {
      id: 4,
      courseName: 'Leom 32r Dolor',
      endDate: '21-3-2022',
      subCategory: 'Java',
      completion: '34%',
      sortable: false
    },

    {
      id: 5,
      courseName: 'Leom Ipsum fd3w4',
      endDate: '21-3-2022',
      subCategory: 'Java',
      completion: '34%',
      sortable: false
    },
    {
      id: 6,
      courseName: 'Leom Ipsum 12e13fw',
      endDate: '21-3-2022',
      subCategory: 'Java',
      completion: '3%',
      sortable: false
    },
    {
      id: 7,
      courseName: 'Lecaeom Ipsum Dolor',
      endDate: '21-3-2022',
      subCategory: 'Java',
      completion: '2%',
      sortable: false,
      cellClassName: 'super-app'
    },
    {
      id: 8,
      courseName: 'dwefae Ipsum Dolor',
      endDate: '21-3-2022',
      subCategory: 'Java',
      completion: '121%',
      sortable: false,
      cellClassName: 'super-app'
    },
    {
      id: 9,
      courseName: 'xaweca Ipsum Dolor',
      endDate: '21-3-2022',
      subCategory: 'Java',
      completion: '221%',
      sortable: false,
      cellClassName: 'super-app'
    },
    {
      id: 10,
      courseName: ' bdgf Ipsum Dolor',
      endDate: '21-3-2022',
      subCategory: 'Java',
      completion: '98%',
      sortable: false,
      cellClassName: 'super-app'
    },
    {
      id: 11,
      courseName: 'myum Ipsum Dolor',
      endDate: '21-3-2022',
      subCategory: 'Java',
      completion: '217%',
      sortable: false,
      cellClassName: 'super-app'
    },
    {
      id: 12,
      courseName: 'LAst Ipsum Dolor',
      endDate: '21-3-2022',
      subCategory: 'Java',
      completion: '100%',
      sortable: false,
      cellClassName: 'super-app'
    },
    {
      id: 13,
      courseName: 'Leom hbed Dolor',
      endDate: '21-3-2022',
      subCategory: 'Java',
      completion: '2761%',
      sortable: false
    }
  ];

  const simpleTableRef = useRef(null);
  useEffect(() => {
    // let isSnapped = false;
    // const observer = new IntersectionObserver((entries) => {
    //   if (entries[0].isIntersecting && !isSnapped) {
    //     simpleTableRef.current?.scrollIntoView(false);
    //     isSnapped = true;
    //   } else {
    //     isSnapped = false;
    //   }
    // });
    // observer.observe(simpleTableRef.current);
    // document.addEventListener('scroll', function (e) {
    //   // lastKnownScrollPosition = window.scrollY;
    //   simpleTableRef.current?.scrollIntoView({
    //     behavior: 'auto',
    //     block: 'end',
    //     inline: 'center'
    //   });
    //   console.log('ref', simpleTableRef);
    // });
  }, []);

  return (
    <div
      className="scrollsnap"
      style={{
        backgroundColor: 'var(--tile-bg)',
        overflow: 'hidden',
        margin: 0,
        padding: 0
      }}>
      <div
        style={{
          // display: 'flex',
          marginTop: '70px',
          // padding: '5vh 4vw',
          height: '75vh',
          overflow: 'hidden'
        }}>
        <ExamHeroSection simpleTableRef={simpleTableRef} />
        {/* <div style={{
          display: 'flex',
          padding: '5vh 4vw',
          backgroundColor: 'var(--black)',
          height: '75vh',
          overflow: 'hidden'
        }}>

        <div
          className={`${showTable ? 'w-20' : 'w-65'} border_right`}
          style={{ margin: 'auto', padding: '60px 0px' }}>
          <Options
            question={showTable ? '' : 'Q. Select the required Option.'}
            btnOptions={btnOptions}
          />
        </div> */}
        {/* {showTable === 'anytimetable' && (
          <div className="w-45 border_right" style={{ background: 'var(--black)', margin: 'auto' }}>
            <SimpleTable
              loading={loading}
              tableData={tableData}
              lastCellObj={buttonObj}
              tableHeading="Take Anytime Exams"
              headingStyle={{
                color: 'var(--white)',
                fontSize: '16px',
                fontWeight: '400',
                textAlign: 'left',
                margin: '0',
                marginLeft: '60px',
                textShadow: 'none',
                textTransform: 'none',
                letterSpacing: '1px'
              }}
            />
          </div>
        )} */}

        {/* {examTables?.map((table) => (
          <>
            {showTable === table?.name && (
              <div
                className="w-45 border_right tableSection"
                style={{ background: 'var(--black)', margin: 'auto' }}>
                <div
                  className="closeTable"
                  onClick={() => {
                    setShowTable('');
                  }}>
                  <img src="/images/circular-cross.png" alt="" />
                </div>
                <SimpleTable
                  loading={loading}
                  tableData={table?.tableData}
                  lastCellObj={buttonObj}
                  tableHeading={table?.tableHeading}
                  headingStyle={{
                    color: 'var(--white)',
                    fontSize: '16px',
                    fontWeight: '400',
                    textAlign: 'left',
                    margin: '0',
                    marginLeft: '60px',
                    textShadow: 'none',
                    textTransform: 'none',
                    letterSpacing: '1px'
                  }}
                />
              </div>
            )}
          </>
        ))} */}

        {/* <div className="w-35 calender_box">
          <CommonCalendar />
        </div>
      </div> */}
      </div>

      {!!examOngoingData?.length && (
        <ZicopsCarousel
          title="Continue with your exam"
          data={examOngoingData}
          handleTitleClick={() =>
            router.push(
              `/search-page?userCourse=${JSON.stringify({ onGoingExam: true })}&type=${
                COURSE_TYPES[3]
              }`,
              '/search-page'
            )
          }
        />
      )}
      {!!learningSpaceCourses?.length && (
        <ZicopsCarousel
          title="Test Series from your learning space"
          data={learningSpaceCourses}
          handleTitleClick={() =>
            router.push(
              `/search-page?filter=${JSON.stringify({
                LspId: sessionStorage.getItem('lsp_id')
              })}&type=${COURSE_TYPES[3]}`,
              '/search-page'
            )
          }
        />
      )}
      {!!latestCourses?.length && (
        <ZicopsCarousel
          title="Latest Test Series"
          data={latestCourses}
          handleTitleClick={() =>
            router.push(`/search-page?type=${COURSE_TYPES[3]}`, '/search-page')
          }
        />
      )}
      {!!subCategory0Courses?.length && (
        <ZicopsCarousel
          title={`Test Series ${activeSubcatArr[0]?.sub_category}`}
          data={subCategory0Courses}
          handleTitleClick={() =>
            router.push(
              `/search-page?subCat=${encodeURIComponent(activeSubcatArr[0]?.sub_category)}&type=${
                COURSE_TYPES[3]
              }`,
              '/search-page'
            )
          }
        />
      )}
      {!!subCategory1Courses?.length && (
        <ZicopsCarousel
          title={`Test Series ${activeSubcatArr[1]?.sub_category}`}
          data={subCategory1Courses}
          handleTitleClick={() =>
            router.push(
              `/search-page?subCat=${encodeURIComponent(activeSubcatArr[1]?.sub_category)}&type=${
                COURSE_TYPES[3]
              }`,
              '/search-page'
            )
          }
        />
      )}
      {!!subCategory2Courses?.length && (
        <ZicopsCarousel
          title={`Test Series ${activeSubcatArr[2]?.sub_category}`}
          data={subCategory2Courses}
          handleTitleClick={() =>
            router.push(
              `/search-page?subCat=${encodeURIComponent(activeSubcatArr[2]?.sub_category)}&type=${
                COURSE_TYPES[3]
              }`,
              '/search-page'
            )
          }
        />
      )}
      {!!subCategory3Courses?.length && (
        <ZicopsCarousel
          title={`Test Series ${activeSubcatArr[3]?.sub_category}`}
          data={subCategory3Courses}
          handleTitleClick={() =>
            router.push(
              `/search-page?subCat=${encodeURIComponent(activeSubcatArr[3]?.sub_category)}&type=${
                COURSE_TYPES[3]
              }`,
              '/search-page'
            )
          }
        />
      )}
      {!!subCategory4Courses?.length && (
        <ZicopsCarousel
          title={`Test Series ${activeSubcatArr[4]?.sub_category}`}
          data={subCategory4Courses}
          handleTitleClick={() =>
            router.push(
              `/search-page?subCat=${encodeURIComponent(activeSubcatArr[4]?.sub_category)}&type=${
                COURSE_TYPES[3]
              }`,
              '/search-page'
            )
          }
        />
      )}
      {!!courseFromPrefernces?.length && (
        // <ZicopsCarousel title="Latest Courses" data={latestCourses} />
        <ZicopsCarousel
          title="Other Test Series"
          data={courseFromPrefernces}
          handleTitleClick={() =>
            router.push(`/search-page?preferredSubCat=true&type=${COURSE_TYPES[3]}`, '/search-page')
          }
        />
      )}

      <div ref={simpleTableRef}>
        <div className="resultContainer">
          <ZicopsSimpleTable
            columns={columns}
            loading={loading}
            data={examResultTableData}
            pageSize={5}
            onHandleChange={inputHandler}
            rowsPerPageOptions={4}
            tableHeight="58vh"
            tableHeading="Your Results"
            headingStyle={{
              color: 'var(--white)',
              width: 'fit-content',
              margin: '0px auto 40px',
              padding: '5px 20px',
              background: 'var(--black)',
              border: '3px solid var(--primary)'
            }}
          />
        </div>
      </div>

      {/* <QuestionSection /> */}
      <style jsx>{`
        .resultContainer {
          background: var(--black);
          border: 4px solid var(--primary);
          height: calc(100vh - 70px);
          box-shadow: inset 0 0 30px 0 #6bcfcf80;
          padding: 50px;
          scroll-snap-align: start;
        }
        .scrollsnap {
          scroll-snap-type: y mandatory;
          scroll-snap-type: mandatory;
          scroll-snap-points-y: repeat(300px);
        }
        .tableSection {
          position: relative;
        }
        .closeTable {
          color: var(--white);
          font-size: 20px;
          cursor: pointer;
          position: absolute;
          right: 1%;
          top: 1%;
          height: 25px;
          width: 25px;
        }
        .closeTable img {
          height: 100%;
          width: 100%;
        }
      `}</style>
    </div>
  );
}
