import { SelectedCohortDataAtom } from '@/state/atoms/users.atom';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from './cohortListCard.module.scss';

export default function CohortListCard({ data,isRoundImage = false, children, handleClick=()=>{} , type='cohort' }) {

  const [selectedCohort , setSelectedCohort] = useRecoilState(SelectedCohortDataAtom);

  const [imageUrl , setImageUrl] = useState('');

  useEffect(()=>{
    if(!selectedCohort?.main) return ;

    // console.log(data,'data')
    
    if(type === 'cohort') return setImageUrl(data?.imageUrl);
    
    if(type === 'user'){
      const imageLink = data?.photo_url !=='' ? data?.photo_url : '/images/swagDP.jpg' ;
     return setImageUrl(imageLink);
    }
  },[data])


  return (
    <div className={`${styles.listCard}`} onClick={handleClick}>
      {/* course img */}
      <div className={isRoundImage ? `${styles.imgRoundContainer}`:`${styles.imgContainer}`}>
        <img src={imageUrl
 || '/images/profile-card.png'} alt="" />
      </div>

      <div className={`${styles.cardBody}`}>
        {/* <p className={`${styles.title}`}>{cohortData?.title || 'Start with Project Management'}</p> */}
        <p className={`${styles.title}`}>{data?.name}</p>

        {/* <p className={`${styles.desc}`}>{cohortData?.description}</p> */}
        <p className={`${styles.desc}`}>{data?.description || 'Zicops'}</p>
        {type === 'user' && <p className={`${styles.designation}`}>{data?.role_in_organization || 'Product Manager'}</p>}
      </div>

      <div className={`${styles.footer}`}>{children}</div>
    </div>
  );
}
