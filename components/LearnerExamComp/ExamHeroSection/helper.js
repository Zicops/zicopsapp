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
import { loadQueryDataAsync } from '@/helper/api.helper';
import useUserCourseData from '@/helper/hooks.helper';
import { getUnixFromDate } from '@/helper/utils.helper';
import { UserDataAtom } from '@/state/atoms/global.atom';
import moment from 'moment';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

export const useExamData = () => {
  const { getUserCourseData } = useUserCourseData();
  const [userGlobalData, setUserGlobalData] = useRecoilState(UserDataAtom);
  const [isAttemptsLoaded, setIsAttemptsLoaded] = useState(false);
  const [examAttempts, setExamAttempts] = useState([]);
  const [examResults, setExamResults] = useState([]);
  const [loading, setLoading] = useState(false);
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

  // async function loadUserAttemptsAndResults(examId = null) {
  //    console.log(examId);
  //   if (!examId) return [];
  //   const { id } = userGlobalData?.userDetails;
  //   console.log(id);
  //   const resAttempts = await loadQueryDataAsync(
  //     GET_USER_EXAM_ATTEMPTS,
  //     { user_id: id, exam_id: examId },
  //     {},
  //     userQueryClient
  //    );
  //    console.log(resAttempts?.getUserExamAttempts);
  //   if (resAttempts?.error)
  //     return setToastMsg({ type: 'danger', message: 'Error while loading user attempts' });

  //   // if no attempts are there there wont be any results as well
  //   if (!resAttempts?.getUserExamAttempts?.length)
  //     return ;

  //   const examAttemptIds = resAttempts?.getUserExamAttempts?.map((attempt) => attempt?.user_ea_id);

  //   const attempts = resAttempts?.getUserExamAttempts;
  //   const completedAttempts = attempts?.filter(
  //     (attemp) => attemp?.attempt_status?.toLowerCase() === 'completed'
  //   );
  //   // return;
  //   console.log(attempts);
  //   setExamAttempts([...completedAttempts], setIsAttemptsLoaded(true));

  //   for (let i = 0; i < completedAttempts?.length; i++) {
  //     const results = await loadQueryDataAsync(
  //       GET_USER_EXAM_RESULTS,
  //       {user_ea_details:[{ user_id: id, user_ea_id: completedAttempts[i]?.user_ea_id }]},
  //       {},
  //       userQueryClient
  //     );
  //     console.log(results?.getUserExamResults, 'results');
  //       setExamResults(results?.getUserExamResults)
  //     if (results?.getUserExamResults) {
  //       attempts[i] = {
  //         ...attempts[i],
  //         result_status: results?.getUserExamResults?.result_status,
  //         score: results?.getUserExamResults?.user_score
  //       };
  //     }
  //   }

  //    return examResults;
  // }
  async function loadExamData() {
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
            topicId: filteredTopics[j]?.id,
            courseId: _courseData[i]?.id
          }
        });
      }
    }
    // console.log(assessmentTopics,'assasas',topicDataData)
    if (!assessmentTopics?.length) return setLoading(false);

    const examCourseMap = {};

    // load topic exams
    let exams = [];
    for (let i = 0; i < assessmentTopics?.length; i++) {
      const topicExams = await getTopicExams(assessmentTopics[i]?.id);
      console.log('topicExams', topicExams);
      if (!topicExams?.length) continue;
      examCourseMap[topicExams[0]?.examId] = {
        courseName: topicCourseMap[i][`${assessmentTopics[i]?.id}`]?.courseName,
        examId: topicExams[0]?.examId,
        topicId: topicCourseMap[i][`${assessmentTopics[i]?.id}`]?.topicId,
        courseId: topicCourseMap[i][`${assessmentTopics[i]?.id}`]?.courseId
      };
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
    // to load exam
    //   let completedExam;
    //   for (let i = 0; i < examMetas?.length; i++){
    //     const examAttempt = await loadUserAttemptsAndResults(examMetas[i]?.id);
    //     console.log(examAttempt);
    //     if (examAttempt) {
    //       completedExam = examAttempt;

    //     }
    //     if (!examAttempt?.length) continue;
    //  }
    let scheduleExams = [];
    let takeAnyTimeExams = [];

    //adding course name to each of them
    examMetas?.forEach((exam, index) => {
      if (exam?.ScheduleType?.toLowerCase() === SCHEDULE_TYPE[0]) {
        scheduleExams.push({ ...exam, ...examCourseMap?.[`${exam?.id}`] });
        return;
      }
      takeAnyTimeExams.push({ ...exam, ...examCourseMap?.[`${exam?.id}`] });
      return;
    });
    // scheduleExam:[],takeAnyTime:[]
    // setExamCourseMapping({ scheduleExam: [...scheduleExams], takeAnyTime: [...takeAnyTimeExams] });


    if (scheduleExams.length) {
      for (let i = 0; i < scheduleExams?.length; i++) {
        const schedule = await getExamSchedule(scheduleExams[i]?.id);
        if (!schedule?.length) continue;
        scheduleExams[i] = { ...scheduleExams[i], ...schedule[0] };
      }
    }
    // console.log(takeAnyTimeExams, scheduleExams);
    // if (!examAttempts?.length) return setTakeAnyTimeExams([...takeAnyTimeExams]);

    let currentTime = getUnixFromDate();

    let sExams = scheduleExams?.filter((exam) => parseInt(exam?.Start) > currentTime);

    const scheduleExamData = sExams?.map((exam) => ({
      examId: exam?.id,
      courseId: exam?.courseId,
      topicId: exam?.topicId,
      examName: exam?.Name,
      courseName: exam?.courseName,
      examDate: moment.unix(exam?.Start).format('LLL')
    }));
    return {
      scheduleExams: scheduleExamData,
      takeAnyTimeExams: takeAnyTimeExams
      // completedAttempts: completedExam
    };
  }
  return {
    loadExamData
  };
};
