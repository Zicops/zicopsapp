// components\LearnerUserProfile\UserCohortTab\CohortPopUp\MembersTab.js

import IconBtn from '@/components/common/IconBtn';
import { useEffect, useState } from 'react';
import SearchBar from '@/components/common/FormComponents/SearchBar';

import CohortListCard from '@/components/common/CohortListCard';
import styles from '../../learnerUserProfile.module.scss';
import { memberTabData } from '../../Logic/userBody.helper';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { GET_USER_DETAIL, userQueryClient } from '@/api/UserQueries';
import { useRecoilState } from 'recoil';
import { SelectedCohortDataAtom } from '@/state/atoms/users.atom';
import useUserCourseData from '@/helper/hooks.helper';
import useHandleCohortTab from '../../Logic/useHandleCohortTab';

export default function MembersTab() {
  const [selectedCohort , setSelectedCohort] = useRecoilState(SelectedCohortDataAtom);
  const [cohortUsers , setCohortUsers] = useState([]);
  const [loading , setLoading] = useState(true);
  const { getCohortUserData } = useUserCourseData();
  const { getUsersOrgDetails } = useHandleCohortTab();

  useEffect(async()=>{
  // console.log(selectedCohort,'cohrot_data')
  if(!selectedCohort?.main?.cohort_id) return ;
  if(selectedCohort?.cohortUsers?.length) return setCohortUsers([...selectedCohort?.cohortUsers],setLoading(false));;
  const cohortUsers = await getCohortUserData(selectedCohort?.main?.cohort_id);
  
  if(cohortUsers?.error) return setToastMsg({type:'danger',message:'Error while loading cohort users!'});

  if(!cohortUsers?.length) return setLoading(false);

 //removing duplicate data
  const users = [...new Map(cohortUsers.map((m) => [m?.user_id, m])).values()];

  const modifiedUsers = await getUsersOrgDetails(users)

  setSelectedCohort((prevValue) => ({...prevValue , cohortUsers:modifiedUsers}))

  return setCohortUsers([...modifiedUsers],setLoading(false));
  },[selectedCohort])
  return (
    <div className={`${styles.courseTabContainer}`}>
      <div style={{ padding: '0px 5px 15px' }}>
        <SearchBar
          inputDataObj={{
            inputOptions: {
              inputName: 'filter',
              placeholder: 'Search Member'
            }
          }}
        />
      </div>

      {loading ? (
        <strong className={`${styles.fallbackMsg}`}>Loading Users...</strong>
      ) : (
        !cohortUsers?.length && <strong className={`${styles.fallbackMsg}`}>No Users Found</strong>
      )}

      <div className={`${styles.listCardTabContainer}`}>
        {cohortUsers?.map((member,index) => {
          const btnData = {
            imgSrc: null,
            display: 'Member',
            color: null,
            isDisabled: false
          };

          if (member?.role?.toLowerCase() === 'manager') {
            btnData.imgSrc = '/images/svg/manage_accounts.svg';
            btnData.display = 'Cohort Manager';
            btnData.color = 'var(--primary)';
          }
          if (member?.membership_status?.toLowerCase() !== 'active') {
            btnData.imgSrc = '/images/svg/manage_accounts_white.svg';

            btnData.display = 'Cohort Member';
            btnData.color = 'var(--white)';
          }

          return (
            <CohortListCard
              data={member}
              isRoundImage={true}
              key={index}
              // handleClick={() => {
              //   setSelectedCohort(cohort);
              // }}
              type={'user'}
            >
              <div className={`${styles.btnContainer}`}>
                <p>
                  <img src="/images/svg/calendar-month.svg" alt="" />
                  Joined On: {member?.joined_on}
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

      {/* <CohortPopUp cohortData={selectedCohort} closePopUp={() => setSelectedCohort(null)} /> */}
    </div>
  );
}
