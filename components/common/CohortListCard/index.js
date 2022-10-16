import { SelectedCohortDataAtom } from '@/state/atoms/users.atom';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from './cohortListCard.module.scss';

export default function CohortListCard({
  data,
  isRoundImage = false,
  children,
  handleClick = () => {},
  type = 'cohort'
}) {
  const [selectedCohort, setSelectedCohort] = useRecoilState(SelectedCohortDataAtom);

  let imageUrl = '/images/profile-card.png';

  if (type === 'cohort') imageUrl = data?.imageUrl;

  if (type === 'user') {
    const imageLink = data?.photo_url !== '' ? data?.photo_url : '/images/swagDP.jpg';
    imageUrl = imageLink;
  }
  // useEffect(() => {
  //   if (!selectedCohort?.main) return;
  // }, [data]);

  return (
    <div className={`${styles.listCard}`} onClick={handleClick}>
      {/* course img */}
      <div className={isRoundImage ? `${styles.imgRoundContainer}` : `${styles.imgContainer}`}>
        <img src={imageUrl || '/images/profile-card.png'} alt="" />
      </div>

      <div className={`${styles.cardBody}`}>
        {/* <p className={`${styles.title}`}>{cohortData?.title || 'Start with Project Management'}</p> */}
        <p className={`${styles.title}`}>{data?.name}</p>

        {/* <p className={`${styles.desc}`}>{cohortData?.description}</p> */}
        <p className={`${styles.desc}`}>{data?.description || 'Zicops'}</p>
        {type === 'user' && (
          <p className={`${styles.designation}`}>
            {data?.role_in_organization || 'Product Manager'}
          </p>
        )}
      </div>

      <div className={`${styles.footer}`}>{children}</div>
    </div>
  );
}
