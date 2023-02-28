// components\LearnerUserProfile\UserCohortTab\CohortPopUp\MembersTab.js

import SearchBar from '@/components/common/FormComponents/SearchBar';
import IconBtn from '@/components/common/IconBtn';
import { useEffect, useState } from 'react';

import CohortListCard from '@/components/common/CohortListCard';
import Loader from '@/components/common/Loader';
import useUserCourseData from '@/helper/hooks.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { SelectedCohortDataAtom } from '@/state/atoms/users.atom';
import { useRecoilState } from 'recoil';
import styles from '../../learnerUserProfile.module.scss';
import useHandleCohortTab from '../../Logic/useHandleCohortTab';

export default function MembersTab() {
  const [selectedCohort, setSelectedCohort] = useRecoilState(SelectedCohortDataAtom);
  const setToastMsg = useRecoilState(ToastMsgAtom);
  const [cohortUsers, setCohortUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const { getCohortUserData } = useUserCourseData();
  const { getUsersOrgDetails } = useHandleCohortTab();
  // const isManager = true;

  useEffect(async () => {
    // console.log(selectedCohort,'cohrot_data')
    if (!selectedCohort?.main?.cohort_id) return;
    if (selectedCohort?.isUpdated) {
      // console.log('isUpdated called')
      setLoading(true);
      await loadUserData();
      setLoading(false);

      setSelectedCohort((prevValue) => ({ ...prevValue, isUpdated: false }));
      return;
    }
    if (selectedCohort?.cohortUsers?.length)
      return setCohortUsers([...selectedCohort?.cohortUsers], setLoading(false));
    setLoading(true);
    await loadUserData();
    setLoading(false);
    return;
  }, [selectedCohort]);

  async function loadUserData() {
    // setLoading(true);
    // console.log('updated loadUsers is called')
    // setCohortUsers([]);
    const cohortUsers = await getCohortUserData(selectedCohort?.main?.cohort_id);

    if (cohortUsers?.error)
      return setToastMsg({ type: 'danger', message: 'Error while loading cohort users!' });

    if (!cohortUsers?.length) return;

    //removing duplicate data
    const users = [...new Map(cohortUsers.map((m) => [m?.user_id, m])).values()];

    const modifiedUsers = await getUsersOrgDetails(users);

    setSelectedCohort((prevValue) => ({
      ...prevValue,
      cohortUsers: modifiedUsers?.filter(
        (user) => user?.membership_status?.toLowerCase() === 'active'
      )
    }));
    // console.log(modifiedUsers);

    return setCohortUsers([
      ...modifiedUsers?.filter((user) => user?.membership_status?.toLowerCase() === 'active')
    ]);
  }

  return (
    <div className={`${styles.courseTabContainer} ${styles.memberTab}`}>
      <div style={{ padding: '0px 5px 15px' }}>
        <SearchBar
          inputDataObj={{
            inputOptions: {
              inputName: 'filter',
              placeholder: 'Search Member',
              value: searchQuery
            },
            changeHandler: (e) => setSearchQuery(e.target.value)
          }}
        />
      </div>

      {/* {loading ? (
        // <strong className={`${styles.fallbackMsg}`}>Loading Users...</strong>
        <Loader customStyles={{ backgroundColor: 'transparent', height: '100%' }} />
      ) : (
        !cohortUsers?.length && <strong className={`${styles.fallbackMsg}`}>No Users Found</strong>
      )} */}

      <div className={`${styles.listCardTabContainer}`}>
        {loading ? (
          <Loader customStyles={{ backgroundColor: 'transparent', height: '100%' }} />
        ) : !cohortUsers?.length ? (
          <strong className={`${styles.fallbackMsg}`}>No Users Found</strong>
        ) : (
          <>
            {cohortUsers?.map((member, index) => {
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

              if (
                !member?.name?.toLowerCase()?.trim()?.includes(searchQuery?.toLowerCase()?.trim())
              )
                return null;

              return (
                <CohortListCard
                  data={member}
                  isRoundImage={true}
                  key={index}
                  isManager={selectedCohort?.userCohort?.role?.toLowerCase() === 'manager'}
                  // handleClick={() => {
                  //   setSelectedCohort(cohort);
                  // }}
                  type={'user'}>
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
          </>
        )}
        {/* {cohortUsers?.map((member, index) => {
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

          if (!member?.name?.toLowerCase()?.trim()?.includes(searchQuery?.toLowerCase()?.trim()))
            return null;

          return (
            <CohortListCard
              data={member}
              isRoundImage={true}
              key={index}
              isManager={selectedCohort?.userCohort?.role?.toLowerCase() === 'manager'}
              // handleClick={() => {
              //   setSelectedCohort(cohort);
              // }}
              type={'user'}>
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
        })} */}
      </div>

      {/* <CohortPopUp cohortData={selectedCohort} closePopUp={() => setSelectedCohort(null)} /> */}
    </div>
  );
}
