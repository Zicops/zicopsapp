import { GET_USER_ORGANIZATION_DETAIL, userQueryClient } from '@/api/UserQueries';
import { loadQueryDataAsync } from '@/helper/api.helper';
import useUserCourseData from '@/helper/hooks.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { SelectedCohortDataAtom, UsersOrganizationAtom } from '@/state/atoms/users.atom';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styles from '../../learnerUserProfile.module.scss';
import useHandleCohortTab from '../../Logic/useHandleCohortTab';
import CohortManagerList from '../CohortManagerList';
const DetailsTabBottom = () => {
  const [selectedCohortData, setSelectedCohortData] = useRecoilState(SelectedCohortDataAtom);
  const [cohortMembers, setCohortMembers] = useState({ members: [], managers: [] });
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [loading, setLoading] = useState(true);
  const { getCohortUserData } = useUserCourseData();
  const { getUsersOrgDetails } = useHandleCohortTab();

  useEffect(async () => {
    if (!selectedCohortData?.main?.cohort_id) return;
    if (selectedCohortData?.cohortUsers?.length) {
      const managers = selectedCohortData?.cohortUsers?.filter(
        (item) => item?.role?.toLowerCase() === 'manager'
      );
      const members = selectedCohortData?.cohortUsers?.filter(
        (item) => item?.role?.toLowerCase() !== 'manager'
      );
      return setCohortMembers({ members: members, managers: managers }, setLoading(false));
    } else {
      const cohortUsers = await getCohortUserData(selectedCohortData?.main?.cohort_id);

      if (cohortUsers?.error)
        return setToastMsg({ type: 'danger', message: 'Error while loading cohort users!' });

      if (!cohortUsers?.length) return setLoading(false);

      //removing duplicate data
      const users = [...new Map(cohortUsers.map((m) => [m?.user_id, m])).values()];

      if (!users?.length) return setLoading(false);

      const modifiedUserList = await getUsersOrgDetails(users);

      // console.log(modifiedUserList, 'modiefied user list');

      setSelectedCohortData((prevValue) => ({ ...prevValue, cohortUsers: modifiedUserList?.filter((item)=> item?.membership_status?.toLowerCase() === 'active') }));

      const managers = modifiedUserList?.filter((item) => item?.role?.toLowerCase() === 'manager' && item?.membership_status?.toLowerCase() === 'active');
      const members = modifiedUserList?.filter((item) => item?.role?.toLowerCase() !== 'manager' && item?.membership_status?.toLowerCase() === 'active');


      return setCohortMembers({ members: members, managers: managers }, setLoading(false));
    }
  }, [selectedCohortData]);
  return (
    <>
      <div className={`${styles.bottomLeft} ${styles.lastContainer}`}>
        <p className={`${styles.text}`}>Cohort Managers</p>
        <div className={`${styles.list} ${styles.listContainer}`}>
          <div className={`${styles.memberList}`}>
            {loading ? (
              <strong className={`${styles.fallbackMsg}`}>Loading Users...</strong>
            ) : (
              !cohortMembers?.managers?.length && (
                <strong className={`${styles.fallbackMsg}`}>No Users Found</strong>
              )
            )}
            {cohortMembers?.managers?.map((user, index) => {
              return (
                <div key={index}>
                  <CohortManagerList userData={user} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className={`${styles.bottomRight} ${styles.lastContainer}`}>
        <p className={`${styles.text}`}>Active Members</p>
        <div className={`${styles.listContainer} ${styles.list}`}>
          <div className={`${styles.memberList}`}>
            {loading ? (
              <strong className={`${styles.fallbackMsg}`}>Loading Users...</strong>
            ) : (
              !cohortMembers?.members?.length && (
                <strong className={`${styles.fallbackMsg}`}>No Users Found</strong>
              )
            )}
             
            {cohortMembers?.members?.map((user, index) => {
              return (
                <div key={index}>
                  <CohortManagerList userData={user} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsTabBottom;
