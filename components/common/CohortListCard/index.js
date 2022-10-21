import { useHandleCohortUsers } from '@/helper/hooks.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { IsUpdatedAtom, SelectedCohortDataAtom } from '@/state/atoms/users.atom';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import ConfirmPopUp from '../ConfirmPopUp';
import styles from './cohortListCard.module.scss';

export default function CohortListCard({
  data,
  isRoundImage = false,
  children,
  handleClick = () => {},
  type = 'cohort',
  isManager = false
}) {
  const [selectedCohort, setSelectedCohort] = useRecoilState(SelectedCohortDataAtom);
  const [toastMsg , setToastMsg] = useRecoilState(ToastMsgAtom);
  const {removeCohortUser} = useHandleCohortUsers();
  const [loading , setLoading] = useState(false);
  const [isUpdated , setIsUpdated] = useRecoilState(IsUpdatedAtom);
  const [showConfirmBox , setShowConfirmBox] = useState(false) ;

  // console.log(data,'cohort data',selectedCohort?.main);

  let imageUrl = '/images/profile-card.png';

  if (type === 'cohort') imageUrl = data?.imageUrl;

  if (type === 'user') {
    const imageLink = data?.photo_url !== '' ? data?.photo_url : '/images/swagDP.jpg';
    imageUrl = imageLink;
  }
  // useEffect(() => {
  //   if (!selectedCohort?.main) return;
  // }, [data]);

  async function handleRemoveUser(userData = null, cohortData = null){
    // console.log(userData)
    if(!userData)return setToastMsg({type:'danger',message:'User Data not found!'})
    if(!cohortData)return setToastMsg({type:'danger',message:'Cohort Data not found!'})
    setLoading(true) ;
    let cohortSize = selectedCohort?.cohortUsers?.length ;
    const isRemoved = await removeCohortUser(userData,cohortData,cohortSize);
    // console.log(a,'adds');
    if(!isRemoved) return setToastMsg({type:'danger',message:'Error while removing user from cohort!'})
    setIsUpdated(true);
    setToastMsg({type:'success',message:"User removed succesfully!"})
    setLoading(false)
    setSelectedCohort((prev) => ({...prev , isUpdated: true}));
    // setRefetch(true);
    setShowConfirmBox(false);
    return ;
  }

  return (
   <> <div className={`${styles.listCard}`} onClick={handleClick}>
      {/* course img */}
      <div className={isRoundImage ? `${styles.imgRoundContainer}` : `${styles.imgContainer}`}>
        <img src={imageUrl || '/images/profile-card.png'} alt="" />
      </div>

      <div className={`${styles.cardBody}`}>
        {/* <p className={`${styles.title}`}>{cohortData?.title || 'Start with Project Management'}</p> */}
        <p className={`${styles.title}`}>{data?.name || data?.email}</p>

        {/* <p className={`${styles.desc}`}>{cohortData?.description}</p> */}
        <p className={`${styles.desc}`}>{data?.description || 'Zicops'}</p>
        {type === 'user' && (
          <p className={`${styles.designation}`}>
            {data?.role_in_organization || 'Product Manager'}
          </p>
        )}
      </div>

      <div className={`${styles.footer}`}>{children}</div>
      {isManager&&(<div className={`${styles.clossBtn}`} onClick={()=>{setShowConfirmBox(true);}}>
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
      </div>)}
      
    </div>
    {showConfirmBox && (
        <ConfirmPopUp
          title={'Are you sure you want to remove this user from cohort?'}
          btnObj={{
            leftIsDisable: loading,
            rightIsDisable:loading,
            handleClickLeft: () => handleRemoveUser(data,selectedCohort?.main),
            handleClickRight: () => setShowConfirmBox(false)
          }}
        />
      )}
    </>
  );
}
