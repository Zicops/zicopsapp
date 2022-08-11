import CohortListCard from '@/components/common/CohortListCard';
import IconBtn from '@/components/common/IconBtn';
import { useState } from 'react';
import styles from '../learnerUserProfile.module.scss';
import { cohortData } from '../Logic/userBody.helper';
import CohortPopUp from './CohortPopUp';

const UserCohortTab = () => {
  const [selectedCohort, setSelectedCohort] = useState(null);

  return (
    <div className={`${styles.userTabContainer}`}>
      <p>Your Cohort</p>

      <hr />

      <div className={`${styles.listCardContainer}`}>
        {cohortData?.map((cohort) => {
          const btnData = {
            imgSrc: '/images/svg/calendar-month.svg',
            display: 'Member',
            color: null,
            isDisabled: false
          };

          if (cohort.isManager) {
            btnData.display = 'Cohort Manager';
            btnData.color = 'var(--primary)';
          }

          if (cohort.isResigned) {
            btnData.display = 'Resigned';
            btnData.color = 'red';
            btnData.isDisabled = true;
          }

          return (
            <CohortListCard
              cohortData={cohort}
              key={cohort.id}
              handleClick={() => {
                setSelectedCohort(cohort);
              }}>
              <div className={`${styles.btnContainer}`}>
                <p>
                  <img src="/images/svg/calendar-month.svg" alt="" />
                  Joined On: {cohort?.joinedOn}
                </p>

                <IconBtn color={btnData.color} isDisabled={btnData.isDisabled}>
                  <img src={btnData.imgSrc} alt="" />
                  {btnData.display}
                </IconBtn>
              </div>
            </CohortListCard>
          );
        })}
      </div>

      <CohortPopUp cohortData={selectedCohort} closePopUp={() => setSelectedCohort(null)} />
    </div>
  );
};

export default UserCohortTab;
