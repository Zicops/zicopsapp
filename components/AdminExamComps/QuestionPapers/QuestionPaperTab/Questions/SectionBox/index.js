import { useRecoilState, useRecoilValue } from 'recoil';
import { QuestionPaperTabDataAtom } from '../../../../../../state/atoms/exams.atoms';
import { PopUpStatesAtomFamily } from '../../../../../../state/atoms/popUp.atom';
import BlackBox from '../../../../../common/BlackBox';
import BlackRow from '../../../../../common/BlackRow';
import IconButton from '../../../../../common/IconButton';
import styles from '../../questionPaperTab.module.scss';

export default function SectionBox({ section, setSectionData, setEditMetaData }) {
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

  // return if no section present
  if (!questionPaperTabData.sectionData.length) return null;

  return (
    <>
      <BlackBox>
        {/* render large section row */}
        {isSectionWise && (
          <BlackRow
            type="large"
            title={section.name}
            editHandler={() => {
              setSectionData();
              udpateCustomSectionPopUp(true);
            }}
          />
        )}

        {questionPaperTabData.mappedQb?.map((metaData, index) => {
          // return if qb map does belong current section
          if (metaData?.sectionId !== section.id) return null;

          // render small qb maping row
          return (
            <BlackRow
              key={index}
              type={isSectionWise ? 'small' : 'large'}
              title={metaData?.qbId}
              extraComp={
                <span className={`${styles.numberOfQuestions}`}>[{metaData?.total_questions}]</span>
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
        />
      </BlackBox>
    </>
  );
}
