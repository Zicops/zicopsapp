import styles from '../adminCourse.module.scss';

export default function HeaderDataContainer() {
  const courseHeaderData = [
    {
      title: 'Assigned to',
      subText: 'Learners',
      iconSrc: '/images/svg/assigned-to-dahsboard-icon.svg',
      dynamicfact: '120'
    },
    {
      title: 'In progress',
      subText: 'Learners',
      iconSrc: '/images/svg/in-progress-dashboard-icon.svg',
      dynamicfact: '105'
    },
    {
      title: 'Completed by',
      subText: 'Learners',
      iconSrc: '/images/svg/completed-dashboard-icon.svg',
      dynamicfact: '15'
    }
  ];

  return (
    <div className={`${styles.dataFrame}`}>
      {courseHeaderData?.map((data) => {
        return (
          <div className={`${styles.dataContainer}`}>
            <div className={`${styles.factContainer}`}>
              <p>{data?.title}</p>
              <div className={`${styles.factSubtext}`}>
                <p className={`${styles.dynamicFact}`}>{data?.dynamicfact} </p>
                <p className={`${styles.subText}`}>{data?.subText}</p>
              </div>
            </div>
            <div className={`${styles.iconContainer}`}>
              <img src={data?.iconSrc} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
