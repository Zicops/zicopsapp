import ToolTip from '@/components/common/ToolTip';
import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
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
  const questionPaperTabData = useRecoilValue(QuestionPaperTabDataAtom);
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
    let isError = false;
    const metaRes = await loadBankMeta({
      variables: { question_bank_id: allQuestionBankIds }
    }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'QB load error' });
    });
    if (isError) return;

    setQbData(metaRes?.data?.getQBMeta || []);
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
          tooltipText="Create and add new question"
        />
      </BlackBox>
    </>
  );
}
