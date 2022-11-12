import { useLazyQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  GET_EXAM_CONFIG,
  GET_EXAM_INSTRUCTION,
  GET_EXAM_META,
  GET_EXAM_SCHEDULE,
  GET_FIXED_QUESTION,
  GET_QB_SECTION_MAPPING_BY_SECTION,
  GET_QUESTION_BANK_QUESTIONS,
  GET_QUESTION_BY_ID,
  GET_QUESTION_OPTIONS_WITHOUT_ANSWER,
  GET_QUESTION_OPTIONS_WITH_ANSWER,
  GET_QUESTION_PAPER_META,
  GET_QUESTION_PAPER_SECTION,
  queryClient
} from '../../../../../../API/Queries';
// import LearnerExamComponent from '../../components/LearnerExamComp';
import {
  ADD_USER_COURSE_PROGRESS,
  ADD_USER_EXAM_ATTEMPTS,
  ADD_USER_EXAM_PROGRESS,
  ADD_USER_EXAM_RESULTS,
  UPDATE_USER_COURSE,
  UPDATE_USER_COURSE_PROGRESS,
  UPDATE_USER_EXAM_ATTEMPTS,
  UPDATE_USER_EXAM_PROGRESS,
  userClient
} from '@/api/UserMutations';
import {
  GET_USER_COURSE_MAPS_BY_COURSE_ID,
  GET_USER_COURSE_PROGRESS,
  GET_USER_EXAM_ATTEMPTS,
  GET_USER_EXAM_PROGRESS,
  GET_USER_EXAM_RESULTS,
  userQueryClient
} from '@/api/UserQueries';
import ExamScreenPage from '@/components/LearnerExamComp/ExamScreenPage';
import { getPassingMarks } from '@/components/LearnerExamComp/Logic/exam.helper';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { COURSE_PROGRESS_STATUS } from '@/helper/constants.helper';
import { sortArrByKeyInOrder } from '@/helper/data.helper';
import { DIFFICULTY, getUnixFromDate } from '@/helper/utils.helper';
import { getResultsObj, LearnerExamAtom, QuestionOptionDataAtom } from '@/state/atoms/exams.atoms';
import { UserDataAtom } from '@/state/atoms/global.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UsersOrganizationAtom, UserStateAtom } from '@/state/atoms/users.atom';
import { UserCourseDataAtom, UserExamDataAtom } from '@/state/atoms/video.atom';
import moment from 'moment';

const ExamScreen = () => {
  const [loadMaster] = useLazyQuery(GET_EXAM_META, { client: queryClient });
  const [loadPaperMeta] = useLazyQuery(GET_QUESTION_PAPER_META, { client: queryClient });
  const [loadInstructions] = useLazyQuery(GET_EXAM_INSTRUCTION, { client: queryClient });
  const [loadSchedule] = useLazyQuery(GET_EXAM_SCHEDULE, { client: queryClient });
  const [loadConfig] = useLazyQuery(GET_EXAM_CONFIG, { client: queryClient });

  const [loadPaperSection] = useLazyQuery(GET_QUESTION_PAPER_SECTION, {
    client: queryClient
  });
  const [loadQBSectionMapping] = useLazyQuery(GET_QB_SECTION_MAPPING_BY_SECTION, {
    client: queryClient
  });
  const [loadFixedQuestions] = useLazyQuery(GET_FIXED_QUESTION, { client: queryClient });
  const [loadQBQuestions] = useLazyQuery(GET_QUESTION_BANK_QUESTIONS, { client: queryClient });
  const [loadOptions] = useLazyQuery(GET_QUESTION_OPTIONS_WITHOUT_ANSWER, { client: queryClient });
  const [loadOptionsWithAnswer] = useLazyQuery(GET_QUESTION_OPTIONS_WITH_ANSWER, {
    client: queryClient
  });

  const [addUserCourseProgress] = useMutation(ADD_USER_COURSE_PROGRESS, { client: userClient });
  const [updateUserCourse] = useMutation(UPDATE_USER_COURSE, { client: userClient });
  const [addUserExamAttempts] = useMutation(ADD_USER_EXAM_ATTEMPTS, { client: userClient });
  const [updateUserExamAttempts] = useMutation(UPDATE_USER_EXAM_ATTEMPTS, { client: userClient });
  const [addUserExamProgress] = useMutation(ADD_USER_EXAM_PROGRESS, { client: userClient });
  const [updateUserExamProgress] = useMutation(UPDATE_USER_EXAM_PROGRESS, { client: userClient });
  const [addExamResult] = useMutation(ADD_USER_EXAM_RESULTS, { client: userClient });
  const [loadUserCourseMaps] = useLazyQuery(GET_USER_COURSE_MAPS_BY_COURSE_ID, {
    client: userQueryClient
  });
  const [loadUserCourseProgress] = useLazyQuery(GET_USER_COURSE_PROGRESS, {
    client: userQueryClient
  });
  const [updateUserCourseProgress] = useMutation(UPDATE_USER_COURSE_PROGRESS, {
    client: userClient
  });

  const router = useRouter();
  const examId = router.query?.examId || null;
  const courseId = router.query?.courseId || null;
  const topicId = router.query?.topicId || null;

  const [loading, setLoading] = useState(true);

  const [userCourseData, setUserCourseData] = useRecoilState(UserCourseDataAtom);
  const [userExamData, setUserExamData] = useRecoilState(UserExamDataAtom);
  const userData = useRecoilValue(UserStateAtom);
  const userDataGlobal = useRecoilValue(UserDataAtom);
  const userOrgData = useRecoilValue(UsersOrganizationAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const [questionData, setQuestionData] = useRecoilState(QuestionOptionDataAtom);
  const [current, setCurrent] = useState({ id: 0, question: {}, options: [] });
  const [isLearner, setIsLearner] = useState(false);
  const [isExamEnded, setIsExamEnded] = useState(false);
  const [startExam, setStartExam] = useState('startNewAttempt');

  const [learnerExamData, setLearnerExamData] = useRecoilState(LearnerExamAtom);

  useEffect(async () => {
    if (!startExam?.includes('startNewAttempt')) return;

    setLoading(true);
    if (!userData?.id) return;
    if (!courseId) return;
    if (!examId) return;

    // load master data
    let isError = false;
    const masterRes = await loadMaster({
      variables: { exam_ids: [examId] },
      fetchPolicy: 'no-cache'
    }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Exam Master load error' });
    });
    if (isError) return;
    const masterData = masterRes?.data?.getExamsMeta[0];
    if (!masterData) return;
    const masterObj = {
      id: masterData.id,
      qpId: masterData.QpId,
      name: masterData.Name,
      description: masterData.Description,
      duration: +masterData.Duration / 60,
      scheduleType: masterData.ScheduleType,

      code: masterData.Code,
      type: masterData.Type,
      category: masterData.Category,
      subCategory: masterData.SubCategory,

      status: masterData.Status,
      is_exam_active: masterData.IsActive || true
    };

    const metaRes = await loadPaperMeta({
      variables: { question_paper_id: [masterObj?.qpId] }
    }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Paper Master load error' });
    });
    if (isError) return;
    const paperMasterData = metaRes.data.getQPMeta[0];

    const paperMaster = {
      name: paperMasterData?.name,
      category: paperMasterData?.Category,
      subCategory: paperMasterData?.SubCategory,
      description: paperMasterData?.Description,
      section_wise: paperMasterData?.SectionWise,
      difficultyLevel: paperMasterData?.DifficultyLevel,
      suggested_duration: +paperMasterData?.SuggestedDuration / 60,
      status: paperMasterData?.Status
    };

    masterObj.category = paperMaster.category;
    masterObj.subCategory = paperMaster.subCategory;
    masterObj.paperName = paperMaster.name;

    // load instructions
    const insRes = await loadInstructions({
      variables: { exam_id: examId },
      fetchPolicy: 'no-cache'
    }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Instructions load error' });
    });
    if (isError) return;
    const insData = insRes?.data?.getExamInstruction[0];
    const insObj = {
      instructionId: insData?.id || null,
      passingCriteria: insData?.PassingCriteria,
      noAttempts: +insData?.NoAttempts,
      instructions: insData?.Instructions || '',
      accessType: insData?.AccessType || '',
      is_ins_active: insData?.IsActive || true
    };

    // load schedule
    let schObj = {};
    if (masterObj.scheduleType === 'scheduled') {
      const schRes = await loadSchedule({
        variables: { exam_id: examId },
        fetchPolicy: 'no-cache'
      }).catch((err) => {
        console.log(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: 'Schedule load error' });
      });
      if (isError) return;
      const schData = schRes?.data?.getExamSchedule[0];

      schObj = {
        scheduleId: schData?.id || null,
        examStart: new Date(+schData?.Start * 1000),
        examEnd: +schData?.End ? new Date(+schData?.End * 1000) : null,
        bufferTime: schData?.BufferTime || 0,
        is_schedule_active: schData?.IsActive || true
      };
    }

    // load config
    const confRes = await loadConfig({ variables: { exam_id: examId } }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Config load error' });
    });
    if (isError) return;
    const confData = confRes?.data?.getExamConfiguration[0];
    const confObj = {
      configId: confData?.id || null,
      shuffle: confData?.Shuffle || false,
      display_hints: confData?.DisplayHints || false,
      show_result: confData?.ShowResult || false,
      show_answer: confData?.ShowAnswer || false,
      is_config_active: confData?.IsActive || true
    };

    // load user course mapping and progress
    const data = structuredClone({
      userCourseMapping: userCourseData?.userCourseMapping,
      userCourseProgress: userCourseData?.userCourseProgress || []
    });
    if (!data?.userCourseMapping?.user_cp_id) {
      const mapRes = await loadUserCourseMaps({
        variables: { userId: userData?.id, courseId: courseId },
        fetchPolicy: 'no-cache'
      });
      if (mapRes?.error)
        return setToastMsg({ type: 'danger', message: 'user course maps load error' });
      data.userCourseMapping = mapRes?.data?.getUserCourseMapByCourseID[0] || {};
    }

    if (!data?.userCourseProgress?.length && data?.userCourseMapping?.user_course_id) {
      const progressRes = await loadUserCourseProgress({
        variables: { userId: userData?.id, userCourseId: [data?.userCourseMapping?.user_course_id] },
        fetchPolicy: 'no-cache'
      });
      const courseProgress = progressRes?.data?.getUserCourseProgressByMapId;
      if (courseProgress?.length) data.userCourseProgress = courseProgress || [];
    }

    const userCourseProgressId = data?.userCourseProgress?.find(
      (cp) => cp?.topic_id === topicId
    )?.user_cp_id;
    // console.log(data?.userCourseProgress, userCourseProgressId, userCourseData);
    if (!userCourseProgressId) {
      const sendData = {
        userId: userData.id,
        userCourseId: data?.userCourseMapping?.user_course_id,
        topicId: topicId,
        topicType: 'Assessment',
        status: 'not-started',
        videoProgress: '',
        timestamp: ''
      };
      console.log(sendData);
      const progressRes = await addUserCourseProgress({ variables: sendData }).catch((err) => {
        console.log(err);
        return setToastMsg({ type: 'danger', message: 'Add Course Progress Error' });
      });
      const userCPData = progressRes?.data?.addUserCourseProgress[0];
      if (userCPData) data.userCourseProgress.push(userCPData);
    }

    const attemptRes = await loadQueryDataAsync(
      GET_USER_EXAM_ATTEMPTS,
      { user_id: userData?.id, user_lsp_id: userDataGlobal?.userDetails?.user_lsp_id },
      {},
      userQueryClient
    );
    const examAttemptData =
      attemptRes?.getUserExamAttempts?.filter(
        (ea) => ea?.exam_id === examId && ea?.user_cp_id === userCourseProgressId
      ) || [];
    const currentExamAttemptData =
      examAttemptData?.find((a) => a?.attempt_status === 'started') || null;
    let progressRes = null,
      resultRes;
    console.log(attemptRes);
    if (currentExamAttemptData?.user_ea_id) {
      progressRes = await loadQueryDataAsync(
        GET_USER_EXAM_PROGRESS,
        { user_id: userData?.id, user_ea_id: currentExamAttemptData?.user_ea_id },
        { fetchPolicy: 'no-cache' },
        userQueryClient
      );
      resultRes = await loadQueryDataAsync(
        GET_USER_EXAM_RESULTS,
        { user_id: userData?.id, user_ea_id: currentExamAttemptData?.user_ea_id },
        { fetchPolicy: 'no-cache' },
        userQueryClient
      );
    }

    if (!progressRes?.getUserExamProgress?.length) progressRes = [];
    const userExamDataLoaded = structuredClone({
      ...userExamData,
      userExamAttempts: examAttemptData || [],
      userExamProgress:
        [...(progressRes?.getUserExamProgress || [])]?.sort(
          (ep1, ep2) => ep1?.sr_no - ep2?.sr_no
        ) || [],
      userExamResults: resultRes?.getUserExamResults || []
    });

    userExamDataLoaded.currentAttemptId = currentExamAttemptData?.user_ea_id;
    console.log(userExamDataLoaded);

    const questionPaperId = masterObj?.qpId;

    // load section data and qb mappings
    const sectionData = [];
    let quesData = [];
    let mappedQb = [];
    let totalQuestions = 0;
    let totalMarks = 0;
    const fixedQuestionIds = [];

    // load sections
    const sectionRes = await loadPaperSection({
      variables: { question_paper_id: questionPaperId }
    }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Section load error' });
    });
    if (isError) return;

    // parse and set section data
    const sections = sortArrByKeyInOrder(sectionRes?.data?.getQuestionPaperSections, 'CreatedAt');

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      fixedQuestionIds.push({
        section_id: section.id,
        total_questions: section.TotalQuestions,
        questionIds: []
      });

      sectionData.push({
        id: section.id,
        qpId: section.QpId,
        name: section.Name,
        description: section.Description,
        type: section.Type,
        difficulty_level: section.DifficultyLevel,
        total_questions: section.TotalQuestions
      });

      // load qb section maping by section id
      const mappingRes = await loadQBSectionMapping({
        variables: { section_id: section.id },
        fetchPolicy: 'no-cache'
      }).catch((err) => {
        console.log(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: 'QB Section Mapping load error' });
      });
      if (isError) return setToastMsg({ type: 'danger', message: 'QB Section Map load error' });

      const _mappings = sortArrByKeyInOrder(
        mappingRes?.data?.getQPBankMappingBySectionId,
        'CreatedAt'
      );
      mappedQb = [
        ...mappedQb,
        ..._mappings.map((qbMappings) => {
          return {
            id: qbMappings.id,
            qbId: qbMappings.QbId,
            difficulty_level: qbMappings.DifficultyLevel,
            sectionId: qbMappings.SectionId,
            is_active: qbMappings.IsActive || true,
            question_marks: qbMappings.QuestionMarks,
            question_type: qbMappings.QuestionType,
            retrieve_type: qbMappings.RetrieveType,
            total_questions: qbMappings.TotalQuestions
          };
        })
      ];
    }

    const alreadyAvailableQuestionsId = [];

    if (currentExamAttemptData?.user_ea_id) {
      userExamDataLoaded?.userExamProgress?.forEach((ep) => {
        if (ep?.user_ea_id !== currentExamAttemptData?.user_ea_id) return;

        const index = fixedQuestionIds?.findIndex((obj) => obj?.section_id === ep?.section_id);
        if (index >= 0) {
          fixedQuestionIds[index].questionIds.push(ep?.question_id);
        }
      });
    }

    if (currentExamAttemptData?.user_ea_id) {
      for (let i = 0; i < fixedQuestionIds.length; i++) {
        const fixedQData = fixedQuestionIds[i];
        const sectionIndex = sectionData.findIndex(
          (section) => section.id === fixedQData.section_id
        );
        if (sectionIndex < 0) continue;
        if (!sectionData[sectionIndex]?.questions) sectionData[sectionIndex].questions = [];
        const sectionQbMaps = mappedQb?.filter(
          (qbMap) => qbMap?.sectionId === sectionData[sectionIndex]?.id
        );

        const questionsDataRes = await loadQueryDataAsync(GET_QUESTION_BY_ID, {
          question_ids: fixedQData?.questionIds
        });
        if (!questionsDataRes?.getQuestionsById) continue;

        const questions = questionsDataRes?.getQuestionsById?.map((q) => {
          const _qbMap = sectionQbMaps?.find((qbMap) => {
            const isMatched =
              qbMap?.qbId === q?.QbmId &&
              DIFFICULTY[qbMap?.difficulty_level]?.includes(q.Difficulty) &&
              qbMap?.total_questions > 0;

            if (isMatched) qbMap.total_questions = qbMap?.total_questions - 1;

            return isMatched;
          });
          totalMarks = +totalMarks + (+_qbMap?.question_marks || 0);
          // console.log(totalMarks, _qbMap, q);

          return {
            id: q?.id,
            description: q?.Description || null,
            type: q?.Type || 'MCQ',
            difficulty: q?.Difficulty || null,
            attachment: q?.Attachment || null,
            attachmentType: q?.AttachmentType || null,
            hint: q?.Hint || null,
            qbmId: q?.QbmId || null,
            question_marks: _qbMap?.question_marks || null
          };
        });
        // load all options for all questions
        for (let j = 0; j < questions.length; j++) {
          const question = questions[j];
          const allOptions = [];
          const optionsRes = await loadOptions({
            variables: { question_id: question.id },
            fetchPolicy: 'no-cache'
          }).catch((err) => {
            console.log(err);
            isError = !!err;
            setToastMsg({ type: 'danger', message: 'Options load error' });
          });
          if (isError) continue;
          if (optionsRes?.data?.getOptionsForQuestions[0]?.options) {
            optionsRes?.data?.getOptionsForQuestions[0].options.map((option) => {
              allOptions.push({
                id: option.id,
                qmId: option.QmId,
                description: option.Description,
                isCorrect: option.IsCorrect,
                attachmentType: option.AttachmentType,
                attachment: option.Attachment
              });
            });
            questions[j].options = allOptions;
          }
        }

        questions.forEach((q) => {
          const progressData = userExamDataLoaded?.userExamProgress?.find(
            (ep) => ep?.question_id === q?.id
          );
          const _quesData = {
            id: quesData?.length + 1,
            question: q,
            options: q?.options,
            isVisited: false,
            isMarked: false,
            selectedOption: progressData?.answer || null
          };
          if (progressData?.q_attempt_status !== 'not-visited') _quesData.isVisited = true;
          if (progressData?.q_attempt_status === 'marked') _quesData.isMarked = true;

          quesData.push(_quesData);
          sectionData[sectionIndex].questions.push(q?.id);
        });
        totalQuestions += questions?.length || 0;
        // totalMarks += mapping?.question_marks * questions?.length || 0;
      }
    } else {
      // loop to get fixed questions
      for (let i = 0; i < mappedQb.length; i++) {
        const mapping = mappedQb[i];

        if (mapping?.retrieve_type === 'random') {
          alreadyAvailableQuestionsId.push(...Array(mapping?.total_questions || 0).fill(mapping));
          totalQuestions += mapping?.total_questions;
          totalMarks += +mapping?.question_marks * +mapping?.total_questions || 0;

          const sectionIndex = sectionData.findIndex((section) => section.id === mapping.sectionId);
          if (sectionIndex < 0) continue;

          if (!sectionData[sectionIndex]?.questions) sectionData[sectionIndex].questions = [];

          const placeholderQues = Array(mapping?.total_questions || 0).fill(null);
          placeholderQues?.forEach(() => {
            quesData.push({
              id: quesData?.length + 1,
              question: null,
              options: [],

              isVisited: false,
              isMarked: false,
              selectedOption: null
            });
          });
          sectionData[sectionIndex].questions.push(...placeholderQues);

          continue;
        }

        // get fixed question for each mapping
        const fixedRes = await loadFixedQuestions({
          variables: { mapping_id: mapping.id },
          fetchPolicy: 'no-cache'
        }).catch((err) => {
          console.log(err);
          isError = !!err;
          return setToastMsg({ type: 'danger', message: 'fixed load error' });
        });
        if (isError) continue;

        const fixedData = fixedRes?.data?.getSectionFixedQuestions[0];
        const allQuestionIds = fixedData?.QuestionId?.split(',') || [];
        alreadyAvailableQuestionsId.push(...allQuestionIds);

        // load all bank questions which is mapped in every mapping
        const questionRes = await loadQBQuestions({
          variables: { question_bank_id: mapping.qbId },
          fetchPolicy: 'no-cache'
        }).catch((err) => {
          console.log(err);
          isError = !!err;
          setToastMsg({ type: 'danger', message: 'QB Questions load error' });
        });
        if (isError) continue;

        // filter question from all question bank questions
        const questions = questionRes?.data?.getQuestionBankQuestions
          ?.filter((q) => {
            return allQuestionIds.includes(q.id);
          })
          ?.map((q) => {
            return {
              id: q.id,
              description: q.Description,
              type: q.Type,
              difficulty: q.Difficulty,
              attachment: q.Attachment,
              attachmentType: q.AttachmentType,
              hint: q.Hint,
              qbmId: q.QbmId,
              question_marks: mapping?.question_marks
            };
          });

        if (!questions?.length) continue;

        // load all options for all questions
        for (let j = 0; j < questions.length; j++) {
          const question = questions[j];
          const allOptions = [];
          const optionsRes = await loadOptions({
            variables: { question_id: question.id },
            fetchPolicy: 'no-cache'
          }).catch((err) => {
            console.log(err);
            isError = !!err;
            setToastMsg({ type: 'danger', message: 'Options load error' });
          });
          if (isError) continue;

          if (optionsRes?.data?.getOptionsForQuestions[0]?.options) {
            optionsRes?.data?.getOptionsForQuestions[0].options.map((option) => {
              allOptions.push({
                id: option.id,
                qmId: option.QmId,
                description: option.Description,
                isCorrect: option.IsCorrect,
                attachmentType: option.AttachmentType,
                attachment: option.Attachment
              });
            });

            questions[j].options = allOptions;
          }
        }

        const sectionIndex = sectionData.findIndex((section) => section.id === mapping.sectionId);
        if (sectionIndex < 0) continue;

        if (!sectionData[sectionIndex]?.questions) sectionData[sectionIndex].questions = [];

        questions.forEach((q) => {
          quesData.push({
            id: quesData?.length + 1,
            question: q,
            options: q?.options,

            isVisited: false,
            isMarked: false,
            selectedOption: null
          });
          sectionData[sectionIndex].questions.push(q?.id);
        });
        totalQuestions += questions?.length || 0;
        totalMarks += mapping?.question_marks * questions?.length || 0;
      }
    }

    // random questions
    for (let i = 0; i < alreadyAvailableQuestionsId.length; i++) {
      const obj = alreadyAvailableQuestionsId[i];
      if (typeof obj === 'string') continue;
      console.log('mapping: ', obj, alreadyAvailableQuestionsId);

      const difficulty = DIFFICULTY[obj?.difficulty_level] || [];
      const randomRes = await loadQBQuestions({
        variables: {
          question_bank_id: obj?.qbId,
          difficultyStart: difficulty[0] || 1,
          difficultyEnd: difficulty[difficulty?.length - 1] || 1,
          totalQuestions: obj?.total_questions,
          excludedQuestionIds: alreadyAvailableQuestionsId.filter((obj) => typeof obj === 'string')
        },
        fetchPolicy: 'no-cache'
      }).catch((err) => {
        console.log(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: 'random load error' });
      });
      if (isError) continue;

      const q = randomRes?.data?.getQuestionBankQuestions[0];
      if (!q) continue;
      const question = {
        id: q.id,
        description: q.Description,
        type: q.Type,
        difficulty: q.Difficulty,
        attachment: q.Attachment,
        attachmentType: q.AttachmentType,
        hint: q.Hint,
        qbmId: q.QbmId,
        question_marks: obj?.question_marks
      };

      const sectionIndex = sectionData.findIndex((section) => section?.id === obj?.sectionId);
      if (sectionIndex < 0) continue;

      const questionIndex = sectionData?.[sectionIndex]?.questions?.findIndex(
        (section) => section === null
      );
      if (questionIndex < 0) continue;

      const quesIndex = quesData.findIndex((ques) => ques.question === null);
      if (quesIndex < 0) continue;

      alreadyAvailableQuestionsId[i] = q.id;
      sectionData[sectionIndex].questions[questionIndex] = question.id;
      quesData[quesIndex].question = question;

      // load all options for all questions
      const optionsRes = await loadOptions({
        variables: { question_id: question.id },
        fetchPolicy: 'no-cache'
      }).catch((err) => {
        console.log(err);
        isError = !!err;
        setToastMsg({ type: 'danger', message: 'Options load error' });
      });
      if (isError) continue;

      if (optionsRes?.data?.getOptionsForQuestions[0]?.options) {
        optionsRes?.data?.getOptionsForQuestions[0].options.map((option) => {
          quesData[quesIndex].options.push({
            id: option.id,
            qmId: option.QmId,
            description: option.Description,
            isCorrect: option.IsCorrect,
            attachmentType: option.AttachmentType,
            attachment: option.Attachment
          });
        });
      }
    }

    // if (confObj.shuffle) quesData = a.sort(() => Math.random() - 0.5);
    if (confObj.shuffle) shuffleQuestion(quesData);

    if (quesData?.[0]) {
      quesData[0].isVisited = true;
      setCurrent(quesData[0]);
    }
    setQuestionData(quesData);

    console.log({
      ...learnerExamData,
      examData: {
        ...masterObj,
        ...insObj,
        ...schObj,
        ...confObj,
        totalMarks: totalMarks || '0'
      },
      landingPageData: {
        // testSeries: 'PMP Test Series',
        // testSequence: 'M1A4',
        isProctoring: 'No',
        totalQuestions: totalQuestions || '0',
        isNegativeMarking: 'No',
        expertiseLevel: paperMaster?.difficultyLevel
      },
      insPageData: {
        examTimeStandard: 'IST',
        attempts: '0'
      },
      sectionData: sectionData,
      mappedQb,
      quesData
    });
    setUserExamData(userExamDataLoaded);
    setUserCourseData({ ...userCourseData, ...data });
    setLearnerExamData({
      ...learnerExamData,
      examData: {
        ...masterObj,
        ...insObj,
        ...schObj,
        ...confObj,
        totalMarks: totalMarks || '0'
      },
      landingPageData: {
        // testSeries: 'PMP Test Series',
        // testSequence: 'M1A4',
        isProctoring: 'No',
        totalQuestions: totalQuestions || '0',
        isNegativeMarking: 'No',
        expertiseLevel: paperMaster?.difficultyLevel
      },
      insPageData: {
        examTimeStandard: 'IST',
        attempts: userExamDataLoaded?.userExamAttempts?.filter(
          (ea) => ea.attempt_status === 'completed'
        )?.length
      },
      sectionData: sectionData,
      resultData: getResultsObj()
    });

    if (startExam === 'startNewAttemptNow') return setStartExam('startAttempt');
    setLoading(false);
  }, [examId, courseId, userData?.id, startExam]);

  function shuffleQuestion(array = []) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      --currentIndex;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
      array[currentIndex].id = currentIndex + 1;
    }
    console.log(array);

    return array;
  }

  let isSyncing = false;
  useEffect(async () => {
    if (isSyncing) return;
    await sync();

    async function sync() {
      isSyncing = true;
      await syncDataWithBackend();
      isSyncing = false;
    }
  }, [questionData, current]);

  useEffect(() => {
    if (userExamData?.duration?.timeLeft % 15 !== 0) return;
    console.log(
      userExamData?.duration?.timeLeft,
      userExamData?.duration?.timeLeft % 15,
      userExamData?.duration?.timeLeft % 15 !== 0
    );
    syncDataWithBackend();
  }, [userExamData?.duration?.timeLeft]);

  useEffect(async () => {
    console.log(startExam);

    if (startExam === 'start') return setIsLearner(1);

    if (startExam === 'newAttempt') {
      setLoading(true);
      await calculateResult('new');
      return;
    }

    if (startExam === 'startAttempt') {
      await setUserAttemptData(true);
      setLoading(false);
    }
  }, [startExam]);

  async function setUserAttemptData(isNewAttempt = false) {
    const learnerData = learnerExamData;
    const _courseData = structuredClone(userCourseData);
    const _examData = structuredClone(userExamData);
    if (isNewAttempt) {
      _examData.currentAttemptId = null;
      _examData.userExamProgress = [];
    }

    let isError = false;
    if (userCourseData?.userCourseMapping?.course_status === 'open') {
      const sendUserCourseData = {
        courseStatus: 'started',
        userCourseId: _courseData?.userCourseMapping?.user_course_id,
        userId: _courseData?.userCourseMapping?.user_id,
        userLspId: _courseData?.userCourseMapping?.user_lsp_id,
        courseId: _courseData?.userCourseMapping?.course_id,
        addedBy: _courseData?.userCourseMapping?.added_by,
        courseType: _courseData?.userCourseMapping?.course_type,
        isMandatory: _courseData?.userCourseMapping?.is_mandatory,
        endDate: getUnixFromDate(_courseData?.userCourseMapping?.end_date)?.toString()
      };

      // console.log(sendUserCourseData);
      const res = await updateUserCourse({ variables: sendUserCourseData }).catch((err) => {
        console.log(err);
        return setToastMsg({ type: 'danger', message: 'Course Assign Update Error' });
      });
      if (isError) return false;

      if (res?.data?.updateUserCourse)
        _courseData.userCourseMapping = res?.data?.updateUserCourse || {};
    }
    const attemptCount = _examData?.userExamAttempts?.length + 1 || 1;

    let user_cp_id = null;
    _courseData?.userCourseProgress?.some((cp) => {
      const isCpIdMatched = cp?.topic_id === topicId;
      if (isCpIdMatched) user_cp_id = cp?.user_cp_id;
      return isCpIdMatched;
    });
    console.log(_courseData);

    if (!user_cp_id)
      return setToastMsg({ type: 'danger', message: 'Course Progress Id not found' });

    const sendAttemptData = {
      user_id: userData?.id,
      user_lsp_id: userOrgData?.user_lsp_id || userDataGlobal?.userDetails?.user_lsp_id,
      user_cp_id: user_cp_id,
      user_course_id: _courseData?.userCourseMapping?.user_course_id,
      exam_id: learnerData?.examData?.id,
      attempt_no: `${attemptCount}`,
      attempt_status: 'started',
      attempt_start_time: getUnixFromDate()?.toString(),
      attempt_duration: '0'
    };

    console.log(sendAttemptData, _courseData);
    const attemptIndex = _examData?.userExamAttempts?.findIndex(
      (attempt) => attempt?.user_ea_id === _examData?.currentAttemptId
    );
    let examAttemptRes = null;

    console.log(_examData, attemptIndex);

    const isAttemptLimited = learnerData?.examData?.noAttempts !== -1;
    if (attemptIndex >= 0) {
      return setStartExam(
        isAttemptLimited && attemptCount > learnerData?.examData?.noAttempts
          ? 'alertOneLast'
          : 'alertOne'
      );
    }

    if (isAttemptLimited && attemptCount > learnerData?.examData?.noAttempts)
      return setToastMsg({ type: 'danger', message: 'All Attempts Used' });

    if (attemptIndex < 0) {
      examAttemptRes = await addUserExamAttempts({
        variables: { userExamAttempts: [sendAttemptData] }
      }).catch((err) => {
        console.log(err);
        isError = true;
        return setToastMsg({ type: 'danger', message: 'Add Exam Attempt Error' });
      });
    }
    if (isError) return false;
    if (examAttemptRes?.errors)
      return setToastMsg({ type: 'danger', message: 'Add Exam Attempt Error' });

    const examAttemptData =
      attemptIndex < 0
        ? examAttemptRes?.data?.addUserExamAttempts[0]
        : _examData?.userExamAttempts[attemptIndex];
    // console.log(examAttemptData, learnerData, questionData);
    _examData?.userExamAttempts?.push(examAttemptData);
    _examData.currentAttemptId = examAttemptData?.user_ea_id;

    if (_examData?.userExamProgress?.length) return true;

    const sendExamProgressData = [];
    let questionNo = 0;
    console.log(learnerData);
    learnerData?.sectionData?.forEach((section, sectionIndex) => {
      section?.questions?.forEach((qId, qIndex) => {
        const progressData = {
          user_id: userData?.id,
          user_ea_id: examAttemptData?.user_ea_id,
          user_lsp_id: userOrgData?.user_lsp_id || userDataGlobal?.userDetails?.user_lsp_id,
          user_cp_id: sendAttemptData?.user_cp_id,
          // user_course_id: userCourseMapData?.userCourseMapping?.user_course_id,

          sr_no: ++questionNo,
          question_id: qId,
          question_type: 'MCQ',
          answer: '',
          q_attempt_status: sectionIndex === 0 && qIndex === 0 ? 'unattempted' : 'not-visited',
          total_time_spent: '0',
          correct_answer: '',
          section_id: section?.id
        };

        sendExamProgressData.push(progressData);
      });
    });
    console.log(sendExamProgressData);
    const examProgressRes = await addUserExamProgress({
      variables: { userExamProgress: sendExamProgressData }
    }).catch((err) => {
      console.log(err);
      isError = true;
      return setToastMsg({ type: 'danger', message: 'Add Exam Progress Error' });
    });
    if (isError) return false;

    _examData.userExamProgress = examProgressRes?.data?.addUserExamProgress;
    console.log('_examData: ', _examData, examProgressRes);
    setUserExamData(_examData);

    const courseProgressIndex = userCourseData?.userCourseProgress?.findIndex(
      (cp) => cp?.topic_id === topicId
    );
    const cpData = structuredClone(_courseData?.userCourseProgress?.[courseProgressIndex]);
    const sendData = {
      ...cpData,
      userCpId: cpData?.user_cp_id,
      userId: cpData?.user_id,
      userCourseId: cpData?.user_course_id,
      topicId: cpData?.topic_id,
      topicType: cpData?.topic_type,
      status: cpData?.status,
      timestamp: '',
      videoProgress: ''
    };
    if (sendData.status === COURSE_PROGRESS_STATUS[0]) {
      sendData.status = COURSE_PROGRESS_STATUS[1];
      // console.log('course progress', sendData);
      const progressRes = await updateUserCourseProgress({ variables: sendData }).catch((err) => {
        console.log(err);
        return setToastMsg({ type: 'danger', message: 'Add Course Progress Error' });
      });
      const userCourseProgressData = progressRes?.data?.updateUserCourseProgress;

      _courseData.userCourseProgress[courseProgressIndex] = userCourseProgressData;
      console.log('_courseData:', _courseData);
      setUserCourseData(_courseData);
    }
    setStartExam('start');
  }

  let shouldSync = true;
  async function syncDataWithBackend(isPaperActive = false) {
    if (!shouldSync) return;
    if (!isLearner) return;
    if (isExamEnded) return console.log('exam ended so not syncing');

    const _examData = structuredClone(userExamData);
    console.log(_examData);

    const currentAttemptIndex = _examData?.userExamAttempts?.findIndex(
      (attempt) => attempt?.user_ea_id === _examData?.currentAttemptId
    );
    const sendAttemptData = _examData?.userExamAttempts?.[currentAttemptIndex] || null;
    if (sendAttemptData) {
      const { timeLeft, total } = _examData?.duration;
      const durationSpent = total - timeLeft;
      if (durationSpent > +sendAttemptData.attempt_duration)
        sendAttemptData.attempt_duration = `${durationSpent}`;

      // console.log(sendAttemptData);
      const examAttemptRes = await updateUserExamAttempts({
        variables: sendAttemptData
      }).catch((err) => console.log(err));

      if (examAttemptRes?.data?.updateUserExamProgress)
        _examData.userExamAttempts[currentAttemptIndex] =
          examAttemptRes?.data?.updateUserExamProgress;
    }

    const now = moment(new Date());
    const startTime = moment(userExamData?.activeQuestion?.startTime);

    const progressDataIndex = _examData?.userExamProgress?.findIndex(
      (ep) => ep?.question_id === current?.question?.id
    );
    const progressData = _examData?.userExamProgress?.[progressDataIndex];
    if (!progressData) return;

    const quesData = questionData?.find((q) => q?.question?.id === current?.question?.id);
    const timeSpent = moment.duration(now.diff(startTime)).seconds();

    progressData.answer = quesData?.selectedOption || '';
    if (timeSpent > 0)
      progressData.total_time_spent = `${+progressData.total_time_spent + timeSpent}`;
    progressData.q_attempt_status = 'unattempted';
    if (progressData.answer) progressData.q_attempt_status = 'attempted';
    if (quesData?.isMarked) progressData.q_attempt_status = 'marked';

    // console.log(progressData);
    const resp = await updateUserExamProgress({ variables: progressData }).catch((err) => {
      console.log(err);
    });
    // console.log(resp);
    if (resp?.data?.updateUserExamProgress)
      _examData.userExamProgress[progressDataIndex] = resp?.data?.updateUserExamProgress;

    setUserExamData({
      ...userExamData,
      ..._examData,
      activeQuestion: !isPaperActive ? { ...current, startTime: new Date() } : null
    });
  }

  async function calculateResult(isNewAttempt = null) {
    setIsExamEnded(true);
    shouldSync = false;
    isSyncing = true;
    const marks = 0;
    const allQuestionIds = [];
    const allOptions = [];
    questionData?.forEach((obj) => allQuestionIds.push(obj?.question?.id));

    const _examData = structuredClone(userExamData);
    const _courseData = structuredClone(userCourseData);

    let isError = false;
    const optionsRes = await loadOptionsWithAnswer({
      variables: { question_id: allQuestionIds }
    }).catch((err) => {
      console.log('Options Load Err', err);
      isError = !!err;
    });

    if (isError) return;

    if (optionsRes?.data?.getOptionsForQuestions) {
      optionsRes?.data?.getOptionsForQuestions?.forEach((obj) => {
        obj?.options?.forEach((option) => {
          allOptions.push({ id: option.id, qmId: option.QmId, isCorrect: option.IsCorrect });
        });
      });
    }

    const currentExamAttemptData = structuredClone(
      userExamData?.userExamAttempts?.find((a) => a?.user_ea_id === userExamData?.currentAttemptId)
    );
    console.log(currentExamAttemptData);
    const examResultData = {
      user_id: currentExamAttemptData?.user_id,
      user_ea_id: currentExamAttemptData?.user_ea_id,
      user_score: 0,
      correct_answers: 0,
      wrong_answers: 0,
      result_status: null
    };

    learnerExamData?.sectionData?.forEach((section) => {
      section?.questions?.forEach((id) => {
        const ques = questionData?.filter((q) => q?.question?.id === id)[0];
        const selectedOption = ques?.selectedOption
          ? allOptions?.find((op) => op?.id === ques?.selectedOption)
          : null;
        const isCorrect = selectedOption?.isCorrect || false;

        marks += isCorrect ? +ques?.question?.question_marks : 0;

        if (isCorrect) examResultData.correct_answers += 1;
        if (!isCorrect) examResultData.wrong_answers += 1;
      });
    });

    const passingMarks = getPassingMarks(
      learnerExamData?.examData?.passingCriteria,
      learnerExamData?.examData?.totalMarks
    );

    examResultData.user_score = marks || 0;
    examResultData.result_status = passingMarks <= marks ? 'passed' : 'failed';

    if (passingMarks === 0) examResultData.result_status = 'completed';

    const sendExamData = {
      user_id: userData?.id,
      user_ea_id: userExamData?.currentAttemptId,
      user_score: examResultData?.user_score,
      correct_answers: examResultData?.correct_answers,
      wrong_answers: examResultData?.wrong_answers,
      result_status: JSON.stringify({
        status: examResultData?.result_status,
        totalMarks: learnerExamData?.examData?.totalMarks,
        passingMarks: passingMarks,
        finishedAt: getUnixFromDate()
      })
    };
    console.log(sendExamData);
    // return;
    const resp = await addExamResult({ variables: sendExamData }).catch((err) => {
      console.log(err);
      isError = true;
    });
    if (isError || resp?.errors)
      return setToastMsg({ type: 'danger', message: 'Result add error' });

    // update course progress
    const courseProgressIndex = userCourseData?.userCourseProgress?.findIndex(
      (cp) => cp?.topic_id === topicId
    );
    let shouldUpdateProgress = courseProgressIndex >= 0;
    if (shouldUpdateProgress)
      shouldUpdateProgress = !examResultData?.result_status?.includes('failed');

    if (
      shouldUpdateProgress ||
      learnerExamData?.examData?.noAttempts === currentExamAttemptData?.attempt_no
    ) {
      const cpData = structuredClone(_courseData?.userCourseProgress?.[courseProgressIndex]);
      const sendData = {
        ...cpData,
        userCpId: cpData?.user_cp_id,
        userId: cpData?.user_id,
        userCourseId: cpData?.user_course_id,
        topicId: cpData?.topic_id,
        topicType: cpData?.topic_type,
        status: COURSE_PROGRESS_STATUS[2],
        timestamp: '',
        videoProgress: ''
      };

      // console.log('course progress', sendData);
      const progressRes = await updateUserCourseProgress({ variables: sendData }).catch((err) => {
        console.log(err);
        return setToastMsg({ type: 'danger', message: 'Add Course Progress Error' });
      });
      const userCourseProgressData = progressRes?.data?.updateUserCourseProgress;

      _courseData.userCourseProgress[courseProgressIndex] = userCourseProgressData;
    }

    // console.log(sendAttemptData);
    // udpate exam attempt data
    currentExamAttemptData.attempt_status = 'completed';
    const examAttemptRes = await updateUserExamAttempts({
      variables: currentExamAttemptData
    }).catch((err) => {
      console.log(err);
      isError = true;
    });
    if (isError || resp?.errors)
      return setToastMsg({ type: 'danger', message: 'Attempt Update error' });

    if (examAttemptRes?.data?.updateUserExamProgress)
      _examData.userExamAttempts[currentAttemptIndex] =
        examAttemptRes?.data?.updateUserExamProgress;

    console.log(resp);
    console.log(examResultData, {
      ...learnerExamData,
      resultData: {
        examScore: marks,
        isPassed: passingMarks <= marks
      }
    });

    setUserCourseData(_courseData);
    setUserExamData(_examData);
    if (isNewAttempt === 'new') return setStartExam('startNewAttemptNow');

    setLearnerExamData({
      ...learnerExamData,
      resultData: {
        examScore: marks,
        isPassed: passingMarks <= marks,
        ...resp?.data?.addUserExamResult[0]
      }
    });
  }
  return (
    <>
      <ExamScreenPage
        isLearner={isLearner}
        isLoading={loading}
        questionData={questionData}
        setQuestionData={setQuestionData}
        current={current}
        setCurrent={setCurrent}
        calculateResult={async () => await calculateResult()}
        syncDataWithBackend={() => syncDataWithBackend()}
        handleExamStart={async () => await setUserAttemptData()}
        startExam={startExam}
        handlePopUpClose={() => setStartExam(null)}
        handleContinue={() => {
          const attemptIndex = userExamData?.userExamAttempts?.findIndex(
            (attempt) => attempt?.user_ea_id === userExamData?.currentAttemptId
          );
          console.log(userExamData?.userExamAttempts[attemptIndex], userExamData);
          setStartExam('start');
        }}
        handleNewAttempt={() => {
          setStartExam('newAttempt');
        }}
      />
    </>
  );
};

export default ExamScreen;
