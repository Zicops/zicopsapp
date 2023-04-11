import {
  GET_EXAM_INSTRUCTION_BY_EXAMID,
  GET_EXAM_META,
  GET_EXAM_SCHEDULE_BY_EXAMID,
  GET_TOPICS_BY_COURSEIDS,
  GET_TOPIC_EXAMS_BY_COURSEID,
  queryClient
} from '@/api/Queries';
import {
  GET_USER_EXAM_ATTEMPTS_BY_EXAMID,
  GET_USER_EXAM_RESULTS,
  userQueryClient
} from '@/api/UserQueries';
import { SCHEDULE_TYPE } from '@/components/AdminExamComps/Exams/ExamMasterTab/Logic/examMasterTab.helper';
import { loadQueryDataAsync } from '@/helper/api.helper';
import useUserCourseData from '@/helper/hooks.helper';
import { getUnixFromDate } from '@/helper/utils.helper';
import { UserStateAtom } from '@/state/atoms/users.atom';
import moment from 'moment';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

export const useExamData = () => {
  const { getUserCourseData } = useUserCourseData();
  const userData = useRecoilValue(UserStateAtom);
  const [examResults, setExamResults] = useState([]);
  const [examAttempts, setExamAttempts] = useState([]);
  const [onGoingExam, setOnGoingExam] = useState([]);
  const [examCourseMapping, setExamCourseMapping] = useState({
    scheduleExam: [],
    takeAnyTime: []
  });
  const [loading, setLoading] = useState(false);
  const [isAttemptsLoaded, setIsAttemptsLoaded] = useState(false);

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
    if (!topicRes?.getTopicsByCourseIds?.length) return [];
    return [...topicRes?.getTopicsByCourseIds];
  }

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

  async function getTopicExams(courseIds = []) {
    if (!courseIds) return [];
    const examRes = await loadQueryDataAsync(
      GET_TOPIC_EXAMS_BY_COURSEID,
      { course_ids: courseIds },
      {},
      queryClient
    );

    if (examRes?.error) return [];
    if (!examRes?.getTopicExamsByCourseIds?.length) return [];
    return [...examRes?.getTopicExamsByCourseIds];
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

  async function getExamSchedule(examId = []) {
    if (!examId) return [];
    const examSchedule = await loadQueryDataAsync(
      GET_EXAM_SCHEDULE_BY_EXAMID,
      { exam_ids: examId },
      {},
      queryClient
    );
    if (examSchedule?.error) return [];
    if (!examSchedule?.getExamScheduleByExamId?.length) return [];
    return [...examSchedule?.getExamScheduleByExamId];
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
    if (!examInstruction?.getExamInstructionByExamId?.length) return [];
    return [...examInstruction?.getExamInstructionByExamId];
  }

  async function loadExamData() {
    const topicCourseMap = [];
    const courseData = await getUserCourseData(30);
    if (!courseData?.length) return setLoading(false);
    //filtering course data if id doesnt exist
    const _courseData = courseData?.filter((course) => !!course?.id);
    const courseIds = _courseData?.map((data) => data?.id);

    const courseTopics = await getTopics(courseIds);

    let assessmentTopics = [];
    // need later for courses down exam
    let assessmentCourses = [];

    const filteredTopics = courseTopics?.filter(
      (topic) => topic?.type?.toLowerCase() === 'assessment'
    );
    assessmentTopics = assessmentTopics.concat(filteredTopics);
    for (let i = 0; i < _courseData?.length; i++) {
      if (!filteredTopics?.length) continue;
      assessmentCourses = assessmentCourses.concat(_courseData[i]);
      // resultData.push({courseName:_courseData[i]?.name , topics: filteredTopics});
      for (let j = 0; j < filteredTopics?.length; j++) {
        if (_courseData?.[i].id === filteredTopics?.[j].courseId) {
          topicCourseMap.push({
            [`${filteredTopics[j]?.id}`]: {
              courseName: _courseData[i]?.name,
              topicId: filteredTopics[j]?.id,
              courseId: _courseData[i]?.id
            }
          });
        }
      }
    }

    if (!assessmentTopics?.length) return setLoading(false);
    const examCourseMap = {};

    // // load topic exams
    let exams = [];
    const topicExams = await getTopicExams(courseIds);
    if (!topicExams?.length) return [];
    for (let i = 0; i < assessmentTopics?.length; i++) {
      examCourseMap[topicExams[i]?.examId] = {
        courseName: topicCourseMap[i]?.[`${assessmentTopics[i]?.id}`]?.courseName,
        examId: topicExams[i]?.examId,
        topicId: topicCourseMap[i][`${assessmentTopics[i]?.id}`]?.topicId,
        courseId: topicCourseMap[i][`${assessmentTopics[i]?.id}`]?.courseId
      };
      exams = exams.concat(topicExams);
    }

    //loop to take exam related data in one piece
    if (!exams?.length) return setLoading(false);

    const examIds = topicExams?.map((data) => data?.examId);
    const examMetas = await getExamsMeta(examIds);

    const examInstruction = await getExamInstruction(examIds);
    for (let i = 0; i < examMetas?.length; i++) {
      examMetas[i] = {
        ...examMetas[i],
        instructionId: examInstruction[i]?.id,
        passingCriteria: examInstruction[i]?.PassingCriteria,
        noAttempts: examInstruction[i]?.NoAttempts
      };
    }

    const allAttempts = [];

    const examMetasId = examMetas?.map((data) => data?.id);
    const examAttempt = await loadUserAttemptsAndResults(examMetasId);

    allAttempts?.push(...examAttempt);

    setExamAttempts([...allAttempts], setIsAttemptsLoaded(true));

    const onGoingAttempts = allAttempts?.filter(
      (attemp) => attemp?.attempt_status?.toLowerCase() === 'started'
    );

    setOnGoingExam([...onGoingAttempts]);

    const completedAttempts = allAttempts?.filter((attemp) => {
      return attemp?.attempt_status?.toLowerCase() === 'completed';
    });
    const UniqueCompleteAttempt = completedAttempts.reduce((acc, curr) => {
      if (!acc[curr.user_ea_id]) {
        acc[curr.user_ea_id] = curr;
      }
      return acc;
    }, {});

    const completedUniquAttemps = Object.values(UniqueCompleteAttempt);

    let newCompleteAttempts = [];
    if (!userData?.id) return [];
    const id = userData?.id;
    for (let i = 0; i < completedUniquAttemps?.length; i++) {
      // if (!completedAttempts[i]?.user_ea_id) return;
      const results = await loadQueryDataAsync(
        GET_USER_EXAM_RESULTS,
        { user_ea_details: [{ user_id: id, user_ea_id: completedUniquAttemps[i]?.user_ea_id }] },
        {},
        userQueryClient
      );
      if (results?.getUserExamResults) {
        completedUniquAttemps?.map((r) => {
          if (results?.getUserExamResults[0]?.user_ea_id === r?.user_ea_id) {
            newCompleteAttempts.push({
              ...r,
              total: JSON.parse(results?.getUserExamResults[0]?.results[0]?.result_status)
                .totalMarks,
              score: results?.getUserExamResults[0]?.results[0]?.user_score
            });
          }
        });
      }
    }
    const UniqueCompleteAttempts = newCompleteAttempts.reduce((acc, curr) => {
      if (!acc[curr.user_ea_id]) {
        acc[curr.user_ea_id] = curr;
      }
      return acc;
    }, {});

    const uniquAttemps = Object.values(UniqueCompleteAttempts);
    if (newCompleteAttempts?.length) {
      setExamResults([...uniquAttemps]);
    }

    let scheduleExams = [];
    let takeAnyTimeExams = [];

    examMetas?.forEach((exam, index) => {
      if (exam?.ScheduleType?.toLowerCase() === SCHEDULE_TYPE[0]) {
        scheduleExams.push({ ...exam, ...examCourseMap?.[`${exam?.id}`] });
        return;
      }
      takeAnyTimeExams.push({ ...exam, ...examCourseMap?.[`${exam?.id}`] });
      return;
    });

    if (scheduleExams.length) {
      const scheduleExamId = scheduleExams?.map((data) => data?.id);
      const schedule = await getExamSchedule(scheduleExamId);
      for (let i = 0; i < scheduleExams?.length; i++) {
        if (!schedule?.length) continue;
        scheduleExams[i] = { ...scheduleExams[i], ...schedule[0] };
      }
    }

    // adding course name to each of them

    let currentTime = getUnixFromDate();
    let sExams = scheduleExams?.filter(
      (exam) => parseInt(exam?.Start) + exam?.Duration + parseInt(exam?.BufferTime) > currentTime
    );

    const scheduleExamData = sExams?.map((exam) => ({
      examId: exam?.id,
      courseId: exam?.courseId,
      topicId: exam?.topicId,
      examName: exam?.Name,
      courseName: exam?.courseName,
      examDate: moment.unix(exam?.Start).format('LLL')
    }));
    setLoading(false);
    setExamCourseMapping({ scheduleExam: [...scheduleExams], takeAnyTime: [...takeAnyTimeExams] });
    return {
      scheduleExams: scheduleExamData,
      takeAnyTimeExams: takeAnyTimeExams
    };
  }

  return {
    loadExamData,
    getTopics,
    getTopicExams,
    getExamsMeta,
    getExamSchedule,
    getExamInstruction,
    setOnGoingExam,
    examResults,
    examCourseMapping,
    examAttempts,
    onGoingExam,
    loading,
    setLoading
  };
};
