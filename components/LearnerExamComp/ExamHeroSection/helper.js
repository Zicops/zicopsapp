import {
  GET_EXAM_INSTRUCTION_BY_EXAMID,
  GET_EXAM_META,
  GET_EXAM_SCHEDULE_BY_EXAMID,
  GET_TOPICS_BY_COURSEIDS,
  GET_TOPIC_EXAMS_BY_COURSEID,
  queryClient
} from '@/api/Queries';
import { SCHEDULE_TYPE } from '@/components/AdminExamComps/Exams/ExamMasterTab/Logic/examMasterTab.helper';
import { loadQueryDataAsync } from '@/helper/api.helper';
import useUserCourseData from '@/helper/hooks.helper';
import { getUnixFromDate } from '@/helper/utils.helper';
import moment from 'moment';
import { useState } from 'react';

export const useExamData = () => {
  const { getUserCourseData } = useUserCourseData();
  const [loading, setLoading] = useState(false);

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

  async function getTopicExams(courseIds = []) {
    if (!courseIds) return [];
    const examRes = await loadQueryDataAsync(
      GET_TOPIC_EXAMS_BY_COURSEID,
      { course_ids: courseIds },
      {},
      queryClient
    );
    console.log(examRes);
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
    for (let i = 0; i < _courseData?.length; i++) {
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
    if (!assessmentTopics?.length) return setLoading(false);
    const examCourseMap = {};

    // // load topic exams
    let exams = [];
    const topicExams = await getTopicExams(courseIds);

    for (let i = 0; i < assessmentTopics?.length; i++) {
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

    const examIds = topicExams?.map((data) => data?.examId);
    const examMetas = await getExamsMeta(examIds);

    const examInstruction = await getExamInstruction(examIds);
    for (let i = 0; i < examMetas?.length; i++) {
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
    return {
      scheduleExams: scheduleExamData,
      takeAnyTimeExams: takeAnyTimeExams
    };
  }

  return {
    loadExamData
  };
};
