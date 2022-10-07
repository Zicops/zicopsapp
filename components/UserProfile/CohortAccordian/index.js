import { GET_COHORT_DETAILS, GET_USER_LATEST_COHORTS, userQueryClient } from '@/api/UserQueries';
import CohortBoxCard from '@/components/common/CohortBoxCard';
import CohortPopUp from '@/components/LearnerUserProfile/UserCohortTab/CohortPopUp';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { getCurrentEpochTime } from '@/helper/common.helper';
import { parseJson } from '@/helper/utils.helper';
import { SelectedCohortDataAtom } from '@/state/atoms/users.atom';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import Accordian from '../../../components/UserProfile/Accordian';
import styles from '../userProfile.module.scss';

const CohortAccordian = () => {
  const [selectedCohortData, setSelectedCohortData] = useRecoilState(SelectedCohortDataAtom);

  const [selectedCohort, setSelectedCohort] = useState(null);
  const [cohortData, setCohortData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const { user_id, user_lsp_id } = parseJson(sessionStorage?.getItem('lspData'));

    if (!user_lsp_id)
      return setToastMsg({
        type: 'danger',
        mesaage: 'Cannot find user_lsp_id while loading cohorts!'
      });

    const sendData = {
      user_id: user_id,
      user_lsp_id: user_lsp_id,
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
    const cohortDetails = [];

    for (let i = 0; i < cohorts?.length; i++) {
      //getting cohort main details
      const cohortDetail = await loadQueryDataAsync(
        GET_COHORT_DETAILS,
        { cohort_id: cohorts[i]?.cohort_id },
        {},
        userQueryClient
      );
      if (cohortDetail?.error)
        return setToastMsg({ type: 'danger', message: 'Error while loading cohort details!' });

      cohortDetails.push({ main: cohortDetail?.getCohortDetails, userCohort: cohorts[i] });
    }
    if (!cohortDetails?.length) return setLoading(false);
    return setCohortData([...cohortDetails], setLoading(false));
  }, []);

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
            console.log(cohort);
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
