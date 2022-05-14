import { useRecoilValue, useRecoilState } from 'recoil';
import {
  CustomSectionAtom,
  QuestionMetaDataAtom,
  QuestionPaperMasterAtom
} from '../../../../../../state/atoms/exams.atoms';
import { PopUpStatesAtomFamily } from '../../../../../../state/atoms/popUp.atom';
import BlackBox from '../../../../../common/BlackBox';
import BlackRow from '../../../../../common/BlackRow';
import IconButton from '../../../../../common/IconButton';
import PopUp from '../../../../../common/PopUp';
import AddQuestionMetaData from '../AddQuestionMetaData';
import styles from '../../questionPaperTab.module.scss';

export default function SectionBox({ section }) {
  const [addQuestionMetaDataPopUp, udpateAddQuestionMetaDataPopUp] = useRecoilState(
    PopUpStatesAtomFamily('addQuestionMetaData')
  );
  const customSection = useRecoilValue(CustomSectionAtom);
  const questionMetaData = useRecoilValue(QuestionMetaDataAtom);
  const questionPaper = useRecoilValue(QuestionPaperMasterAtom);

  if (!customSection.length) return null;

  return (
    <>
      <BlackBox>
        {questionPaper.isSectionWise ? (
          <>
            <BlackRow type="large" title={section.name} editHandler={() => {}} />
            {questionMetaData.map((metaData) => (
              <>
                <BlackRow
                  type="small"
                  title={metaData.questionBank}
                  extraComp={
                    <span className={`${styles.numberOfQuestions}`}>
                      [{metaData.numberOfQuestions}]
                    </span>
                  }
                  editHandler={() => {}}
                />
              </>
            ))}
          </>
        ) : (
          questionMetaData.map((metaData) => (
            <>
              <BlackRow
                type="large"
                title={metaData.questionBank}
                extraComp={
                  <span className={`${styles.numberOfQuestions}`}>
                    [{metaData.numberOfQuestions}]
                  </span>
                }
                editHandler={() => {}}
              />
            </>
          ))
        )}

        <IconButton
          text="Add Question"
          styleClass="btnGrey"
          handleClick={() => udpateAddQuestionMetaDataPopUp(true)}
        />
      </BlackBox>

      {/* meta data of question */}
      <PopUp
        isFooterVisible={false}
        isPopUpOpen={addQuestionMetaDataPopUp}
        closeBtn={{ handleClick: () => udpateAddQuestionMetaDataPopUp(false) }}>
        <AddQuestionMetaData handleCancel={() => udpateAddQuestionMetaDataPopUp(false)} />
      </PopUp>
    </>
  );
}
