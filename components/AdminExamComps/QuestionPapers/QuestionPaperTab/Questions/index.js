import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { QuestionPaperTabDataAtom } from '../../../../../state/atoms/exams.atoms';
import { PopUpStatesAtomFamily } from '../../../../../state/atoms/popUp.atom';
import { ToastMsgAtom } from '../../../../../state/atoms/toast.atom';
import IconButton from '../../../../common/IconButton';
import PopUp from '../../../../common/PopUp';
import { paperTabData, QuestionPaperTabAtom } from '../Logic/questionPaperTab.helper';
import styles from '../questionPaperTab.module.scss';
import AddCustomSection from './AddCustomSection';
import AddQuestionMetaData from './AddQuestionMetaData';
import SectionBox from './SectionBox';

export default function Questions() {
  const [addSectionPopUp, udpateAddSectionPopUp] = useRecoilState(
    PopUpStatesAtomFamily('addCustomSection')
  );
  const [editSectionPopUp, udpateEditSectionPopUp] = useRecoilState(
    PopUpStatesAtomFamily('editCustomSection')
  );
  const [addQuestionMetaDataPopUp, udpateAddQuestionMetaDataPopUp] = useRecoilState(
    PopUpStatesAtomFamily('addQuestionMetaData')
  );
  const [editQuestionMetaDataPopUp, udpateEditQuestionMetaDataPopUp] = useRecoilState(
    PopUpStatesAtomFamily('editQuestionMetaData')
  );
  const [tab, setTab] = useRecoilState(QuestionPaperTabAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const questionPaperTabData = useRecoilValue(QuestionPaperTabDataAtom);

  const [selectedSectionData, setSelectedSectionData] = useState(null);
  const [editMetaData, setEditMetaData] = useState(null);

  const customSection = questionPaperTabData.sectionData;

  // reset data on close
  useEffect(() => {
    if (!(editSectionPopUp || addQuestionMetaDataPopUp)) setSelectedSectionData(null);
  }, [editSectionPopUp, addQuestionMetaDataPopUp]);

  // if id is not present return to first tab
  function disableIfIdNotPresent() {
    if (questionPaperTabData?.paperMaster?.id) return false;

    setTab(paperTabData[0].name);
    setToastMsg({ type: 'danger', message: 'Please fill and save question paper master first' });
    return true;
  }

  return (
    <div className={`${customSection.length ? '' : 'h-100'}`}>
      <div
        className={`${customSection.length ? 'w-100' : 'h-100 center-element-with-flex'} ${
          styles.sectionBoxContainer
        }`}>
        {/* show section like module */}
        {customSection.map((section) => (
          <SectionBox
            key={section?.id}
            section={section}
            setSectionData={() => setSelectedSectionData(section)}
            setEditMetaData={setEditMetaData}
          />
        ))}

        {/* show add section button if section wise is true */}
        {questionPaperTabData.paperMaster?.section_wise && (
          <IconButton
            text="Add Section"
            styleClass="btnBlack"
            handleClick={() => {
              if (disableIfIdNotPresent()) return;
              udpateAddSectionPopUp(true);
            }}
          />
        )}

        {/* show add question if not section wise and no section added */}
        {!questionPaperTabData.paperMaster?.section_wise && !customSection.length && (
          <IconButton
            text="Add Question"
            styleClass="btnGrey"
            handleClick={() => {
              if (disableIfIdNotPresent()) return;
              udpateAddQuestionMetaDataPopUp(true);
            }}
          />
        )}
      </div>

      {/* add custom section */}
      <PopUp
        isFooterVisible={false}
        popUpState={[addSectionPopUp, udpateAddSectionPopUp]}
        title="Add Custom Section">
        <AddCustomSection />
      </PopUp>

      {/* edit custom section */}
      <PopUp
        isFooterVisible={false}
        popUpState={[editSectionPopUp, udpateEditSectionPopUp]}
        title="Edit Custom Section">
        <AddCustomSection editData={selectedSectionData} />
      </PopUp>

      {/* add meta data of question */}
      <PopUp
        isFooterVisible={false}
        popUpState={[addQuestionMetaDataPopUp, udpateAddQuestionMetaDataPopUp]}
        title="Add Question Meta Data">
        <AddQuestionMetaData sectionId={selectedSectionData?.id} />
      </PopUp>

      {/* edit meta data of question */}
      {!!selectedSectionData?.id && (
        <PopUp
          isFooterVisible={false}
          popUpState={[editQuestionMetaDataPopUp, udpateEditQuestionMetaDataPopUp]}
          title="Edit Question Meta Data">
          <AddQuestionMetaData sectionId={selectedSectionData?.id} editData={editMetaData} />
        </PopUp>
      )}
    </div>
  );
}
