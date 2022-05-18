import { useRecoilState, useRecoilValue } from 'recoil';
import {
  CustomSectionAtom,
  QuestionMetaDataAtom, QuestionPaperTabDataAtom
} from '../../../../../../state/atoms/exams.atoms';
import { PopUpStatesAtomFamily } from '../../../../../../state/atoms/popUp.atom';
import BlackBox from '../../../../../common/BlackBox';
import BlackRow from '../../../../../common/BlackRow';
import IconButton from '../../../../../common/IconButton';
import PopUp from '../../../../../common/PopUp';
import styles from '../../questionPaperTab.module.scss';
import AddQuestionMetaData from '../AddQuestionMetaData';

export default function SectionBox({ section }) {
  const [addQuestionMetaDataPopUp, udpateAddQuestionMetaDataPopUp] = useRecoilState(
    PopUpStatesAtomFamily('addQuestionMetaData')
  );
  const customSection = useRecoilValue(CustomSectionAtom);
  const questionMetaData = useRecoilValue(QuestionMetaDataAtom);
  const questionPaperTabData = useRecoilValue(QuestionPaperTabDataAtom);

  if (!customSection.length) return null;

  return (
    <>
      <BlackBox>
        {questionPaperTabData.questionPaperMaster?.section_wise ? (
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
