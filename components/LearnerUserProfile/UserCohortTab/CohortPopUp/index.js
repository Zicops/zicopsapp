import Popup from 'reactjs-popup';
import styles from '../../learnerUserProfile.module.scss';
import useHandleCohortTab from '../../Logic/useHandleCohortTab';
import { cohortTabData } from '../../Logic/userBody.helper';

export default function CohortPopUp({ cohortData, closePopUp = () => {} }) {
  const { cohortTab, showActiveTab } = useHandleCohortTab();

  return (
    <Popup
      open={cohortData != null}
      closeOnDocumentClick={false}
      closeOnEscape={false}
      overlayStyle={{ background: 'rgba(0,0,0, 0.5)' }}>
      <div className={`${styles.cohortTabContainer}`}>
        <div onClick={closePopUp} className={`${styles.close}`}>
          <img src="/images/svg/clear.svg" alt="" />
        </div>

        <ul className={`${styles.tabHeader}`}>
          {cohortTabData.map((t) => (
            <li
              key={t.name}
              className={cohortTab === t.name ? `${styles.active}` : ''}
              onClick={() => setTab(t.name)}>
              {t.name}
            </li>
          ))}
        </ul>

        <section className={`${styles.tabSection}`}>{showActiveTab(cohortTab)}</section>
      </div>
    </Popup>
  );
}
