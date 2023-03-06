import {
  GET_COURSE_TOPICS,
  GET_EXAM_INSTRUCTION,
  GET_EXAM_INSTRUCTION_BY_EXAMID,
  GET_EXAM_META,
  GET_EXAM_SCHEDULE,
  GET_EXAM_SCHEDULE_BY_EXAMID,
  GET_TOPICS_BY_COURSEIDS,
  GET_TOPIC_EXAMS,
  GET_TOPIC_EXAMS_BY_COURSEID,
  queryClient
} from '@/api/Queries';
import { GET_USER_EXAM_ATTEMPTS, GET_USER_EXAM_RESULTS, userQueryClient } from '@/api/UserQueries';
import { SCHEDULE_TYPE } from '@/components/AdminExamComps/Exams/ExamMasterTab/Logic/examMasterTab.helper';
import ExamHeroSection from '@/components/LearnerExamComp/ExamHeroSection';
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
  const [examAttempts, setExamAttempts] = useState([]);
  const [examResults, setExamResults] = useState([]);
  const [examCourseMapping, setExamCourseMapping] = useState({ scheduleExam: [], takeAnyTime: [] });

  const [latestCourses, setLatestCourses] = useState([...Array(skeletonCardCount)]);
  const [learningSpaceCourses, setLearningSpaceCourses] = useState([...Array(skeletonCardCount)]);
  const [subCategory0Courses, setSubCategory0Courses] = useState([...Array(skeletonCardCount)]);
  const [subCategory1Courses, setSubCategory1Courses] = useState([...Array(skeletonCardCount)]);
  const [subCategory2Courses, setSubCategory2Courses] = useState([...Array(skeletonCardCount)]);
  const [subCategory3Courses, setSubCategory3Courses] = useState([...Array(skeletonCardCount)]);
  const [subCategory4Courses, setSubCategory4Courses] = useState([...Array(skeletonCardCount)]);

  const [onGoingExam, setOnGoingExam] = useState([]);
  const [examOngoingData, setOnOgingData] = useRecoilState(OnGoingExamAtom);
  // const userGlobalData = useRecoilValue(UserDataAtom);

  const [loading, setLoading] = useState(false);
  const [isAttemptsLoaded, setIsAttemptsLoaded] = useState(false);

  // reset recoil
  useEffect(() => {
    setOnGoingExam([...Array(skeletonCardCount)]);
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
    console.log(examResults, 'examresult');
    if (!examResults?.length) return setLoading(false);

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
        console.log(examCourseMapping);
        for (let j = 0; j < examCourseMapping?.takeAnyTime?.length; j++) {
          if (examResults[i]?.exam_id === examCourseMapping?.takeAnyTime[j]?.examId) {
            examFinalResult.push({ ...examResults[i], ...examCourseMapping?.takeAnyTime[j] });
          }
        }
      }
    }
    console.log(examFinalResult);
    // console.log(examFinalResult, 'final reult');
    //formating exam result table data
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
    console.log(examsResult);
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
    loadUserAttemptsAndResults();
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
    console.log(id);
    const resAttempts = await loadQueryDataAsync(
      GET_USER_EXAM_ATTEMPTS,
      { user_id: id, exam_id: examId },
      {},
      userQueryClient
    );
    console.log(resAttempts);
    if (resAttempts?.error)
      return setToastMsg({ type: 'danger', message: 'Error while loading user attempts' });

    // if no attempts are there there wont be any results as well
    if (!resAttempts?.getUserExamAttempts?.length)
      return setLoading(false, setIsAttemptsLoaded(true));

    const examAttemptIds = resAttempts?.getUserExamAttempts?.map((attempt) => attempt?.user_ea_id);

    const attempts = resAttempts?.getUserExamAttempts;
    // return;

    //   setExamAttempts([...attempts], setIsAttemptsLoaded(true));

    //   const onGoingAttempts = attempts?.filter(
    //     (attemp) => attemp?.attempt_status?.toLowerCase() !== 'completed'
    //   );

    //  setOnGoingExam([...onGoingAttempts])
    //  console.log("onGoingAttempts",onGoingAttempts )
    //  console.log("attempts", attempts)
    //   const completedAttempts = attempts?.filter(
    //     (attemp) => {
    //       console.log(attemp?.attempt_status?.toLowerCase(), attemp?.attempt_status?.toLowerCase() === 'completed');
    //       return attemp?.attempt_status?.toLowerCase() === 'completed'
    //     }
    //   );
    //   console.log("completedAttempts", completedAttempts)
    //   let newCompleteAttempts;
    //   for (let i = 0; i < attempts?.length; i++) {
    //     const results = await loadQueryDataAsync(
    //       GET_USER_EXAM_RESULTS,
    //       {user_ea_details:[{ user_id: id, user_ea_id: completedAttempts[i]?.user_ea_id }]},
    //       {},
    //       userQueryClient
    //     );
    //     if (results?.getUserExamResults) {
    //       console.log(JSON.parse(results?.getUserExamResults[0]?.results[0]?.result_status).totalMarks, 'results');
    //       newCompleteAttempts = completedAttempts?.map((r) => {
    //         return (
    //           {
    //             ...r,
    //              total:JSON.parse(results?.getUserExamResults[0]?.results[0]?.result_status).totalMarks,
    //              score: results?.getUserExamResults[0]?.results[0]?.user_score
    //           }
    //         )
    //       })
    //       }
    //       console.log("newCompleteAttempts", newCompleteAttempts)
    //   }

    // if (newCompleteAttempts?.length) return setExamResults([...newCompleteAttempts]);
    return resAttempts?.getUserExamAttempts;
  }

  // async function getTopics(courseId = null) {
  //   //return an empty array in case of error

  //   if (!courseId) return [];
  //   const topicRes = await loadQueryDataAsync(
  //     GET_TOPICS_BY_COURSEIDS,
  //     { course_id: courseId },
  //     {},
  //     queryClient
  //   );
  //   if (topicRes?.error) return [];
  //   if (!topicRes?.getTopics?.length) return [];
  //   return [...topicRes?.getTopics];
  // }
  async function getTopics(courseIds = []) {
    //return an empty array in case of error

    if (!courseIds) return [];
    const topicRes = await loadQueryDataAsync(
      GET_TOPICS_BY_COURSEIDS,
      { course_ids: courseIds },
      {},
      queryClient
    );
    if (topicRes?.error) return [];
    if (!topicRes?.getTopics?.length) return [];
    return [...topicRes?.getTopics];
  }

  async function getTopicExams(courseIds = []) {
    if (!topicId) return [];
    const examRes = await loadQueryDataAsync(
      GET_TOPIC_EXAMS_BY_COURSEID,
      { course_ids: courseIds },
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

  async function getExamSchedule(exam_ids = null) {
    if (!exam_ids) return [];
    const examSchedule = await loadQueryDataAsync(
      GET_EXAM_SCHEDULE_BY_EXAMID,
      { exam_ids: exam_ids },
      {},
      queryClient
    );
    if (examSchedule?.error) return [];
    if (!examSchedule?.getExamSchedule?.length) return [];
    return [...examSchedule?.getExamSchedule];
  }

  async function getExamInstruction(examIds = []) {
    if (!examIds) return [];
    const examInstruction = await loadQueryDataAsync(
      GET_EXAM_INSTRUCTION_BY_EXAMID,
      { exam_ids: examIds },
      {},
      queryClient
    );
    if (examInstruction?.error) return [];
    if (!examInstruction?.getExamInstruction?.length) return [];
    return [...examInstruction?.getExamInstruction];
  }

  // async function loadExamData() {
  //   // userCourseMap -> topics => examsmetas => userExamAttempts =>
  //   // for schedule exams => exam schedule
  //   // for anytime exam -> userExamReuslts

  //   // await loadUserAttemptsAndResults();

  //   const topicCourseMap = [];
  //   const courseData = await getUserCourseData(30);
  //   if (!courseData?.length) return setLoading(false);
  //   //filtering course data if id doesnt exist
  //   const _courseData = courseData?.filter((course) => !!course?.id);
  //   console.log('_courseData', _courseData);
  //   // let courseId = []
  //   const courseIds = _courseData?.map((course) => course?.id);
  //   const courseTopics = await getTopics(courseIds);
  //   let assessmentTopics = [];
  //   // need later for courses down exam
  //   let assessmentCourses = [];
  //   for (let i = 0; i < _courseData?.length; i++) {
  //     if (!courseTopics?.length) continue;
  //     const filteredTopics = courseTopics?.filter(
  //       (topic) => topic?.type?.toLowerCase() === 'assessment'
  //     );
  //     if (!filteredTopics?.length) continue;
  //     assessmentTopics = assessmentTopics.concat(filteredTopics);
  //     assessmentCourses = assessmentCourses.concat(_courseData[i]);
  //     // resultData.push({courseName:_courseData[i]?.name , topics: filteredTopics});
  //     for (let j = 0; j < filteredTopics?.length; j++) {
  //       topicCourseMap.push({
  //         [`${filteredTopics[j]?.id}`]: {
  //           courseName: _courseData[i]?.name,
  //           tileImage: _courseData[i]?.tileImage,
  //           type: _courseData[i]?.type,
  //           topicId: filteredTopics[j]?.id,
  //           courseId: _courseData[i]?.id
  //         }
  //       });
  //     }
  //   }

  //   // console.log(assessmentTopics,'assasas',topicDataData)
  //   if (!assessmentTopics?.length) return setLoading(false);

  //   const examCourseMap = [];

  //   // load topic exams
  //   let exams = [];
  //   const topicExams = await getTopicExams(courseIds);
  //   for (let i = 0; i < assessmentTopics?.length; i++) {
  //     if (!topicExams?.length) continue;
  //     examCourseMap.push({
  //       [`${topicExams[0]?.examId}`]: {
  //         courseName: topicCourseMap[i][`${assessmentTopics[i]?.id}`]?.courseName,
  //         tileImage: topicCourseMap[i][`${assessmentTopics[i]?.id}`]?.tileImage,
  //         type: topicCourseMap[i][`${assessmentTopics[i]?.id}`]?.type,
  //         examId: topicExams[0]?.examId,
  //         topicId: topicCourseMap[i][`${assessmentTopics[i]?.id}`]?.topicId,
  //         courseId: topicCourseMap[i][`${assessmentTopics[i]?.id}`]?.courseId
  //       }
  //     });
  //     exams = exams.concat(topicExams);
  //   }
  //   console.log('examCourseMap', examCourseMap);
  //   //loop to take exam related data in one piece

  //   if (!exams?.length) return setLoading(false);

  //   // to get exam metas
  //   const examsIds = exams?.map((exam) => exam?.examId);
  //   const examMetas = await getExamsMeta(examsIds);

  //   //to load exam instructions
  //   for (let i = 0; i < examMetas?.length; i++) {
  //     const examInstruction = await getExamInstruction(examMetas[i]?.id);
  //     if (!examInstruction?.length) continue;
  //     examMetas[i] = {
  //       ...examMetas[i],
  //       instructionId: examInstruction[0]?.id,
  //       passingCriteria: examInstruction[0]?.PassingCriteria,
  //       noAttempts: examInstruction[0]?.NoAttempts
  //     };
  //   }
  //   const allAttempts = [];
  //   for (let i = 0; i < examMetas?.length; i++) {
  //     const examAttempt = await loadUserAttemptsAndResults(examMetas[i]?.id);
  //     console.log('examAttempt', examAttempt);
  //     if (!examAttempt?.length) continue;
  //     allAttempts.push(...examAttempt);
  //     console.log('allAttempts', allAttempts);
  //   }

  //   setExamAttempts([...allAttempts], setIsAttemptsLoaded(true));

  //   const onGoingAttempts = allAttempts?.filter(
  //     (attemp) => attemp?.attempt_status?.toLowerCase() === 'started'
  //   );

  //   setOnGoingExam([...onGoingAttempts]);
  //   console.log('onGoingAttempts', onGoingAttempts);
  //   const completedAttempts = allAttempts?.filter((attemp) => {
  //     console.log(
  //       attemp?.attempt_status?.toLowerCase(),
  //       attemp?.attempt_status?.toLowerCase() === 'completed'
  //     );
  //     return attemp?.attempt_status?.toLowerCase() === 'completed';
  //   });
  //   console.log('completedAttempts', completedAttempts);
  //   let newCompleteAttempts = [];
  //   if (!userData?.id) return [];
  //   const id = userData?.id;
  //   for (let i = 0; i < completedAttempts?.length; i++) {
  //     // if (!completedAttempts[i]?.user_ea_id) return;
  //     const results = await loadQueryDataAsync(
  //       GET_USER_EXAM_RESULTS,
  //       { user_ea_details: [{ user_id: id, user_ea_id: completedAttempts[i]?.user_ea_id }] },
  //       {},
  //       userQueryClient
  //     );
  //     if (results?.getUserExamResults) {
  //       console.log('results?.getUserExamResults', results?.getUserExamResults);
  //       console.log('completedAttempts', completedAttempts);
  //       completedAttempts?.map((r) => {
  //         if (results?.getUserExamResults[0]?.user_ea_id === r?.user_ea_id) {
  //           console.log('index', results?.getUserExamResults[0]?.results[0]?.user_score);
  //           newCompleteAttempts.push({
  //             ...r,
  //             total: JSON.parse(results?.getUserExamResults[0]?.results[0]?.result_status)
  //               .totalMarks,
  //             score: results?.getUserExamResults[0]?.results[0]?.user_score
  //           });
  //         }
  //       });
  //     }

  //     console.log('newCompleteAttempts', newCompleteAttempts);
  //   }
  //   const UniqueCompleteAttempts = newCompleteAttempts.reduce((acc, curr) => {
  //     if (!acc[curr.user_ea_id]) {
  //       acc[curr.user_ea_id] = curr;
  //     }
  //     return acc;
  //   }, {});

  //   const uniquAttemps = Object.values(UniqueCompleteAttempts);
  //   console.log('uniquAttemps', uniquAttemps);
  //   if (newCompleteAttempts?.length) {
  //     setExamResults([...uniquAttemps]);
  //   }

  //   let scheduleExams = [];
  //   let takeAnyTimeExams = [];

  //   //adding course name to each of them

  //   examMetas?.forEach((exam, index) => {
  //     if (exam?.ScheduleType?.toLowerCase() === SCHEDULE_TYPE[0]) {
  //       scheduleExams.push({ ...exam, ...examCourseMap[index]?.[`${exam?.id}`] });
  //       return;
  //     }
  //     takeAnyTimeExams.push({ ...exam, ...examCourseMap[index]?.[`${exam?.id}`] });
  //     return;
  //   });

  //   // scheduleExam:[],takeAnyTime:[]
  //   setExamCourseMapping({ scheduleExam: [...scheduleExams], takeAnyTime: [...takeAnyTimeExams] });

  //   if (scheduleExams.length) {
  //     for (let i = 0; i < scheduleExams?.length; i++) {
  //       const schedule = await getExamSchedule(scheduleExams[i]?.id);
  //       if (!schedule?.length) continue;
  //       scheduleExams[i] = { ...scheduleExams[i], ...schedule[0] };
  //     }
  //   }
  //   // console.log(takeAnyTimeExams, scheduleExams);
  //   // if (!examAttempts?.length) return setTakeAnyTimeExams([...takeAnyTimeExams]);

  //   let currentTime = getUnixFromDate();

  //   let sExams = scheduleExams?.filter((exam) => parseInt(exam?.Start) > currentTime);

  //   setScheduleExamsData(
  //     sExams?.map((exam) => ({
  //       examData: [
  //         exam?.Name,
  //         exam?.courseName,
  //         moment.unix(exam?.Start).format('LLL')
  //         // examTime:
  //       ],
  //       examId: exam?.id,
  //       courseId: exam?.courseId,
  //       topicId: exam?.topicId
  //     })),
  //     setLoading(false)
  //   );

  //   // setScheduleExamsData(
  //   //   sExams?.map((exam) => ({
  //   //     id: exam?.examId,
  //   //     examName: exam?.Name,
  //   //     courseName: exam?.courseName,
  //   //     examStartDate: moment.unix(exam?.Start).format('LLL'),
  //   //     // examTime:
  //   //   }))
  //   // );

  //   // new Date(+exam?.Start * 1000).toDateString()

  //   // const scheduleExamsWithAttempt = scheduleExams?.filter(
  //   //   (exam) => parseInt(exam?.noAttempts) > 0
  //   // );
  //   // setTake;
  //   //for takeanytime exam check for a state to make sure if exams are loaded or not
  // }

  const [showTable, setShowTable] = useState('');

  // const resultTableRef = useRef();

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

      {/* <ZicopsCarousel title="Test Packages" data={sliderImages} /> */}
      {/* <ZicopsCarousel title="Your assessments" data={sliderImages} /> */}
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
      {/* <ZicopsCarousel title="Quesiton Banks" data={sliderImages} /> */}
      {/* <ZicopsCarousel data={sliderImages} /> */}
      {/* <BigCardSlider title="X-Athons" data={bigImages} slide={realSquare} /> */}
      {/* <div ref={simpleTableRef} style={{marginBottom:'20px'}}></div> */}
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
