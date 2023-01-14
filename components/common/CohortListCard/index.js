import { truncateToN } from '@/helper/common.helper';
import { useHandleCohortUsers } from '@/helper/hooks.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { IsUpdatedAtom, SelectedCohortDataAtom } from '@/state/atoms/users.atom';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import ConfirmPopUp from '../ConfirmPopUp';
import styles from './cohortListCard.module.scss';

export default function CohortListCard({
  data,
  isActive = true,
  isRoundImage = false,
  children,
  handleClick = () => {},
  type = 'cohort',
  isManager = false,
  isSchedule = false,
  scheduleData = {}
}) {
  const [selectedCohort, setSelectedCohort] = useRecoilState(SelectedCohortDataAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const { removeCohortUser } = useHandleCohortUsers();
  const [loading, setLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useRecoilState(IsUpdatedAtom);
  const [showConfirmBox, setShowConfirmBox] = useState(false);

  // console.log(data,'cohort data',selectedCohort?.main);

  let imageUrl = '/images/profile-card.png';

  if (type === 'cohort') imageUrl = isSchedule ? scheduleData?.image : data?.imageUrl;

  if (type === 'user') {
    const imageLink = data?.photo_url !== '' ? data?.photo_url : '/images/swagDP.jpg';
    imageUrl = imageLink;
  }
  // useEffect(() => {
  //   if (!selectedCohort?.main) return;
  // }, [data]);

  async function handleRemoveUser(userData = null, cohortData = null) {
    // console.log(userData)
    if (!userData) return setToastMsg({ type: 'danger', message: 'User Data not found!' });
    if (!cohortData) return setToastMsg({ type: 'danger', message: 'Cohort Data not found!' });
    setLoading(true);
    let cohortSize = selectedCohort?.cohortUsers?.length;
    const isRemoved = await removeCohortUser(userData, cohortData, cohortSize);
    // console.log(a,'adds');
    if (!isRemoved)
      return setToastMsg({ type: 'danger', message: 'Error while removing user from cohort!' });
    setIsUpdated(true);
    setToastMsg({ type: 'success', message: 'User removed succesfully!' });
    setLoading(false);
    // let users = [];
    const users = !selectedCohort?.inviteUser?.length
      ? [
          {
            id: userData?.user_id,
            first_name: userData?.first_name,
            last_name: userData?.last_name,
            email: userData?.email
          }
        ]
      : [
          ...selectedCohort?.inviteUser,
          {
            id: userData?.user_id,
            first_name: userData?.first_name,
            last_name: userData?.last_name,
            email: userData?.email
          }
        ];

    setSelectedCohort((prev) => ({ ...prev, isUpdated: true, inviteUser: [...users] }));
    // setRefetch(true);
    setShowConfirmBox(false);
    return;
  }

  const scheduleCardType = {
    course: {
      time: moment.unix(scheduleData?.scheduleDate).format('D MMM YYYY'),
      color: styles?.courseColor,
      barStyle: styles?.scheduleBarCourse
    },
    exam: {
      time: `${moment.unix(scheduleData?.Start).format('D MMM hh:mm a')}-${moment
        .unix(scheduleData?.endTime)
        .format('D MMM hh:mm a')}`,
      color: styles?.examColor,
      barStyle: styles?.scheduleBarExam
    }
  };

  let waqtFormat = scheduleCardType?.[scheduleData?.dataType]?.time;
  let pillColor = scheduleCardType?.[scheduleData?.dataType]?.color;
  let barStyle = scheduleCardType?.[scheduleData?.dataType]?.barStyle;
  return (
    <>
      <div
        className={`${styles.listCard}`}
        onClick={handleClick}
        style={isActive ? {} : { cursor: 'no-drop' }}>
        {/* course img */}
        <div
          className={`${isRoundImage ? styles.imgRoundContainer : styles.imgContainer} ${
            isSchedule ? barStyle : ''
          }`}>
          <img src={imageUrl || '/images/profile-card.png'} alt="" />
        </div>
        <div className={`${styles.cardBody} `}>
          <div className={`${isSchedule ? styles.scheduleCardBody : ''}`}>
            {isSchedule ? <p>{waqtFormat || '22 Aug, 2022'}</p> : ''}
            <p className={`${styles.title}`}>
              {data?.name || data?.email || scheduleData?.name || 'Course Title or Cohort Title'}
            </p>
            {!isSchedule && <p className={`${styles.desc}`}>{data?.description || ''}</p>}
            {isSchedule && (
              <p className={`${styles.desc}`}>
                {truncateToN(scheduleData?.description, 150) ||
                  truncateToN(
                  '',
                    200
                  )}
              </p>
            )}
            {!isSchedule && type === 'user' && (
              <p className={`${styles.designation}`}>
                {data?.role_in_organization || 'Product Manager'}
              </p>
            )}
          </div>
          {isSchedule ? (
            <div className={styles.scheduleCardBodyRight}>
              <div className={`${styles.schedulePills} ${styles.pill1} ${pillColor}`}>
                {scheduleData?.dataType}
              </div>
              <img className="" src="/images/svg/event_available.svg" alt="" />
            </div>
          ) : (
            ''
          )}
        </div>

        <div className={`${styles.footer}`}>{children}</div>
        {isManager && (
          <div
            className={`${styles.clossBtn}`}
            onClick={() => {
              setShowConfirmBox(true);
            }}>
            <svg
              width="25"
              height="25"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <mask id="mask0_430_4992" x="0" y="0" width="36" height="36">
                <rect width="36" height="36" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_430_4992)">
                <path
                  d="M9.59995 28.7992L7.19995 26.3992L15.6 17.9992L7.19995 9.59922L9.59995 7.19922L18 15.5992L26.4 7.19922L28.8 9.59922L20.4 17.9992L28.8 26.3992L26.4 28.7992L18 20.3992L9.59995 28.7992Z"
                  fill="#6BCFCF"
                />
              </g>
            </svg>
          </div>
        )}
      </div>
      {showConfirmBox && (
        <ConfirmPopUp
          title={'Are you sure you want to remove this user from cohort?'}
          btnObj={{
            leftIsDisable: loading,
            rightIsDisable: loading,
            handleClickLeft: () => handleRemoveUser(data, selectedCohort?.main),
            handleClickRight: () => setShowConfirmBox(false)
          }}
        />
      )}
    </>
  );
}
