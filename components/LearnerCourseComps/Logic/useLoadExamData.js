import { GET_USER_EXAM_ATTEMPTS, userQueryClient } from '@/api/UserQueries';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { useLazyQuery } from '@apollo/client';
import {
  GET_EXAM_INSTRUCTION,
  GET_EXAM_META,
  GET_EXAM_SCHEDULE,
  GET_QB_SECTION_MAPPING_BY_SECTION,
  GET_QUESTION_PAPER_META,
  GET_QUESTION_PAPER_SECTION,
  GET_TOPIC_EXAMS,
  queryClient,
} from 'API/Queries';
import { useEffect, useState } from 'react';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import {
  CourseTopicAssessmentAtomFamily,
  UserTopicProgressDataAtom,
  getTopicAssessmentObj,
} from '../atoms/learnerCourseComps.atom';

// TODO: rework on this
export default function useLoadExamData(topicId = null) {
  const [loadMaster, { error: loadMasterError }] = useLazyQuery(GET_EXAM_META, {
    client: queryClient,
  });
  const [loadPaperMeta, { error: loadMetaError }] = useLazyQuery(GET_QUESTION_PAPER_META, {
    client: queryClient,
  });
  const [loadInstructions, { error: loadInsError }] = useLazyQuery(GET_EXAM_INSTRUCTION, {
    client: queryClient,
  });
  const [loadSchedule, { error: loadScheduleError }] = useLazyQuery(GET_EXAM_SCHEDULE, {
    client: queryClient,
  });
  const [loadPaperSection, { error: loadSectionError }] = useLazyQuery(GET_QUESTION_PAPER_SECTION, {
    client: queryClient,
  });
  const [loadQBSectionMapping, { error: loadQBSectionMapError }] = useLazyQuery(
    GET_QB_SECTION_MAPPING_BY_SECTION,
    { client: queryClient },
  );

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const userData = useRecoilValue(UserStateAtom);
  const topicProgressData = useRecoilValue(UserTopicProgressDataAtom);
  const topicExamData = useRecoilValue(CourseTopicAssessmentAtomFamily(topicId));

  const addAssessmentToRecoil = useRecoilCallback(({ set }) => (assessment, topId) => {
    set(CourseTopicAssessmentAtomFamily(topId), assessment);
  });

  const [isLoading, setIsLoading] = useState(null);
  const [data, setData] = useState(null);
  const [examAttempts, setExamAttempts] = useState([]);

  const examId = topicExamData?.examId;

  useEffect(async () => {
    if (!topicId) return;

    loadQueryDataAsync(GET_TOPIC_EXAMS, { topic_id: topicId }).then((res) => {
      const topicExam = res?.getTopicExams?.[0];
      if (!topicExam)
        return addAssessmentToRecoil(getTopicAssessmentObj({ topicId: topicId }), topicId);

      const assessmentData = getTopicAssessmentObj({
        id: topicExam.id,
        topicId: topicExam.topicId,
        courseId: topicExam.courseId,
        examId: topicExam.examId,
        language: topicExam.language,
      });

      addAssessmentToRecoil(assessmentData, topicExam.topicId);
    });
  }, [topicId]);

  // load user exam attempts data
  useEffect(() => {
    if (!examId) return;

    loadUserExamAttempts();
  }, [examId]);

  // load exam data
  useEffect(async () => {
    if (!examId) return;
    setIsLoading(true);

    // load master data
    let isError = false;
    const masterRes = await loadMaster({
      variables: { exam_ids: [examId] },
      fetchPolicy: 'no-cache',
    }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Exam Master load error' });
    });
    if (isError) return setIsLoading(false);
    const masterData = masterRes?.data?.getExamsMeta[0];
    if (!masterData) return setIsLoading(false);
    const masterObj = {
      id: masterData.id,
      qpId: masterData.QpId,
      name: masterData.Name,
      description: masterData.Description,

      duration: +masterData.Duration / 60,
      scheduleType: masterData.ScheduleType,
    };

    const metaRes = await loadPaperMeta({
      variables: { question_paper_id: [masterObj?.qpId] },
    }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Paper Master load error' });
    });
    if (isError) return setIsLoading(false);
    const paperMasterData = metaRes.data.getQPMeta[0];

    masterObj.difficultyLevel = paperMasterData?.DifficultyLevel;

    // load instructions
    const insRes = await loadInstructions({
      variables: { exam_id: examId },
      fetchPolicy: 'no-cache',
    }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Instructions load error' });
    });
    if (isError) return setIsLoading(false);
    const insData = insRes?.data?.getExamInstruction[0];
    const insObj = {
      instructionId: insData?.id || null,
      passingCriteria: insData?.PassingCriteria,
      noAttempts: insData?.NoAttempts,
    };

    // load schedule
    let schObj = {};
    if (masterObj.scheduleType === 'scheduled') {
      const schRes = await loadSchedule({
        variables: { exam_id: examId },
        fetchPolicy: 'no-cache',
      }).catch((err) => {
        console.log(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: 'Schedule load error' });
      });
      if (isError) return setIsLoading(false);
      const schData = schRes?.data?.getExamSchedule[0];

      schObj = {
        scheduleId: schData?.id || null,
        examStart: new Date(+schData?.Start * 1000),
        examEnd: +schData?.End ? new Date(+schData?.End * 1000) : null,
        bufferTime: schData?.BufferTime || 0,
      };
    }

    const questionPaperId = masterObj?.qpId;

    // load section data and qb mappings

    let mappedQb = [];
    let totalMarks = 0;

    // load sections
    const sectionRes = await loadPaperSection({
      variables: { question_paper_id: questionPaperId },
    }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Section load error' });
    });
    if (isError) return setIsLoading(false);

    // parse and set section data
    const sections = sectionRes?.data?.getQuestionPaperSections || [];
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];

      // load qb section maping by section id
      const mappingRes = await loadQBSectionMapping({
        variables: { section_id: section.id },
        fetchPolicy: 'no-cache',
      }).catch((err) => {
        console.log(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: 'QB Section Mapping load error' });
      });
      if (isError) return setToastMsg({ type: 'danger', message: 'QB Section Map load error' });

      mappedQb = [
        ...mappedQb,
        ...mappingRes?.data?.getQPBankMappingBySectionId?.map((qbMappings) => {
          return {
            id: qbMappings.id,
            question_marks: qbMappings.QuestionMarks,
            total_questions: qbMappings.TotalQuestions,
          };
        }),
      ];
    }

    // loop to get fixed questions
    for (let i = 0; i < mappedQb.length; i++) {
      const mapping = mappedQb[i];

      totalMarks += mapping?.question_marks * mapping?.total_questions || 0;
    }

    setData({
      ...masterObj,
      ...insObj,
      ...schObj,
      totalMarks: totalMarks || '0',
    });

    setIsLoading(false);
  }, [examId]);

  async function loadUserExamAttempts() {
    const attemptRes = await loadQueryDataAsync(
      GET_USER_EXAM_ATTEMPTS,
      { user_id: userData?.id, exam_id: examId },
      {},
      userQueryClient,
    );
    const userCourseProgressId = topicProgressData?.find(
      (cp) => cp?.topic_id === topicId,
    )?.user_cp_id;

    const examAttemptData =
      attemptRes?.getUserExamAttempts?.filter(
        (ea) =>
          ea?.exam_id === examId &&
          ea?.attempt_status === 'completed' &&
          ea?.user_cp_id === userCourseProgressId,
      ) || [];

    setExamAttempts(examAttemptData);
  }

  return { isLoading, data, examData: topicExamData, examAttempts };
}
