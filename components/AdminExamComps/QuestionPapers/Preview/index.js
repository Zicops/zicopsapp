import { useLazyQuery } from '@apollo/client';
import { Box, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  GET_FIXED_QUESTION,
  GET_QB_SECTION_MAPPING_BY_SECTION,
  GET_QUESTION_BANK_QUESTIONS,
  GET_QUESTION_OPTIONS,
  GET_QUESTION_PAPER_META,
  GET_QUESTION_PAPER_SECTION,
  queryClient
} from '../../../../API/Queries';
import { ToastMsgAtom } from '../../../../state/atoms/toast.atom';
import { questionList } from './Logic/QuestionPaperPreview.helper';
import styles from './preview.module.scss';
import QuestionPaperTop from './QuestionPaperTop';
import QuestionSection from './QuestionSection';

export default function Preview({ masterData }) {
  const [loadPaperMeta, { error: loadMetaError }] = useLazyQuery(GET_QUESTION_PAPER_META, {
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
  const [loadOptions, { error: errorOptionsData }] = useLazyQuery(GET_QUESTION_OPTIONS, {
    client: queryClient
  });

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [data, setData] = useState({ ...masterData });

  const questionPaperId = masterData.id;

  // load section data and qb mappings
  useEffect(async () => {
    const sectionData = [];
    let mappedQb = [];
    let totalQuestions = 0;
    let totalMarks = 0;

    // load sections
    let isError = false;
    const sectionRes = await loadPaperSection({
      variables: { question_paper_id: questionPaperId },
      fetchPolicy: 'no-cache'
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

    // loop to get fixed questions
    for (let i = 0; i < mappedQb.length; i++) {
      const mapping = mappedQb[i];

      // get fixed question for each mapping
      const fixedRes = await loadFixedQuestions({
        variables: { mapping_id: mapping.id },
        fetchPolicy: 'no-cache'
      }).catch((err) => {
        console.log(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: 'fixed load error' });
      });
      if (isError) return;

      const fixedData = fixedRes?.data?.getSectionFixedQuestions[0];
      const allQuestionIds = fixedData?.QuestionId?.split(',') || [];

      if (!allQuestionIds?.length) continue;

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
            qbmId: q.QbmId
          };
        });

      if (!questions?.length) continue;

      // load all options for all questions
      // for (let j = 0; j < allQuestionIds.length; j++) {
      //   for (let k = 0; k < questions.length; k++) {
      //     const question = questions[k];
      //     const allOptions = [];
      //     const optionsRes = await loadOptions({
      //       variables: { question_id: question.id },
      //       fetchPolicy: 'no-cache'
      //     }).catch((err) => {
      //       console.log(err);
      //       isError = !!err;
      //       setToastMsg({ type: 'danger', message: 'Options load error' });
      //     });
      //     if (isError) continue;

      //     if (optionsRes?.data?.getOptionsForQuestions[0]?.options) {
      //       optionsRes?.data?.getOptionsForQuestions[0].options.map((option) => {
      //         allOptions.push({
      //           id: option.id,
      //           qmId: option.QmId,
      //           description: option.Description,
      //           isCorrect: option.IsCorrect,
      //           attachmentType: option.AttachmentType,
      //           attachment: option.Attachment
      //         });
      //       });

      //       questions[k].options = allOptions;
      //     }
      //   }
      // }

      const sectionIndex = sectionData.findIndex((section) => section.id === mapping.sectionId);
      if (sectionIndex < 0) continue;

      if (!sectionData[sectionIndex]?.questions) sectionData[sectionIndex].questions = [];

      questions.forEach((q) => sectionData[sectionIndex].questions.push(q));
      totalQuestions += questions?.length || 0;
      totalMarks += mapping?.question_marks * questions?.length || 0;
    }

    // console.log(data, sectionData, mappedQb, questionAndOptions);
    setData({ ...data, sections: sectionData, totalQuestions, totalMarks });
  }, [questionPaperId]);

  // error notification
  useEffect(() => {
    if (loadMetaError) return setToastMsg({ type: 'danger', message: 'Master load error' });
    if (loadSectionError) return setToastMsg({ type: 'danger', message: 'Section load error' });
    if (loadQBSectionMapError)
      return setToastMsg({ type: 'danger', message: 'QB Section Map load error' });
  }, [loadMetaError, loadSectionError, loadQBSectionMapError]);

  const quesSection = {};
  // thinking about pushing value to quesSection.sec_A array. similarly to other elements.

  questionList.forEach((item) => {
    let secKey = `sec${item.section}`;
    quesSection.hasOwnProperty(secKey)
      ? quesSection[secKey].push(item)
      : (quesSection[secKey] = [item]);
  });

  return (
    <>
      {data?.sections ? (
        <div className={`${styles.paperContainer}`}>
          <QuestionPaperTop data={data} />
          <QuestionSection quesSection={quesSection} data={data} />
        </div>
      ) : (
        <Box sx={{ display: 'flex' }} className="center-element-with-flex">
          <CircularProgress />
        </Box>
      )}
    </>
  );
}
