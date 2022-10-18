import { GET_COHORT_COURSES, queryClient } from '@/api/Queries';
import { GET_COHORT_DETAILS, GET_COHORT_USERS, GET_USER_LATEST_COHORTS, userQueryClient } from '@/api/UserQueries';
import CohortListCard from '@/components/common/CohortListCard';
import IconBtn from '@/components/common/IconBtn';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { getCurrentEpochTime } from '@/helper/common.helper';
import { ClosePopUpAtom, SelectedCohortDataAtom } from '@/state/atoms/users.atom';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from '../learnerUserProfile.module.scss';
import useUserCourseData from '@/helper/hooks.helper';
// import { cohortData } from '../Logic/userBody.helper';
import CohortPopUp from './CohortPopUp';
import useHandleCohortTab from '../Logic/useHandleCohortTab';
import { cohortTabData } from '../Logic/userBody.helper';

const UserCohortTab = () => {
  const [selectedCohort, setSelectedCohort] = useState(null);
  const [cohortData , setCohortData] = useState([]);
  const [loading , setLoading] = useState(true);
  const { getUserCourseData,getCohortUserData } = useUserCourseData();
  const { setCohortTab } = useHandleCohortTab();
  const [closePopUp , setClosePopUpAtom] = useRecoilState(ClosePopUpAtom)

  const [selectedCohortData , setSelectedCohortData] = useRecoilState(SelectedCohortDataAtom);

  useEffect(()=>{
    console.log(selectedCohortData);
  },[selectedCohortData])

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

  const resCohorts = await loadQueryDataAsync(GET_USER_LATEST_COHORTS,{...sendData},{},userQueryClient);
  // console.log(resCohorts?.getLatestCohorts?.cohorts);

  const cohorts = resCohorts?.getLatestCohorts?.cohorts;

  const cohortDetails = [];

  // const userCourses = await getUserCourseData(user_id);

  for(let i = 0 ; i < cohorts?.length ; i++){
   
    //getting cohort main details
   const cohortDetail = await loadQueryDataAsync(GET_COHORT_DETAILS,{cohort_id:cohorts[i]?.cohort_id},{},userQueryClient);
   if(cohortDetail?.error) return setToastMsg({type:'danger',message:'Error while loading cohort details!'});
  
   cohortDetails.push({main:cohortDetail?.getCohortDetails , userCohort:cohorts[i] });
  }
  if(!cohortDetails?.length) return setLoading(false);
  return setCohortData([...cohortDetails],setLoading(false));
},[])
  return (
    <div className={`${styles.userTabContainer}`}>
      <p className={`${styles.text}`}>Your Cohorts</p>

      <hr />
      
      {loading ? (
        <strong className={`${styles.fallbackMsg}`}>Loading...</strong>
      ) : (
        !cohortData?.length && <strong className={`${styles.fallbackMsg}`}>No Cohorts Found</strong>
      )}

      <div className={`${styles.listCardContainer}`}>
        {cohortData?.map((cohort , index) => {
          const { main , userCohort } = cohort;
          // console.log(userCohort);
          const btnData = {
            imgSrc: '/images/svg/calendar-month.svg',
            display: 'Member',
            color: null,
            isDisabled: false
          };

          if (userCohort?.role?.toLowerCase() === 'manager') {
            btnData.display = 'Cohort Manager';
            btnData.color = 'var(--primary)';
          }

          if (userCohort?.membership_status?.toLowerCase() !== 'active') {
            btnData.display = 'Resigned';
            btnData.color = 'red';
            btnData.isDisabled = true;
          }

          return (
            <CohortListCard
              data={main}
              key={index}
              handleClick={userCohort?.membership_status?.toLowerCase() !== 'active' ? ()=>{}: () => {
                setSelectedCohort(main);
                setClosePopUpAtom(false);
                setSelectedCohortData(cohort);
              }}>
              <div className={`${styles.btnContainer}`}>
                <p>
                  <img src="/images/svg/calendar-month.svg" alt="" />
                  Joined On: {moment.unix(userCohort?.created_at).format("DD/MM/YYYY")}
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
