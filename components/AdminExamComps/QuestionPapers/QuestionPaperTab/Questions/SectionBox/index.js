import { DELETE_QUESTION_PAPER_SECTION, DELETE_SECTION_TO_BANK } from '@/api/Mutations';
import ToolTip from '@/components/common/ToolTip';
import { ADMIN_EXAMS } from '@/components/common/ToolTip/tooltip.helper';
import { loadMultipleLspDataWithMultipleQueries } from '@/helper/api.helper';
import { COMMON_LSPS } from '@/helper/constants.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { GET_QUESTION_BANK_NAME, queryClient } from '../../../../../../API/Queries';
import { QuestionPaperTabDataAtom } from '../../../../../../state/atoms/exams.atoms';
import { PopUpStatesAtomFamily } from '../../../../../../state/atoms/popUp.atom';
import BlackBox from '../../../../../common/BlackBox';
import BlackRow from '../../../../../common/BlackRow';
import IconButton from '../../../../../common/IconButton';
import styles from '../../questionPaperTab.module.scss';

export default function SectionBox({ section, setSectionData, setEditMetaData }) {
  const [loadBankMeta, { error: loadMetaError }] = useLazyQuery(GET_QUESTION_BANK_NAME, {
    client: queryClient
  });
  const [addQuestionMetaDataPopUp, udpateAddQuestionMetaDataPopUp] = useRecoilState(
    PopUpStatesAtomFamily('addQuestionMetaData')
  );
  const [editQuestionMetaDataPopUp, udpateEditQuestionMetaDataPopUp] = useRecoilState(
    PopUpStatesAtomFamily('editQuestionMetaData')
  );
  const [customSectionPopUp, udpateCustomSectionPopUp] = useRecoilState(
    PopUpStatesAtomFamily('editCustomSection')
  );
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [questionPaperTabData, setQuestionPaperTabData] = useRecoilState(QuestionPaperTabDataAtom);
  const isSectionWise = questionPaperTabData.paperMaster?.section_wise;

  const [qbData, setQbData] = useState([]);
  let sequence = 0;

  useEffect(() => {
    loadBankData();
  }, [questionPaperTabData?.mappedQb]);

  async function loadBankData() {
    const allQuestionBankIds = [];
    questionPaperTabData.mappedQb?.forEach((map) => allQuestionBankIds.push(map?.qbId));
    if (!allQuestionBankIds.length) return;

    // load qb names
    // let isError = false;
    // const metaRes = await loadBankMeta({
    //   variables: { question_bank_id: allQuestionBankIds }
    // }).catch((err) => {
    //   console.log(err);
    //   isError = !!err;
    //   return setToastMsg({ type: 'danger', message: 'QB load error' });
    // });
    // if (isError) return;

    const qbDataResArr = await loadMultipleLspDataWithMultipleQueries(
      GET_QUESTION_BANK_NAME,
      { question_bank_id: allQuestionBankIds },
      {},
      queryClient,
      [COMMON_LSPS.zicops]
    );
    const qbNameArr = [];
    qbDataResArr?.forEach((res) => qbNameArr.push(...(res?.getQBMeta || [])));

    setQbData(qbNameArr);
  }
  // return if no section present
  if (!questionPaperTabData?.sectionData?.length) return null;

  return (
    <>
      <BlackBox>
        {/* render large section row */}
        {isSectionWise && (
          <BlackRow
            type="large"
            title={`Section: ${section.name}`}
            editHandler={() => {
              setSectionData();
              udpateCustomSectionPopUp(true);
            }}
            tooltipTitle="Edit Section"
            deleteProps={{
              id: section?.id,
              resKey: 'deleteQuestionPaperSection',
              mutation: DELETE_QUESTION_PAPER_SECTION,
              deleteCondition: () => {
                const sectionMappings = questionPaperTabData?.mappedQb?.filter(
                  (map) => map?.sectionId === section?.id
                );
                if (!!sectionMappings?.length) {
                  setToastMsg({
                    type: 'danger',
                    message: "Delete Section's Mappings First"
                  });
                  return false;
                }
                return true;
              },
              onDelete: async () => {
                const _sectionData = structuredClone(questionPaperTabData?.sectionData);
                const index = _sectionData?.findIndex((s) => s?.id === section?.id);
                if (index >= 0) _sectionData?.splice(index, 1);

                setQuestionPaperTabData({ ...questionPaperTabData, sectionData: _sectionData });
              }
            }}
          />
        )}

        {questionPaperTabData?.mappedQb?.map((metaData, index) => {
          // return if qb map does belong current section
          if (metaData?.sectionId !== section.id) {
            // --sequence;
            return null;
          }

          // render small qb maping row
          const bankName = qbData?.find((qb) => qb.id === metaData?.qbId);
          return (
            <BlackRow
              key={index}
              type={isSectionWise ? 'small' : 'large'}
              title={`Question Bank ${++sequence}: ${bankName?.name || ''}`}
              tooltipTitle="Edit Questions"
              extraComp={
                <ToolTip title="Number of questions selected" placement="right">
                  <span className={`${styles.numberOfQuestions}`}>
                    [{metaData?.total_questions}]
                  </span>
                </ToolTip>
              }
              editHandler={() => {
                setEditMetaData(metaData);
                setSectionData();
                udpateEditQuestionMetaDataPopUp(true);
              }}
              deleteProps={{
                id: metaData?.id,
                resKey: 'deleteSectionToBank',
                mutation: DELETE_SECTION_TO_BANK,
                // deleteCondition: () => {
                //   const sectionMappings = questionPaperTabData?.mappedQb?.filter(
                //     (map) => map?.sectionId === section?.id
                //   );
                //   if (!!sectionMappings?.length) {
                //     setToastMsg({
                //       type: 'danger',
                //       message: "Delete Section's Mappings First"
                //     });
                //     return false;
                //   }
                //   return true;
                // },
                onDelete: async () => {
                  const _qbData = structuredClone(questionPaperTabData?.mappedQb);
                  const index = _qbData?.findIndex((qbMap) => qbMap?.id === metaData?.id);
                  if (index >= 0) _qbData?.splice(index, 1);

                  setQuestionPaperTabData({ ...questionPaperTabData, mappedQb: _qbData });
                }
              }}
            />
          );
        })}

        <IconButton
          text="Add Question"
          styleClass="btnGrey"
          handleClick={() => {
            setSectionData();
            udpateAddQuestionMetaDataPopUp(true);
          }}
          tooltipText={
            ADMIN_EXAMS.myQuestionPapers.addQuestionPapers.questionsTab.addSection.addQuestionBtn
          }
          tooltipPlacement="right"
        />
      </BlackBox>
    </>
  );
}
