import {
  GET_COURSE_TOPICS,
  GET_EXAM_INSTRUCTION,
  GET_EXAM_META,
  GET_EXAM_SCHEDULE,
  GET_TOPIC_EXAMS,
  queryClient
} from '@/api/Queries';
import { GET_USER_EXAM_ATTEMPTS, GET_USER_EXAM_RESULTS, userQueryClient } from '@/api/UserQueries';
import { SCHEDULE_TYPE } from '@/components/AdminExamComps/Exams/ExamMasterTab/Logic/examMasterTab.helper';
import ZicopsTable from '@/components/common/ZicopsTable';
import { loadQueryDataAsync } from '@/helper/api.helper';
import useUserCourseData from '@/helper/hooks.helper';
import { getUnixFromDate, parseJson } from '@/helper/utils.helper';
import { UserDataAtom } from '@/state/atoms/global.atom';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { bigImages, sliderImages } from '../API/DemoSliderData';
import CommonCalendar from '../components/common/CommonCalendar';
import SimpleTable from '../components/common/SimpleTable';
import ZicopsSimpleTable from '../components/common/ZicopsSimpleTable';
import Options from '../components/Exams/Options';
import BigCardSlider from '../components/medium/BigCardSlider';
import ZicopsCarousel from '../components/ZicopsCarousel';

export default function LearnerExams() {
  const router = useRouter();
  const [takeAnyTimeExamsData, setTakeAnyTimeExamsData] = useState([]);
  const [scheduleExamsData, setScheduleExamsData] = useState([]);
  const [examAttempts, setExamAttempts] = useState([]);
  const [examResults, setExamResults] = useState([]);
  const [examCourseMapping, setExamCourseMapping] = useState([]);
  const [examResultTableData, setExamResultTableData] = useState([]);
  const userGlobalData = useRecoilValue(UserDataAtom);

  const [loading, setLoading] = useState(false);

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
  const { getUserCourseData } = useUserCourseData();

  useEffect(() => {
    // console.log(screen.width);
    setLoading(true);
    loadUserAttemptsAndResults();
    loadExamData();
  }, []);

  useEffect(() => {
    // console.log(examResults,'examreso')
    if (!examResults?.length) return;
    if (!examCourseMapping?.length) return;
    //loop to finally add results and course name
    const examFinalResult = [];

    for (let i = 0; i < examResults?.length; i++) {
      // examFinalResult.push({...examResults[i] ,...examCourseMapping[`${examResults[i]?.exam_id}`] })
      for (let j = 0; j < examCourseMapping?.length; j++) {
        if (examResults[i]?.exam_id === examCourseMapping[j]?.examId) {
          examFinalResult.push({ ...examResults[i], ...examCourseMapping[j] });
        }
      }
    }
    // console.log(examFinalResult, 'final reult');
    //formating exam result table data
    const examsResult = examFinalResult?.map((exam) => ({
      id: exam?.user_ea_id,
      courseName: exam?.courseName,
      examName: exam?.Name,
      examDate: moment.unix(exam?.created_at).format('DD/MM/YYYY'),
      examAttempt: exam?.attempt_no,
      examStatus: exam?.attempt_status?.toUpperCase(),
      examScore: exam?.score,
      totalMarks: parseJson(exam?.result_status)?.totalMarks
    }));

    if (!examsResult?.length) return;
    setExamResultTableData([...examsResult]);
    return;
  }, [examResults, examCourseMapping]);

  useEffect(() => {
    console.log(scheduleExamsData, 'exam esche');
  }, [scheduleExamsData]);

  async function loadUserAttemptsAndResults() {
    if (!userGlobalData?.userDetails?.user_lsp_id?.length) return;
    const { user_lsp_id, id } = userGlobalData?.userDetails;
    const resAttempts = await loadQueryDataAsync(
      GET_USER_EXAM_ATTEMPTS,
      { user_id: id, user_lsp_id: user_lsp_id },
      {},
      userQueryClient
    );
    if (resAttempts?.error)
      return setToastMsg({ type: 'danger', message: 'Error while loading user attempts' });

    // if no attempts are there there wont be any results as well
    if (!resAttempts?.getUserExamAttempts?.length) return setLoading(false);

    const examAttemptIds = resAttempts?.getUserExamAttempts?.map((attempt) => attempt?.user_ea_id);

    const attempts = resAttempts?.getUserExamAttempts;
    // return;

    setExamAttempts([...attempts]);

    for (let i = 0; i < attempts?.length; i++) {
      const results = await loadQueryDataAsync(
        GET_USER_EXAM_RESULTS,
        { user_id: id, user_ea_id: attempts[i]?.user_ea_id },
        {},
        userQueryClient
      );
      // console.log(results, 'results');
      if (results?.getUserExamResults) {
        attempts[i] = {
          ...attempts[i],
          result_status: results?.getUserExamResults?.result_status,
          score: results?.getUserExamResults?.user_score
        };
      }
    }
    const completedAttempts = attempts?.filter(
      (attemp) => attemp?.attempt_status?.toLowerCase() === 'completed'
    );
    if (completedAttempts?.length) return setExamResults([...completedAttempts]);
  }

  async function getTopics(courseId = null) {
    //return an empty array in case of error

    if (!courseId) return [];
    const topicRes = await loadQueryDataAsync(
      GET_COURSE_TOPICS,
      { course_id: courseId },
      {},
      queryClient
    );
    if (topicRes?.error) return [];
    if (!topicRes?.getTopics?.length) return [];
    return [...topicRes?.getTopics];
  }

  async function getTopicExams(topicId = null) {
    if (!topicId) return [];
    const examRes = await loadQueryDataAsync(
      GET_TOPIC_EXAMS,
      { topic_id: topicId },
      {},
      queryClient
    );
    if (examRes?.error) return [];
    if (!examRes?.getTopicExams?.length) return [];
    return [...examRes?.getTopicExams];
  }

  async function getExamsMeta(examIds = []) {
    if (!examIds?.length) return;
    const examMetaRes = await loadQueryDataAsync(
      GET_EXAM_META,
      { exam_ids: examIds },
      {},
      queryClient
    );
    if (examMetaRes?.error) return [];
    if (!examMetaRes?.getExamsMeta?.length) return [];
    return [...examMetaRes?.getExamsMeta];
  }

  async function getExamSchedule(examId = null) {
    if (!examId) return [];
    const examSchedule = await loadQueryDataAsync(
      GET_EXAM_SCHEDULE,
      { exam_id: examId },
      {},
      queryClient
    );
    if (examSchedule?.error) return [];
    if (!examSchedule?.getExamSchedule?.length) return [];
    return [...examSchedule?.getExamSchedule];
  }

  async function getExamInstruction(examId = null) {
    if (!examId) return [];
    const examInstruction = await loadQueryDataAsync(
      GET_EXAM_INSTRUCTION,
      { exam_id: examId },
      {},
      queryClient
    );
    if (examInstruction?.error) return [];
    if (!examInstruction?.getExamInstruction?.length) return [];
    return [...examInstruction?.getExamInstruction];
  }

  async function loadExamData() {
    // userCourseMap -> topics => examsmetas => userExamAttempts =>
    // for schedule exams => exam schedule
    // for anytime exam -> userExamReuslts

    await loadUserAttemptsAndResults();

    const topicCourseMap = [];
    const courseData = await getUserCourseData(30);
    if (!courseData?.length) return setLoading(false);
    //filtering course data if id doesnt exist
    const _courseData = courseData?.filter((course) => !!course?.id);
    // let courseId = []
    // const courseIds = _courseData?.map((course) => course?.id);

    let assessmentTopics = [];
    // need later for courses down exam
    let assessmentCourses = [];
    for (let i = 0; i < _courseData?.length; i++) {
      const courseTopics = await getTopics(_courseData[i]?.id);
      if (!courseTopics?.length) continue;
      const filteredTopics = courseTopics?.filter(
        (topic) => topic?.type?.toLowerCase() === 'assessment'
      );
      if (!filteredTopics?.length) continue;
      assessmentTopics = assessmentTopics.concat(filteredTopics);
      assessmentCourses = assessmentCourses.concat(_courseData[i]);
      // resultData.push({courseName:_courseData[i]?.name , topics: filteredTopics});
      for (let j = 0; j < filteredTopics?.length; j++) {
        topicCourseMap.push({
          [`${filteredTopics[j]?.id}`]: {
            courseName: _courseData[i]?.name,
            topicId: filteredTopics[j]?.id
          }
        });
      }
    }

    // console.log(assessmentTopics,'assasas',topicDataData)
    if (!assessmentTopics?.length) return setLoading(false);

    const examCourseMap = [];

    // load topic exams
    let exams = [];
    for (let i = 0; i < assessmentTopics?.length; i++) {
      const topicExams = await getTopicExams(assessmentTopics[i]?.id);
      if (!topicExams?.length) continue;
      examCourseMap.push({
        [`${topicExams[0]?.examId}`]: {
          courseName: topicCourseMap[i][`${assessmentTopics[i]?.id}`]?.courseName,
          examId: topicExams[0]?.examId
        }
      });
      exams = exams.concat(topicExams);
    }

    //loop to take exam related data in one piece

    if (!exams?.length) return setLoading(false);

    // to get exam metas
    const examsIds = exams?.map((exam) => exam?.examId);
    const examMetas = await getExamsMeta(examsIds);

    //to load exam instructions
    for (let i = 0; i < examMetas?.length; i++) {
      const examInstruction = await getExamInstruction(examMetas[i]?.id);
      if (!examInstruction?.length) continue;
      examMetas[i] = {
        ...examMetas[i],
        instructionId: examInstruction[0]?.id,
        passingCriteria: examInstruction[0]?.PassingCriteria,
        noAttempts: examInstruction[0]?.NoAttempts
      };
    }

    let scheduleExams = [];
    let takeAnyTimeExams = [];

    //adding course name to each of them

    examMetas?.forEach((exam, index) => {
      if (exam?.ScheduleType?.toLowerCase() === SCHEDULE_TYPE[0]) {
        scheduleExams.push({ ...exam, ...examCourseMap[index]?.[`${exam?.id}`] });
        return;
      }
      takeAnyTimeExams.push({ ...exam, ...examCourseMap[index]?.[`${exam?.id}`] });
      return;
    });

    setExamCourseMapping([...scheduleExams, ...takeAnyTimeExams]);

    if (scheduleExams.length) {
      for (let i = 0; i < scheduleExams?.length; i++) {
        const schedule = await getExamSchedule(scheduleExams[i]?.id);
        if (!schedule?.length) continue;
        scheduleExams[i] = { ...scheduleExams[i], ...schedule[0] };
      }
    }
    console.log(takeAnyTimeExams, scheduleExams);
    // if (!examAttempts?.length) return setTakeAnyTimeExams([...takeAnyTimeExams]);

    let currentTime = getUnixFromDate();

    let sExams = scheduleExams?.filter((exam) => parseInt(exam?.Start) > currentTime);
    setScheduleExamsData(
      sExams?.map((exam) => [
        exam?.Name,
        exam?.courseName,
        moment.unix(exam?.Start).format('LLL')
        // examTime:
      ]),
      setLoading(false)
    );

    // setScheduleExamsData(
    //   sExams?.map((exam) => ({
    //     id: exam?.examId,
    //     examName: exam?.Name,
    //     courseName: exam?.courseName,
    //     examStartDate: moment.unix(exam?.Start).format('LLL'),
    //     // examTime:
    //   }))
    // );

    // new Date(+exam?.Start * 1000).toDateString()

    // const scheduleExamsWithAttempt = scheduleExams?.filter(
    //   (exam) => parseInt(exam?.noAttempts) > 0
    // );
    const takeAnyTimeExamsWithAttempt = takeAnyTimeExams?.filter(
      (exam) => parseInt(exam?.noAttempts) > 0
    );

    // declare a flag in order  to see if the exam can be on table or not. for exam having exhausted attempt dont push into array, other wise push them
  }

  const [showTable, setShowTable] = useState('');

  // const resultTableRef = useRef();

  const examTables = [
    {
      name: 'scheduletable',
      tableData: (tableData = {
        columnHeader: ['Exam Name', 'Course Name', 'Exam Date'],
        rowData: scheduleExamsData
      }),
      tableHeading:'Schedule Exams'
    },
    {
      name: 'anytimetable',
      tableData: (tableData = {
        columnHeader: ['Exam Name', 'Course Name', 'Duration'],
        rowData: takeAnyTimeExamsData
      }),
      tableHeading:'Take Anytime Exams'
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
        setShowTable('')
        const y = simpleTableRef.current.offsetTop - 100;
        // console.log(y);
        // simpleTableRef?.current?.scrollIntoView({
        //   top: y,
        //   behavior: 'smooth'
        // });
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
          display: 'flex',
          marginTop: '70px',
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
        </div>

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
        {examTables?.map((table) => (
          <>
            {showTable === table?.name && (
              <div
                className="w-45 border_right"
                style={{ background: 'var(--black)', margin: 'auto' }}>
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
        ))}

        <div className="w-35 calender_box">
          <CommonCalendar />
        </div>
      </div>

      <ZicopsCarousel title="Test Packages" data={sliderImages} />
      <ZicopsCarousel title="Your assessments" data={sliderImages} />
      <ZicopsCarousel title="Quesiton Banks" data={sliderImages} />
      <ZicopsCarousel data={sliderImages} />
      <BigCardSlider title="X-Athons" data={bigImages} slide={realSquare} />
      {/* <div ref={simpleTableRef} style={{marginBottom:'20px'}}></div> */}
      <div ref={simpleTableRef}>
        <div className="resultContainer">
          <ZicopsSimpleTable
            columns={columns}
            loading={loading}
            data={examResultTableData}
            pageSize={5}
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
      `}</style>
    </div>
  );
}
