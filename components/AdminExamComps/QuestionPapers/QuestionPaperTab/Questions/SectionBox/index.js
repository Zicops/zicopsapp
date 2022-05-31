import { useRecoilState, useRecoilValue } from 'recoil';
import {
  CustomSectionAtom,
  QuestionMetaDataAtom,
  QuestionPaperTabDataAtom
} from '../../../../../../state/atoms/exams.atoms';
import { PopUpStatesAtomFamily } from '../../../../../../state/atoms/popUp.atom';
import BlackBox from '../../../../../common/BlackBox';
import BlackRow from '../../../../../common/BlackRow';
import IconButton from '../../../../../common/IconButton';
import PopUp from '../../../../../common/PopUp';
import { NewQuestionMetaDataAtom } from '../../Logic/questionPaperTab.helper';
import styles from '../../questionPaperTab.module.scss';
import AddQuestionMetaData from '../AddQuestionMetaData';

export default function SectionBox({ section }) {
  const [addQuestionMetaDataPopUp, udpateAddQuestionMetaDataPopUp] = useRecoilState(
    PopUpStatesAtomFamily('addQuestionMetaData')
  );
  const [newMetaData, setNewMetaData] = useRecoilState(NewQuestionMetaDataAtom);
  const customSection = useRecoilValue(CustomSectionAtom);
  const questionMetaData = useRecoilValue(QuestionMetaDataAtom);
  const questionPaperTabData = useRecoilValue(QuestionPaperTabDataAtom);

  if (!customSection.length) return null;

  return (
    <>
      <BlackBox>
        {questionPaperTabData.questionPaperMaster?.section_wise && (
          <BlackRow type="large" title={section.name} editHandler={() => {}} />
        )}

        {questionMetaData.map((metaData, index) => (
          <BlackRow
            key={index}
            type="large"
            title={metaData.qbId}
            extraComp={
              <span className={`${styles.numberOfQuestions}`}>[{metaData.totalQuestions}]</span>
            }
            editHandler={() => {}}
          />
        ))}

        <IconButton
          text="Add Question"
          styleClass="btnGrey"
          handleClick={() => {
            console.log(section);
            udpateAddQuestionMetaDataPopUp(true);
            setNewMetaData({
              ...newMetaData,
              sectionId: section.id
            });
          }}
        />
      </BlackBox>

      {/* meta data of question */}
      <PopUp
        isFooterVisible={false}
        isPopUpOpen={addQuestionMetaDataPopUp}
        closeBtn={{ handleClick: () => udpateAddQuestionMetaDataPopUp(false) }}>
        <AddQuestionMetaData />
      </PopUp>
    </>
  );
}
