import {
  GET_EXAM_CONFIG,
  GET_EXAM_INSTRUCTION,
  GET_EXAM_META,
  GET_QB_SECTION_MAPPING_BY_SECTION,
  GET_QUESTION_BY_ID,
  GET_QUESTION_OPTIONS,
  GET_QUESTION_PAPER_SECTION
} from '@/api/Queries';
import {
  GET_USER_EXAM_ATTEMPTS,
  GET_USER_EXAM_PROGRESS,
  GET_USER_EXAM_RESULTS,
  userQueryClient
} from '@/api/UserQueries';
import Accordion from '@/components/common/Accordion';
import AttemptsTable from '@/components/common/AttemptsTable';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import Loader from '@/components/common/Loader';
import QuestionOptionView from '@/components/common/QuestionOptionView';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { sortArrByKeyInOrder } from '@/helper/data.helper';
import { LearnerExamAtom, QuestionOptionDataAtom } from '@/state/atoms/exams.atoms';
import { UserDataAtom } from '@/state/atoms/global.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { UserExamDataAtom } from '@/state/atoms/video.atom';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styles from '../../../answerKey.module.scss';

export default function AnswerKeyPage() {
  const learnerExamData = useRecoilValue(LearnerExamAtom);
  const questionOptionData = useRecoilValue(QuestionOptionDataAtom);
  const userExamData = useRecoilValue(UserExamDataAtom);
  const userData = useRecoilValue(UserStateAtom);
  const userDataGlobal = useRecoilValue(UserDataAtom);

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const [attemptData, setAttemptData] = useState({});
  const [attemptedQuestions, setAttemptedQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const cpId = router?.query?.cpId;
  const examId = router?.query?.examId;
  const attemptId = router?.query?.attemptId;

  useEffect(async () => {
    setLoading(true);
    if (!userData?.id) return;
    if (!examId) return;
    if (!cpId) return;

    // load master data

    let isError = false;
    const masterRes = await loadQueryDataAsync(GET_EXAM_META, {
      exam_ids: [examId]
    }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Exam Master load error' });
    });
    if (isError) return;
    const masterData = masterRes?.getExamsMeta?.[0];

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
      is_exam_active: masterData.IsActive || true
    };

    // const metaRes = await loadPaperMeta({
    //   variables: { question_paper_id: [masterObj?.qpId] }
    // }).catch((err) => {
    //   console.log(err);
    //   isError = !!err;
    //   return setToastMsg({ type: 'danger', message: 'Paper Master load error' });
    // });
    // if (isError) return;
    // const paperMasterData = metaRes.data.getQPMeta[0];

    // const paperMaster = {
    //   name: paperMasterData?.name,
    //   category: paperMasterData?.Category,
    //   subCategory: paperMasterData?.SubCategory,
    //   description: paperMasterData?.Description,
    //   section_wise: paperMasterData?.SectionWise,
    //   difficultyLevel: paperMasterData?.DifficultyLevel,
    //   suggested_duration: paperMasterData?.SuggestedDuration,
    //   status: paperMasterData?.Status
    // };

    // masterObj.category = paperMaster.category;
    // masterObj.subCategory = paperMaster.subCategory;
    // masterObj.paperName = paperMaster.name;

    // load instructions
    const insRes = await loadQueryDataAsync(
      GET_EXAM_INSTRUCTION,
      { exam_id: examId },
      { fetchPolicy: 'no-cache' }
    ).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Instructions load error' });
    });
    if (isError) return;
    const insData = insRes?.getExamInstruction[0];
    const insObj = {
      instructionId: insData?.id || null,
      passingCriteria: insData?.PassingCriteria,
      noAttempts: insData?.NoAttempts,
      instructions: insData?.Instructions || '',
      accessType: insData?.AccessType || '',
      is_ins_active: insData?.IsActive || true
    };

    // load schedule
    // let schObj = {};
    // if (masterObj.scheduleType === 'scheduled') {
    //   const schRes = await loadSchedule({
    //     variables: { exam_id: examId },
    //     fetchPolicy: 'no-cache'
    //   }).catch((err) => {
    //     console.log(err);
    //     isError = !!err;
    //     return setToastMsg({ type: 'danger', message: 'Schedule load error' });
    //   });
    //   if (isError) return;
    //   const schData = schRes?.data?.getExamSchedule[0];

    //   schObj = {
    //     scheduleId: schData?.id || null,
    //     examStart: new Date(+schData?.Start * 1000),
    //     examEnd: +schData?.End ? new Date(+schData?.End * 1000) : null,
    //     bufferTime: schData?.BufferTime || 0,
    //     is_schedule_active: schData?.IsActive || true
    //   };
    // }

    // load config
    const confRes = await loadQueryDataAsync(GET_EXAM_CONFIG, { exam_id: examId }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Config load error' });
    });
    if (isError) return;
    const confData = confRes?.getExamConfiguration[0];
    // console.log(confData, confData?.ShowResult, confData?.ShowAnswer);
    const confObj = {
      configId: confData?.id || null,
      shuffle: confData?.Shuffle || false,
      display_hints: confData?.DisplayHints || false,
      show_result: confData?.ShowResult || false,
      show_answer: confData?.ShowAnswer || false,
      is_config_active: confData?.IsActive || true
    };

    const attemptRes = await loadQueryDataAsync(
      GET_USER_EXAM_ATTEMPTS,
      { user_id: userData?.id, user_lsp_id: userDataGlobal?.userDetails?.user_lsp_id },
      {},
      userQueryClient
    );
    const examAttemptData =
      attemptRes?.getUserExamAttempts
        ?.filter((ea) => {
          return (
            ea?.exam_id === examId && ea?.user_cp_id === cpId && ea?.attempt_status === 'completed'
          );
        })
        ?.sort((a1, a2) => a1?.attempt_no - a2?.attempt_no) || [];

    const activeAttemptId = attemptId || attemptData?.currentAttemptId;
    let currentExamAttemptData =
      examAttemptData?.find((ea) => {
        return ea?.user_ea_id === activeAttemptId;
      }) || null;

    if (!currentExamAttemptData) currentExamAttemptData = examAttemptData[0];

    let progressRes = null;
    if (currentExamAttemptData?.user_ea_id) {
      progressRes = await loadQueryDataAsync(
        GET_USER_EXAM_PROGRESS,
        { user_id: userData?.id, user_ea_id: currentExamAttemptData?.user_ea_id },
        {},
        userQueryClient
      );
      for (let i = 0; i < examAttemptData.length; i++) {
        const attempt = examAttemptData[i];

        const resultRes = await loadQueryDataAsync(
          GET_USER_EXAM_RESULTS,
          { user_id: userData?.id, user_ea_id: attempt?.user_ea_id },
          {},
          userQueryClient
        );

        if (resultRes?.error) return setToastMsg({ type: 'danger', message: 'Result Load Error' });
        examAttemptData[i].result = resultRes?.getUserExamResults || [];
      }

      // resultRes = await loadQueryDataAsync(
      //   GET_USER_EXAM_RESULTS,
      //   { user_id: userData?.id, user_ea_id: currentExamAttemptData?.user_ea_id },
      //   {},
      //   userQueryClient
      // );
    }

    if (!progressRes?.getUserExamProgress?.length) progressRes = [];
    const userExamDataLoaded = structuredClone({
      ...userExamData,
      userExamAttempts: examAttemptData || [],
      userExamProgress:
        [...(progressRes?.getUserExamProgress || [])]?.sort(
          (ep1, ep2) => ep1?.sr_no - ep2?.sr_no
        ) || [],
      // userExamResults: resultRes?.getUserExamResults || [],
      currentAttemptId: examAttemptData[0]?.user_ea_id
    });

    userExamDataLoaded.currentAttemptId = currentExamAttemptData?.user_ea_id;

    const questionPaperId = masterObj?.qpId;

    // load section data and qb mappings
    const sectionData = [];
    let quesData = [];
    let mappedQb = [];
    let totalQuestions = 0;
    let totalMarks = 0;
    const fixedQuestionIds = [];

    // load sections
    const sectionRes = await loadQueryDataAsync(GET_QUESTION_PAPER_SECTION, {
      question_paper_id: questionPaperId
    }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Section load error' });
    });
    if (isError) return;

    // parse and set section data
    const sections = sortArrByKeyInOrder(sectionRes?.getQuestionPaperSections, 'CreatedAt') || [];
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      fixedQuestionIds.push({
        section_id: section.id,
        total_questions: section.TotalQuestions,
        questionIds: [],
        selectedOption: []
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
      const mappingRes = await loadQueryDataAsync(GET_QB_SECTION_MAPPING_BY_SECTION, {
        section_id: section.id
      }).catch((err) => {
        console.log(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: 'QB Section Mapping load error' });
      });
      if (isError) return setToastMsg({ type: 'danger', message: 'QB Section Map load error' });

      const _mappings = sortArrByKeyInOrder(mappingRes?.getQPBankMappingBySectionId, 'CreatedAt');
      mappedQb = [
        ...mappedQb,
        ..._mappings?.map((qbMappings) => {
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

    if (currentExamAttemptData?.user_ea_id) {
      userExamDataLoaded?.userExamProgress?.forEach((ep) => {
        if (ep?.user_ea_id !== currentExamAttemptData?.user_ea_id) return;

        const index = fixedQuestionIds?.findIndex((obj) => obj?.section_id === ep?.section_id);
        if (index >= 0) {
          fixedQuestionIds?.[index]?.questionIds?.push(ep?.question_id);
          fixedQuestionIds?.[index]?.selectedOption?.push(ep?.answer);
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

        const questions = questionsDataRes?.getQuestionsById?.map((q, qIndex) => {
          const _qbMap = sectionQbMaps?.filter((qbMap) => qbMap?.qbId === q?.QbmId)[0];
          totalMarks = +totalMarks + +_qbMap?.question_marks;

          return {
            id: q?.id,
            description: q?.Description || null,
            type: q?.Type || 'MCQ',
            difficulty: q?.Difficulty || null,
            attachment: q?.Attachment || null,
            attachmentType: q?.AttachmentType || null,
            hint: q?.Hint || null,
            qbmId: q?.QbmId || null,
            question_marks: _qbMap?.question_marks || null,
            selectedOption: fixedQData?.selectedOption[qIndex]
          };
        });
        // load all options for all questions
        for (let j = 0; j < questions.length; j++) {
          const question = questions[j];
          const allOptions = [];
          const optionsRes = await loadQueryDataAsync(GET_QUESTION_OPTIONS, {
            question_id: question.id
          }).catch((err) => {
            console.log(err);
            isError = !!err;
            setToastMsg({ type: 'danger', message: 'Options load error' });
          });
          if (isError) continue;
          if (optionsRes?.getOptionsForQuestions[0]?.options) {
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
          sectionData[sectionIndex].questions.push(_quesData);
        });
        totalQuestions += questions?.length || 0;
        // totalMarks += mapping?.question_marks * questions?.length || 0;
      }
    }

    // console.log(insObj, {
    //   ...learnerExamData,
    //   examData: {
    //     ...masterObj,
    //     ...insObj,
    //     // ...schObj,
    //     ...confObj,
    //     totalMarks: totalMarks || '0'
    //   },
    //   // landingPageData: {
    //   //   // testSeries: 'PMP Test Series',
    //   //   // testSequence: 'M1A4',
    //   //   isProctoring: 'No',
    //   //   totalQuestions: totalQuestions || '0',
    //   //   isNegativeMarking: 'No',
    //   //   expertiseLevel: paperMaster?.difficultyLevel
    //   // },
    //   // insPageData: {
    //   //   examTimeStandard: 'IST',
    //   //   attempts: userExamDataLoaded?.userExamAttempts?.length
    //   // },
    //   sectionData: sectionData
    // });
    setAttemptData(userExamDataLoaded);
    setAttemptedQuestions({
      ...learnerExamData,
      examData: {
        ...masterObj,
        ...insObj,
        // ...schObj,
        ...confObj,
        // show_answer: true,
        totalMarks: totalMarks || '0'
      },
      // landingPageData: {
      //   // testSeries: 'PMP Test Series',
      //   // testSequence: 'M1A4',
      //   isProctoring: 'No',
      //   totalQuestions: totalQuestions || '0',
      //   isNegativeMarking: 'No',
      //   expertiseLevel: paperMaster?.difficultyLevel
      // },
      // insPageData: {
      //   examTimeStandard: 'IST',
      //   attempts: userExamDataLoaded?.userExamAttempts?.length
      // },
      sectionData: sectionData
    });

    setLoading(false);
  }, [examId, cpId, userData?.id, attemptData?.currentAttemptId, attemptId]);

  // loader screen till loading
  if (loading) return <Loader />;

  const activeAttemptNumber = (
    attemptData?.userExamAttempts?.find((ea) => ea?.user_ea_id === attemptData?.currentAttemptId) ||
    attemptData?.userExamAttempts?.[0]
  )?.attempt_no;

  return (
    <div className={`${styles.answerKey}`}>
      <div className={`${styles.backBtn}`}>
        <button onClick={() => router.back()}>
          <img src="/images/Back.png" />
        </button>
      </div>

      <h2 className={`h2`}>{attemptedQuestions?.examData?.name || 'Exam Name'}</h2>

      <LabeledDropdown
        dropdownOptions={{
          placeholder: 'Attempts',
          options:
            attemptData?.userExamAttempts?.map((ea) => ({
              label: `Attempt ${ea?.attempt_no}`,
              value: ea?.user_ea_id
            })) || [],
          value: {
            value: attemptData?.currentAttemptId || attemptData?.userExamAttempts?.[0]?.user_ea_id,
            label: `Attempt ${activeAttemptNumber}`
          }
        }}
        styleClass={styles.dropdownInput}
        changeHandler={(e) => setAttemptData({ ...attemptData, currentAttemptId: e.value })}
      />

      <div className={`${styles.tableContainer}`}>
        <p>Results</p>
        <AttemptsTable
          totalAttempts={attemptedQuestions?.examData?.noAttempts}
          activeRow={activeAttemptNumber - 1}
          attemptData={
            attemptData?.userExamAttempts?.map((ea, i) => {
              const resultData = ea?.result?.result_status
                ? JSON.parse(ea?.result?.result_status)
                : {};

              return {
                attempt: ea?.attempt_no,
                examScore: ea?.result?.user_score,
                totalMarks: resultData?.totalMarks,
                result: attemptedQuestions?.examData?.show_result ? resultData?.status : 'Completed'
              };
            }) || []
          }
        />
      </div>

      {/* questions */}
      <div className={`${styles.questionPaper}`}>
        {attemptedQuestions?.sectionData?.map((section, i) => {
          return (
            <Fragment key={i}>
              <Accordion title={section?.name} customClass={`${styles.accordion}`}>
                <div className={`${styles.questionTop}`}>
                  <p>{section?.description}</p>
                  <p>
                    Questions:{' '}
                    <span>{section?.total_questions || section?.questions?.length || 0}</span>
                  </p>
                </div>

                {section?.questions?.map((each) => {
                  // const each = questionOptionData?.filter((q) => q?.question?.id === id)[0];
                  if (!each) return null;

                  return (
                    <div className={`${styles.questionCard}`} key={each?.id}>
                      <QuestionOptionView
                        questionCount={each.id}
                        questionData={each.question}
                        optionData={attemptedQuestions?.examData?.show_answer ? null : each.options}
                        compareCorrect={attemptedQuestions?.examData?.show_answer}
                        showAnswer={attemptedQuestions?.examData?.show_answer}
                        selectedAnswerId={each?.selectedOption}
                        showType={
                          attemptedQuestions?.examData?.show_answer ? 'marksObtained' : 'marks'
                        }
                        showHints={attemptedQuestions?.examData?.display_hints}
                      />
                    </div>
                  );
                })}
              </Accordion>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
