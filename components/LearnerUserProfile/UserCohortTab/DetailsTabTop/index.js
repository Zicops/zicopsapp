import { SelectedCohortDataAtom } from '@/state/atoms/users.atom';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from '../../learnerUserProfile.module.scss';

const DetailsTabTop = () => {
  const [selectedCohort , setSelectedCohort] = useRecoilState(SelectedCohortDataAtom);
  const [cohortData , setCohortData] = useState(null);

  useEffect(()=>{
  if(!selectedCohort?.main) return;
  let role = selectedCohort?.userCohort?.role.toLowerCase() === 'manager' ? 'Cohort Manager' : 'Cohort Member';
  
  // console.log(selectedCohort?.userCohort?.role , role);
  setCohortData({...selectedCohort,role:role});
  },[selectedCohort])
  
  return (
    <div className={`${styles.detailsTopsection}`}>
      <div className={`${styles.topLeft}`}>
        <img src={selectedCohort?.main?.imageUrl?selectedCohort?.main?.imageUrl: "./images/details.png"} />
      </div>
      <div className={`${styles.topRight}`}>
        <p className={`${styles.bigText}`}>{cohortData?.main?.name|| 'Development'}</p>
        <p className={`${styles.cohortManager}`} style={{ border: 'none' }}>
          <img src="/images/svg/calendar-month.svg" alt="" />
          Joined on:<span>{moment.unix(cohortData?.userCohort?.created_at).format("DD/MM/YYYY")||'27-09-22'}</span>
        </p>

        <p className={`${styles.cohortCodeContainer}`}>
          Code: {cohortData?.main?.code||'DevCohort-ID-1'}
           <span>Type:  {cohortData?.main?.type||'Open'}</span>
        </p>
        <div className={`${styles.cohortManager}`}>
          <img src="/images/svg/manage_accounts.svg" />
          <p>{cohortData?.role||'Cohort Manager'}</p>
        </div>

        <p style={{ fontSize: '13px', marginRight: '15px', color: '#ACACAC' }}>
          {cohortData?.main?.description ||"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500."}
        </p>
        <div className={`${styles.rank}`}>
          <div className={`${styles.rankInside}`}>
            <p>Your best rank achieved</p>
            <p className={`${styles.rankNumber}`}>03</p>
          </div>
          <div className={`${styles.rankInside}`}>
            <p> Number of Days at top Rank</p>
            <p className={`${styles.rankNumber}`}>14</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsTabTop;
