import Popup from 'reactjs-popup';
import styles from '../learnerUserProfile.module.scss';
import useHandleCohortTab from '../Logic/useHandleCohortTab';

export default function CohortPopUp({ cohortData, closePopUp = () => {} }) {
  const { cohortTab } = useHandleCohortTab();

  return (
    <Popup open={cohortData != null} closeOnDocumentClick={false} closeOnEscape={false}>
      <div className={`${styles.cohortTabContainer}`}>
        <div onClick={closePopUp}>X</div>
        <div>Heading</div>
        <div>Body</div>
      </div>
    </Popup>
  );
}
