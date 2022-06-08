import { useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {
  GET_QB_SECTION_MAPPING_BY_SECTION,
  GET_QUESTION_PAPER_META,
  GET_QUESTION_PAPER_SECTION,
  queryClient
} from '../../../../API/Queries';
import {
  getQuestionPaperMasterObject,
  getQuestionPaperTabDataObject,
  QuestionPaperTabDataAtom
} from '../../../../state/atoms/exams.atoms';
import { ToastMsgAtom } from '../../../../state/atoms/toast.atom';
import TabContainer from '../../../common/TabContainer';
import { paperTabData, QuestionPaperTabAtom } from './Logic/questionPaperTab.helper';
import useHandlePaperTab from './Logic/useHandlePaperTab';

export default function QuestionPaperTab() {
  const [loadPaperMeta, { error: loadMetaError }] = useLazyQuery(GET_QUESTION_PAPER_META, {
    client: queryClient
  });
  const [loadPaperSection, { error: loadSectionError }] = useLazyQuery(GET_QUESTION_PAPER_SECTION, {
    client: queryClient
  });
  const [loadQBSectionMapping, { error: loadQBSectionMapError, refetch: refetchMapping }] =
    useLazyQuery(GET_QB_SECTION_MAPPING_BY_SECTION, { client: queryClient });

  const router = useRouter();
  const questionPaperId = router.query?.questionPaperId;

  const [tab, setTab] = useRecoilState(QuestionPaperTabAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [questionPaperTabData, setQuestionPaperTabData] = useRecoilState(QuestionPaperTabDataAtom);

  // load section data and qb mappings
  useEffect(async () => {
    if (!questionPaperId) {
      setQuestionPaperTabData(getQuestionPaperTabDataObject());
      setTab(paperTabData[0].name);
      return;
    }

    const sectionData = [];
    let mappedQb = [];

    // load sections
    let isError = false;
    const metaRes = await loadPaperMeta({
      variables: { question_paper_id: [questionPaperId] }
    }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Paper Master load error' });
    });
    if (isError) return setToastMsg({ type: 'danger', message: 'Paper Master load error' });
    const paperMasterData = metaRes.data.getQPMeta[0];
    const paperMaster = getQuestionPaperMasterObject({
      ...paperMasterData,
      category: paperMasterData?.Category,
      sub_category: paperMasterData?.SubCategory,
      description: paperMasterData?.Description,
      section_wise: paperMasterData?.SectionWise,
      difficulty_level: paperMasterData?.DifficultyLevel,
      suggested_duration: paperMasterData?.SuggestedDuration
    });

    const sectionRes = await loadPaperSection({
      variables: { question_paper_id: questionPaperId }
    }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Section load error' });
    });
    if (isError) return setToastMsg({ type: 'danger', message: 'Section load error' });

    // parse and set section data
    const sections = sectionRes?.data?.getQuestionPaperSections;
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
        variables: { section_id: section.id }
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

    // reloading qb section map after add or edit
    async function refetchQBSectionMapping(sectionId) {
      // refetch question bank section mapping
      let isError = false;
      const mappingRes = await refetchMapping({
        section_id: sectionId
      }).catch((err) => {
        console.log(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: 'QB Section Mapping load error' });
      });
      if (isError) {
        setToastMsg({ type: 'danger', message: 'QB Section Map load error' });
        return null;
      }
      let mappedQb = [...questionPaperTabData.mappedQb].filter(
        (qbMappings) => qbMappings.sectionId !== sectionId
      );

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

      return mappedQb;
    }

    setQuestionPaperTabData({
      ...questionPaperTabData,
      paperMaster: paperMaster,
      sectionData: sectionData,
      mappedQb: mappedQb,
      refetchQBSectionMapping: refetchQBSectionMapping
    });
  }, [questionPaperId]);

  useEffect(() => {
    if (loadSectionError) return setToastMsg({ type: 'danger', message: 'Section load error' });
    if (loadQBSectionMapError)
      return setToastMsg({ type: 'danger', message: 'QB Section Map load error' });
  }, [loadSectionError, loadQBSectionMapError]);

  const { addNewQuestionPaper, updateQuestionPaper } = useHandlePaperTab();

  return (
    <>
      {/* TODO: add footer in tab */}
      <TabContainer
        tabData={paperTabData}
        tab={tab}
        setTab={setTab}
        footerObj={{
          submitDisplay: questionPaperId ? 'Update' : 'Save',
          handleSubmit: questionPaperId ? updateQuestionPaper : addNewQuestionPaper,
          handleCancel: () => router.back()
        }}
      />
    </>
  );
}
