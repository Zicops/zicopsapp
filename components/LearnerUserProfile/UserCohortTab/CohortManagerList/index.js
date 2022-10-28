import { SelectedCohortDataAtom } from '@/state/atoms/users.atom';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styles from './cohortManagerList.module.scss';
const CohortManagerList = ({userData={}}) => {

  // const [memberInfo , setMemberInfo] = useState({});
  const selectedCohort = useRecoilValue(SelectedCohortDataAtom);
  // useEffect(()=>{
  //   if(!selectedCohort?.cohortUsers) return ;
  //   const role = userData?.role?.toLowerCase() === 'manager' ? 'Cohort Manager' : 'Cohort Member';
  //   return setMemberInfo({...userData,role:role});
  // },[selectedCohort])
  
  let role = '' ;
  if(selectedCohort?.cohortUsers){
    role = userData?.role?.toLowerCase() === 'manager' ? 'Cohort Manager' : 'Cohort Member';
  }
  return (
    <div className={`${styles.cohortManagerList}`}>
      <div className={`${styles.cohortManagerImg}`}>
        <img src={userData?.photo_url? userData?.photo_url:'/images/swagDP.jpg'} />
      </div>
      <div className={`${styles.cohortManagerData}`}>
        <p>{!userData?.name?.length ? userData?.email : userData?.name}</p>
        <p className={`${styles.designation}`}>{role || 'Cohort Member'}</p>
      </div>
    </div>
  );
};

export default CohortManagerList;
