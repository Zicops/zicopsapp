import { useState } from 'react';
import IconButton from '../../../common/IconButton';
import PopUp from '../../../common/PopUp';
import McqCard from '../../McqCard';
import styles from './question.module.scss';
import AddCustomSection from '../../AddCustomSection';

export default function Question() {
  const [showMcqCard, setShowMcqCard] = useState(false);
  const [showSectionPopup, setShowSectionPopup] = useState(false);

  return (
    <div className={`${styles.questionContainer}`}>
      <IconButton
        text="Add Section"
        styleClass="btnBlack"
        handleClick={() => setShowSectionPopup(true)}
      />
      <IconButton text="View MCQ" styleClass="btnBlack" handleClick={() => setShowMcqCard(true)} />

      <PopUp isFooterVisible={false} title="Question 1" popUpState={[showMcqCard, setShowMcqCard]}>
        <McqCard question={'This is a question that you have to answer?'} />
      </PopUp>

      <PopUp isFooterVisible={false} popUpState={[showSectionPopup, setShowSectionPopup]}>
        <AddCustomSection />
      </PopUp>
    </div>
  );
}
