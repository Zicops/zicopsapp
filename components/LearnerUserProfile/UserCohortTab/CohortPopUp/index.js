import { SelectedCohortDataAtom } from '@/state/atoms/users.atom';
import { useEffect } from 'react';
import Popup from 'reactjs-popup';
import { useRecoilState } from 'recoil';
import styles from '../../learnerUserProfile.module.scss';
import useHandleCohortTab from '../../Logic/useHandleCohortTab';
import { cohortTabData } from '../../Logic/userBody.helper';

export default function CohortPopUp({ cohortData, closePopUp = () => {} }) {
  const { cohortTab, setCohortTab, showActiveTab } = useHandleCohortTab();

  const [selectedCohort, setSelectedCohort] = useRecoilState(SelectedCohortDataAtom);

  useEffect(() => {
    console.log(selectedCohort, 'selected cohort');
    if (cohortTab === 'Invites' && selectedCohort?.userCohort?.role?.toLowerCase() !== 'manager')
      return setCohortTab('Courses');
  }, [cohortData]);

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
          {cohortTabData.map((t) => {
            if (
              t?.name?.toLowerCase().includes('invite') &&
              selectedCohort?.userCohort?.role?.toLowerCase() !== 'manager'
            )
              return null;

            return (
              <li
                key={t.name}
                className={cohortTab === t.name ? `${styles.active}` : ''}
                onClick={() => setCohortTab(t.name)}>
                {t.name}
              </li>
            );
          })}
        </ul>

        <section className={`${styles.tabSection}`}>{showActiveTab(cohortTab)}</section>
      </div>
    </Popup>
  );
}
