import { GET_COHORT_DETAILS, GET_USER_LATEST_COHORTS, userQueryClient } from '@/api/UserQueries';
import CohortBoxCard from '@/components/common/CohortBoxCard';
import CohortPopUp from '@/components/LearnerUserProfile/UserCohortTab/CohortPopUp';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { getCurrentEpochTime } from '@/helper/common.helper';
import { parseJson } from '@/helper/utils.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { SelectedCohortDataAtom } from '@/state/atoms/users.atom';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import Accordian from '../../../components/UserProfile/Accordian';
import styles from '../userProfile.module.scss';

const CohortAccordian = ({ currentUserData = null }) => {
  const [selectedCohortData, setSelectedCohortData] = useRecoilState(SelectedCohortDataAtom);

  const [selectedCohort, setSelectedCohort] = useState(null);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [cohortData, setCohortData] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const currentUserId = router?.query?.userId;

  useEffect(async () => {
    if(!currentUserData?.user_lsp_id) return ;
    // if (!currentUserData?.user_lsp_id)
    //   return setToastMsg({ type: 'danger', mesaage: 'Error while loading user data!' });

    // console.log(currentUserData, 'currentUsr');
    setLoading(true);

    const sendData = {
      user_id: currentUserData?.id,
      user_lsp_id: currentUserData?.user_lsp_id,
      publish_time: getCurrentEpochTime(),
      pageCursor: '',
      pageSize: 100
    };

    const resCohorts = await loadQueryDataAsync(
      GET_USER_LATEST_COHORTS,
      { ...sendData },
      {},
      userQueryClient
    );
    const cohorts = resCohorts?.getLatestCohorts?.cohorts;

    //removing duplicates cohort list
    const userCohorts = cohorts.filter(
      (v, i, a) => a.findIndex((v2) => v2?.cohort_id === v?.cohort_id) === i
    );
    const cohortDetails = [];

    for (let i = 0; i < userCohorts?.length; i++) {
      //getting cohort main details
      const cohortDetail = await loadQueryDataAsync(
        GET_COHORT_DETAILS,
        { cohort_id: userCohorts[i]?.cohort_id },
        {},
        userQueryClient
      );
      if (cohortDetail?.error)
        return setToastMsg({ type: 'danger', message: 'Error while loading cohort details!' });

      cohortDetails.push({ main: cohortDetail?.getCohortDetails, userCohort: userCohorts[i] });
    }
    if (!cohortDetails?.length) return setLoading(false);
    return setCohortData([...cohortDetails], setLoading(false));
  }, [currentUserData?.user_lsp_id]);

  return (
    <>
      <Accordian height={'auto'} acc_title={'Cohort'}>
        <div className={styles.cohortCardContainer}>
          {loading ? (
            <strong className={`${styles.fallbackMsg}`}>Loading...</strong>
          ) : (
            !cohortData?.length && (
              <strong className={`${styles.fallbackMsg}`}>No Cohorts Found</strong>
            )
          )}
          {cohortData?.map((cohort, index) => {
            // console.log(cohort);
            return (
              <CohortBoxCard
                key={cohort?.main?.cohort_id}
                handleClick={() => {
                  setSelectedCohort(cohort?.main);
                  setSelectedCohortData(cohort);
                }}
                img={cohort?.main?.imageUrl}
                name={cohort?.main?.name}
                totalMembers={cohort?.main?.size}
                type={cohort?.main?.type}
                description={cohort?.main?.description}
                joinedOn={moment(cohort?.userCohort?.created_at * 1000).format('DD/MM/YYYY')}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}>
                  Remove
                </button>
              </CohortBoxCard>
            );
          })}
        </div>
      </Accordian>

      <CohortPopUp cohortData={selectedCohort} closePopUp={() => setSelectedCohort(null)} />
    </>
  );
};

export default CohortAccordian;
