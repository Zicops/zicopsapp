import { useLazyQuery, useMutation } from '@apollo/client';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  GET_EXAM_CONFIG,
  GET_EXAM_INSTRUCTION,
  GET_EXAM_META,
  GET_EXAM_SCHEDULE,
  GET_FIXED_QUESTION,
  GET_QB_SECTION_MAPPING_BY_SECTION,
  GET_QUESTION_BANK_QUESTIONS,
  GET_QUESTION_OPTIONS_WITHOUT_ANSWER,
  GET_QUESTION_PAPER_META,
  GET_QUESTION_PAPER_SECTION,
  queryClient
} from '../../API/Queries';
// import LearnerExamComponent from '../../components/LearnerExamComp';
import {
  ADD_USER_EXAM_ATTEMPTS,
  UPDATE_USER_COURSE,
  UPDATE_USER_EXAM_ATTEMPTS,
  userClient
} from '@/api/UserMutations';
import {
  GET_USER_COURSE_MAPS_BY_COURSE_ID,
  GET_USER_COURSE_PROGRESS,
  userQueryClient
} from '@/api/UserQueries';
import LearnerExamComponent from '@/components/LearnerExamComp';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UsersOrganizationAtom, UserStateAtom } from '@/state/atoms/users.atom';
import { UserCourseDataAtom, UserExamDataAtom } from '@/state/atoms/video.atom';
import { CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ExamInstruction from '../../components/LearnerExamComp/ExamInstructions';
import styles from '../../components/LearnerExamComp/learnerExam.module.scss';
import { DIFFICULTY, toggleFullScreen } from '../../helper/utils.helper';
import { LearnerExamAtom, QuestionOptionDataAtom } from '../../state/atoms/exams.atoms';

const ExamScreen = () => {
  const [loadMaster, { error: loadMasterError }] = useLazyQuery(GET_EXAM_META, {
    client: queryClient
  });
  const [loadPaperMeta, { error: loadMetaError }] = useLazyQuery(GET_QUESTION_PAPER_META, {
    client: queryClient
  });
  const [loadInstructions, { error: loadInsError }] = useLazyQuery(GET_EXAM_INSTRUCTION, {
    client: queryClient
  });
  const [loadSchedule, { error: loadScheduleError }] = useLazyQuery(GET_EXAM_SCHEDULE, {
    client: queryClient
  });
  const [loadConfig, { error: loadConfigError }] = useLazyQuery(GET_EXAM_CONFIG, {
    client: queryClient
  });

  const [loadPaperSection, { error: loadSectionError }] = useLazyQuery(GET_QUESTION_PAPER_SECTION, {
    client: queryClient
  });
  const [loadQBSectionMapping, { error: loadQBSectionMapError }] = useLazyQuery(
    GET_QB_SECTION_MAPPING_BY_SECTION,
    { client: queryClient }
  );
  const [loadFixedQuestions, { error: errorFixedQuestionsData }] = useLazyQuery(
    GET_FIXED_QUESTION,
    { client: queryClient }
  );
  const [loadQBQuestions, { error: errorQBQuestionsData, refetch }] = useLazyQuery(
    GET_QUESTION_BANK_QUESTIONS,
    { client: queryClient }
  );
  const [loadOptions, { error: errorOptionsData }] = useLazyQuery(
    GET_QUESTION_OPTIONS_WITHOUT_ANSWER,
    { client: queryClient }
  );
  const [updateUserCourse] = useMutation(UPDATE_USER_COURSE, { client: userClient });
  const [addUserExamAttempts] = useMutation(ADD_USER_EXAM_ATTEMPTS, { client: userClient });
  const [updateUserExamAttempts] = useMutation(UPDATE_USER_EXAM_ATTEMPTS, { client: userClient });
  const [loadUserCourseMaps] = useLazyQuery(GET_USER_COURSE_MAPS_BY_COURSE_ID, {
    client: userQueryClient
  });
  const [loadUserCourseProgress] = useLazyQuery(GET_USER_COURSE_PROGRESS, {
    client: userQueryClient
  });

  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [userCourseData, setUserCourseData] = useRecoilState(UserCourseDataAtom);
  const [userExamData, setUserExamData] = useRecoilState(UserExamDataAtom);
  const userData = useRecoilValue(UserStateAtom);
  const userOrgData = useRecoilValue(UsersOrganizationAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const [questionData, setQuestionData] = useRecoilState(QuestionOptionDataAtom);
  const [current, setCurrent] = useState({
    id: 0,
    question: {},
    options: []
  });
  const [isFullScreen, setIsFullScreen] = useState(0);
  const [isLearner, setIsLearner] = useState(false);
  const refFullscreen = useRef(null);

  const [learnerExamData, setLearnerExamData] = useRecoilState(LearnerExamAtom);

  useEffect(async () => {
    setLoading(true);
    const examId = router.query?.examId || null;
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
      duration: masterData.Duration,
      scheduleType: masterData.ScheduleType,

      code: masterData.Code,
      type: masterData.Type,
      category: masterData.Category,
      subCategory: masterData.SubCategory,

      status: masterData.Status,
      is_exam_active: masterData.IsActive
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
      suggested_duration: paperMasterData?.SuggestedDuration,
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
      noAttempts: insData?.NoAttempts,
      instructions: insData?.Instructions || '',
      accessType: insData?.AccessType || '',
      is_ins_active: insData?.IsActive || ''
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
        is_schedule_active: schData?.IsActive || false
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
      is_config_active: confData?.IsActive || false
    };

    const questionPaperId = masterObj?.qpId;

    // load section data and qb mappings
    const sectionData = [];
    let quesData = [];
    let mappedQb = [];
    let totalQuestions = 0;
    let totalMarks = 0;

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
    const sections = sectionRes?.data?.getQuestionPaperSections || [];
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];

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

      mappedQb = [
        ...mappedQb,
        ...mappingRes?.data?.getQPBankMappingBySectionId?.map((qbMappings) => {
          return {
            id: qbMappings.id,
            qbId: qbMappings.QbId,
            difficulty_level: qbMappings.DifficultyLevel,
            sectionId: qbMappings.SectionId,
            is_active: qbMappings.IsActive,
            question_marks: qbMappings.QuestionMarks,
            question_type: qbMappings.QuestionType,
            retrieve_type: qbMappings.RetrieveType,
            total_questions: qbMappings.TotalQuestions
          };
        })
      ];
    }

    const alreadyAvailableQuestionsId = [];
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

            isVisited: quesData?.length === 0,
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

          isVisited: quesData?.length === 0,
          isMarked: false,
          selectedOption: null
        });
        sectionData[sectionIndex].questions.push(q?.id);
      });
      totalQuestions += questions?.length || 0;
      totalMarks += mapping?.question_marks * questions?.length || 0;
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

      const sectionIndex = sectionData.findIndex((section) => section.id === obj?.sectionId);
      if (sectionIndex < 0) continue;

      const questionIndex = sectionData[sectionIndex].questions?.findIndex(
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

    setQuestionData(quesData);
    if (quesData[0]) setCurrent(quesData[0]);

    // load user course mapping and progress
    const data = {
      userCourseMapping: userCourseData?.userCourseMapping,
      userCourseProgress: userCourseData?.userCourseProgress
    };
    if (data?.userCourseMapping?.user_cp_id) {
      const mapRes = await loadUserCourseMaps({
        variables: { courseId: fullCourse?.id },
        fetchPolicy: 'no-cache'
      });
      if (mapRes?.error)
        return setToastMsg({ type: 'danger', message: 'user course maps load error' });
      data.userCourseMapping = mapRes?.data?.getUserCourseMapByCourseID[0] || {};
    }

    if (!data?.userCourseProgress?.length && data?.userCourseMapping?.user_course_id) {
      const progressRes = await loadUserCourseProgress({
        variables: { userCourseId: currentCourseMap?.user_course_id },
        fetchPolicy: 'no-cache'
      });
      const courseProgress = progressRes?.data?.getUserCourseProgressByMapId;
      if (courseProgress?.length) data.userCourseProgress = courseProgress || [];
    }

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
        attempts: '0'
      },
      sectionData: sectionData
    });

    setLoading(false);
  }, [router.query]);

  // update full screen state
  useEffect(() => {
    window.addEventListener('resize', () => {
      setIsFullScreen(
        !!(
          document.fullscreenElement ||
          document.webkitFullscreenElement ||
          document.mozFullScreenElement
        )
      );
    });
  }, []);

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

  useEffect(() => {
    if (isLearner) setUserAttemptData();
  }, [isLearner]);

  async function setUserAttemptData() {
    const userCourseMapData = structuredClone(userCourseData);
    const learnerData = learnerExamData;

    if (userCourseData?.userCourseMapping?.course_status === 'open') {
      const sendUserCourseData = {
        courseStatus: 'started',
        userCourseId: userCourseMapData?.userCourseMapping?.user_course_id,
        userId: userCourseMapData?.userCourseMapping?.user_id,
        userLspId: userCourseMapData?.userCourseMapping?.user_lsp_id,
        courseId: userCourseMapData?.userCourseMapping?.course_id,
        addedBy: userCourseMapData?.userCourseMapping?.added_by,
        courseType: userCourseMapData?.userCourseMapping?.course_type,
        isMandatory: userCourseMapData?.userCourseMapping?.is_mandatory,
        endDate: userCourseMapData?.userCourseMapping?.end_date
      };

      // console.log(sendUserCourseData);
      const res = await updateUserCourse({ variables: sendUserCourseData }).catch((err) => {
        console.log(err);
        return setToastMsg({ type: 'danger', message: 'Course Assign Update Error' });
      });
      console.log(res);
      if (res?.data?.updateUserCourse)
        userCourseMapData.userCourseMapping = res?.data?.updateUserCourse || {};
    }
    const attemptCount = userExamData?.userExamAttempts?.length + 1 || 1;

    if (attemptCount > learnerData?.examData?.noAttempts)
      return setToastMsg({ type: 'danger', message: 'All Attempts Used' });

    const sendAttemptData = {
      user_id: userData?.id,
      user_lsp_id: userOrgData?.user_lsp_id,
      user_cp_id: userCourseMapData?.userCourseMapping?.user_cp_id,
      user_course_id: userCourseMapData?.userCourseMapping?.user_course_id,
      exam_id: learnerData?.examData?.id,
      attempt_no: `${attemptCount}`,
      attempt_status: 'started',
      attempt_start_time: Date.now() / 1000,
      attempt_duration: '0'
    };

    console.log(sendAttemptData);
    // const examAttemptRes = await addUserExamAttempts({ variables: [sendAttemptData] }).catch(
    //   (err) => {
    //     console.log(err);
    //     return setToastMsg({ type: 'danger', message: 'Add Exam Attempt Error' });
    //   }
    // );
    // const examAttemptData = examAttemptRes?.data?.addUserExamAttempts[0];
    const examAttemptData = {};
    console.log(examAttemptData, learnerData);

    const sendExamProgressData = {
      user_id: userData?.id,
      user_lsp_id: userOrgData?.user_lsp_id,
      user_cp_id: userCourseMapData?.userCourseMapping?.user_cp_id,
      user_course_id: userCourseMapData?.userCourseMapping?.user_course_id,
      user_ea_id: examAttemptData?.user_ea_id,

      sr_no: '',
      question_id: '',
      question_type: '',
      answer: '',
      q_attempt_status: '',
      total_time_spent: '',
      section_id: ''
    };
    console.log(sendExamProgressData);
  }

  // loader screen till loading
  if (loading) {
    return (
      <div className={styles.loadingExamScreen}>
        <ThemeProvider
          theme={createTheme({
            palette: {
              primary: {
                main: '#6bcfcf'
              }
            }
          })}>
          <CircularProgress />
        </ThemeProvider>
      </div>
    );
  }

  return (
    <div ref={refFullscreen}>
      {isLearner ? (
        <LearnerExamComponent
          data={questionData}
          setData={setQuestionData}
          current={current}
          setCurrent={setCurrent}
          isFullScreen={isFullScreen}
          setIsFullScreen={setIsFullScreen}
        />
      ) : (
        // <ExamLandingPage setIsLearner={setIsLearner} />
        <ExamInstruction
          setIsLearner={setIsLearner}
          isFullScreen={isFullScreen}
          setIsFullScreen={setIsFullScreen}
        />
      )}
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          display: 'flex',
          gap: '10px',
          marginLeft: '40px'
        }}>
        <div onClick={() => setIsFullScreen(toggleFullScreen(refFullscreen.current))}>
          {isFullScreen ? (
            <Image src="/images/svg/fullscreen_exit.svg" height={30} width={30} />
          ) : (
            <Image src="/images/svg/fullscreen.svg" height={30} width={30} />
          )}
        </div>
        <div onClick={() => router.push('/exam')}>
          <Image src="/images/svg/clear.svg" height={30} width={30} />
        </div>
      </div>
    </div>
  );
};

export default ExamScreen;
