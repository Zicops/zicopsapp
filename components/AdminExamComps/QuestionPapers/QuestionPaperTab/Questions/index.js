import { useRecoilState, useRecoilValue } from 'recoil';
import {
  CustomSectionAtom,
  QuestionPaperTabDataAtom
} from '../../../../../state/atoms/exams.atoms';
import { PopUpStatesAtomFamily } from '../../../../../state/atoms/popUp.atom';
import IconButton from '../../../../common/IconButton';
import PopUp from '../../../../common/PopUp';
import styles from '../questionPaperTab.module.scss';
import AddCustomSection from './AddCustomSection';
import AddQuestionMetaData from './AddQuestionMetaData';
import SectionBox from './SectionBox';

export default function Questions() {
  const [customSectionPopUp, udpateCustomSectionPopUp] = useRecoilState(
    PopUpStatesAtomFamily('addCustomSection')
  );
  const [addQuestionMetaDataPopUp, udpateAddQuestionMetaDataPopUp] = useRecoilState(
    PopUpStatesAtomFamily('addQuestionMetaData')
  );
  const customSection = useRecoilValue(CustomSectionAtom);
  const questionPaperTabData = useRecoilValue(QuestionPaperTabDataAtom);
  console.log(questionPaperTabData);
  return (
    <div className={`${customSection.length ? '' : 'h-100'}`}>
      <div
        className={`${customSection.length ? 'w-100' : 'h-100 center-element-with-flex'} ${
          styles.sectionBoxContainer
        }`}>
        {customSection.map((section) => (
          <SectionBox section={section} />
        ))}

        {questionPaperTabData.questionPaperMaster?.section_wise && (
          <IconButton
            text="Add Section"
            styleClass="btnBlack"
            handleClick={() => udpateCustomSectionPopUp(true)}
          />
        )}
        {!questionPaperTabData.questionPaperMaster?.section_wise && !customSection.length && (
          <IconButton
            text="Add Question"
            styleClass="btnGrey"
            handleClick={() => udpateAddQuestionMetaDataPopUp(true)}
          />
        )}
      </div>

      {/* custom section */}
      <PopUp
        isFooterVisible={false}
        isPopUpOpen={customSectionPopUp}
        title="Add Custom Section"
        closeBtn={{ handleClick: () => udpateCustomSectionPopUp(false) }}>
        <AddCustomSection />
      </PopUp>

      {/* meta data of question */}
      <PopUp
        isFooterVisible={false}
        isPopUpOpen={addQuestionMetaDataPopUp}
        closeBtn={{ handleClick: () => udpateAddQuestionMetaDataPopUp(false) }}>
        <AddQuestionMetaData handleCancel={() => udpateAddQuestionMetaDataPopUp(false)} />
      </PopUp>
    </div>
  );
}
