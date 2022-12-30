import { GET_COHORT_DETAILS, GET_USER_LATEST_COHORTS, userQueryClient } from '@/api/UserQueries';
import CohortBoxCard from '@/components/common/CohortBoxCard';
import ConfirmPopUp from '@/components/common/ConfirmPopUp';
import CohortPopUp from '@/components/LearnerUserProfile/UserCohortTab/CohortPopUp';
import addUserData from '@/components/UserComps/UserCohorts/ChortMasterTab/Logic/addUserData';
import { loadQueryDataAsync, sendNotification } from '@/helper/api.helper';
import { getCurrentEpochTime, getNotificationMsg } from '@/helper/common.helper';
import { NOTIFICATION_TITLES } from '@/helper/constants.helper';
import { parseJson } from '@/helper/utils.helper';
import { FcmTokenAtom } from '@/state/atoms/notification.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { SelectedCohortDataAtom } from '@/state/atoms/users.atom';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Accordian from '../../../components/UserProfile/Accordian';
import styles from '../userProfile.module.scss';

const CohortAccordian = ({ currentUserData = null }) => {
  const [selectedCohortData, setSelectedCohortData] = useRecoilState(SelectedCohortDataAtom);

  const [selectedCohort, setSelectedCohort] = useState(null);
  const fcmToken = useRecoilValue(FcmTokenAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [cohortData, setCohortData] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const currentUserId = router?.query?.userId;
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const {removeCohortUser} = addUserData();

  // useEffect(()=>{
  //   console.log(cohortData,'cohortdata')
  // },[cohortData])

  async function handleRemoveUser(selectedCohortData = null){
    if(!selectedCohortData)return setToastMsg({type:'danger',message:'Cohort Data not found!'})
    setLoading(true) ;
    const isRemoved = await removeCohortUser(selectedCohortData?.userCohort,selectedCohortData?.main,selectedCohortData?.main?.size);
    // console.log(a,'adds');
    if(!isRemoved) return setToastMsg({type:'danger',message:'Error while removing user from cohort!'})
    setToastMsg({type:'success',message:"User removed succesfully!"});
    const notificationBody = getNotificationMsg('cohortUnassign',{cohortName:selectedCohortData?.main?.name})
    if(!notificationBody) setToastMsg({type:'danger',message:'Error while sending notification'});
    await sendNotification(
      {
        title: NOTIFICATION_TITLES?.cohortUnassign,
        body: notificationBody,
        user_id: [currentUserData?.id]
      },
      { context: { headers: { 'fcm-token': fcmToken || sessionStorage.getItem('fcm-token') } } }
    );
    setLoading(false);

    const updatedCohort = cohortData?.filter((cohort) => cohort?.main?.cohort_id !== selectedCohortData?.main?.cohort_id);
    setCohortData([...updatedCohort]);
    await loadCohortData();
    setShowConfirmBox(false);
    return ;
  }

  useEffect(async () => {
    if(!currentUserData?.userLspId) return ;
    return loadCohortData();
   
  }, [currentUserData?.userLspId]);

  async function loadCohortData(){
    setLoading(true);

    const sendData = {
      user_id: currentUserData?.id,
      user_lsp_id: currentUserData?.userLspId,
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
      (v, i, a) => a.findIndex((v2) => v2?.cohort_id === v?.cohort_id && v?.membership_status.toLowerCase() === 'active') === i
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
  }

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
                    setSelectedCohortData(cohort);
                    setShowConfirmBox(true);
                  }}>
                  Remove
                </button>
              </CohortBoxCard>
            );
          })}
        </div>
      </Accordian>
      {showConfirmBox && (
        <ConfirmPopUp
          title={'Are you sure you want to remove this user from cohort?'}
          btnObj={{
            leftIsDisable:loading,
            rightIsDisable:loading,
            handleClickLeft: () => handleRemoveUser(selectedCohortData),
            handleClickRight: () => setShowConfirmBox(false)
          }}
        />
      )}

      <CohortPopUp cohortData={selectedCohort} closePopUp={() => setSelectedCohort(null)} />
    </>
  );
};

export default CohortAccordian;
