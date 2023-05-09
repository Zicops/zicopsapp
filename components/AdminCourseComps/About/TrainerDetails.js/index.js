import React from 'react';
import styles from '../../adminCourseComps.module.scss';
const TrainerDetails = () => {
  const infoArray = [
    { image: '/images/svg/account_circle.svg', label: 'Name', value: 'Anupam' },
    {
      image: '/images/svg/forward_to_inbox.svg',
      label: 'Contact',
      value: 'rameshkumar@zicops.com'
    },
    {
      image: '/images/svg/group.svg',
      label: 'Type',
      value: 'Internal'
    },
    {
      image: '/images/svg/store.svg',
      label: 'Vendor',
      value: 'ABC vendor'
    }
  ];
  const expertiseArray = [
    'Java',
    'Python',
    'Machine Learning',
    'Java',
    'Python',
    'Machine Learning',
    'Java',
    'Python',
    'Machine Learning'
  ];
  return (
    <div className={`${styles.trainerDetailsContainer}`}>
      <div className={`${styles.trainerImage}`}>
        <img src="/images/Avatars/maleProfile.png" alt="" />
      </div>
      <div className={`${styles.trainerInfoContainer}`}>
        {infoArray?.map((info, index) => (
          <div className={`${styles.trainerInfo}`}>
            <div className={`${styles.trainerImg2}`}>
              <img src={info?.image} alt="" />
            </div>
            <div>
              <p className={`${styles.trainerLabel}`}>{info?.label}</p>
              <p className={`${styles.trainerValue}`}>{info?.value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={`${styles.hr}`}></div>
      <p className={`${styles.expertText}`}>Expertise:</p>
      <div className={`${styles.trainerExpertise}`}>
        {expertiseArray?.map((expert, index) => (
          <div className={`${styles.expertiseName}`}>{expert}</div>
        ))}
      </div>
    </div>
  );
};

export default TrainerDetails;
