import { GET_USER_LATEST_COHORTS, userQueryClient } from '@/api/UserQueries';
import CohortListCard from '@/components/common/CohortListCard';
import IconBtn from '@/components/common/IconBtn';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { getCurrentEpochTime } from '@/helper/common.helper';
import { useEffect, useState } from 'react';
import styles from '../learnerUserProfile.module.scss';
import { cohortData } from '../Logic/userBody.helper';
import CohortPopUp from './CohortPopUp';

const UserCohortTab = () => {
  const [selectedCohort, setSelectedCohort] = useState(null);

  useEffect(async()=>{
    const {user_id , user_lsp_id} = JSON.parse(sessionStorage?.getItem('lspData'));

    if(!user_lsp_id) return setToastMsg({type:'danger',mesaage:'Cannot find user_lsp_id while loading cohorts!'});
    const sendData = {
      user_id:user_id,
      user_lsp_id:user_lsp_id,
      publish_time:getCurrentEpochTime(),
      pageCursor:"",
      pageSize:100
    }

  const resCohorts = await loadQueryDataAsync(GET_USER_LATEST_COHORTS,{sendData},{},userQueryClient);
  // if(resCohorts?.er)
  },[])
  return (
    <div className={`${styles.userTabContainer}`}>
      <p className={`${styles.text}`}>Your Cohort</p>

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
              data={cohort}
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
