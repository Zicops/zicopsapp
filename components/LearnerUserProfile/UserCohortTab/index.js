import CohortListCard from '@/components/common/CohortListCard';
import IconBtn from '@/components/common/IconBtn';
import styles from '../learnerUserProfile.module.scss';
import { cohortData } from '../Logic/userBody.helper';

const UserCohortTab = () => {
  return (
    <div className={`${styles.userTabContainer}`}>
      <p>Your Cohort</p>

      <hr />

      <div className={`${styles.listCardContainer}`}>
        {cohortData?.map((cohort) => {
          const btnData = {
            imgSrc: '/images/svg/calendar-month.svg',
            display: 'Member',
            handleClick: () => {},
            color: null
          };

          if (cohort.isManager) {
            btnData.display = 'Cohort Manager';
            btnData.color = 'var(--primary)';
          }

          if (cohort.isResigned) {
            btnData.display = 'Resigned';
            btnData.color = 'red';
          }

          return (
            <CohortListCard cohortData={cohort} key={cohort.id}>
              <div className={`${styles.btnContainer}`}>
                <p>
                  <img src="/images/svg/calendar-month.svg" alt="" />
                  Joined On: {cohort?.joinedOn}
                </p>

                <IconBtn color={btnData.color}>
                  <img src={btnData.imgSrc} alt="" />
                  {btnData.display}
                </IconBtn>
              </div>
            </CohortListCard>
          );
        })}
      </div>
    </div>
  );
};

export default UserCohortTab;
