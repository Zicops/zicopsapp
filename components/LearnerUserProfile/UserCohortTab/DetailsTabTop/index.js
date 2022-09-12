import styles from '../../learnerUserProfile.module.scss';

const DetailsTabTop = () => {
  return (
    <div className={`${styles.detailsTopsection}`}>
      <div className={`${styles.topLeft}`}>
        <img src="./images/details.png" />
      </div>
      <div className={`${styles.topRight}`}>
        <p className={`${styles.bigText}`}>Development Cohort</p>
        <p className={`${styles.cohortManager}`} style={{ border: 'none' }}>
          <img src="/images/svg/calendar-month.svg" alt="" />
          Joined on:<span> 20:04:2022</span>
        </p>

        <p>
          ID: DevCohort-ID-1
          <span>Open</span>
        </p>
        <div className={`${styles.cohortManager}`}>
          <img src="/images/svg/manage_accounts.svg" />
          <p>Cohort Manager</p>
        </div>

        <p style={{ fontSize: '13px', marginRight: '15px', color: '#ACACAC' }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry's standard dummy text ever since the 1500s, when an unknown printer took
          a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply
          dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of
          the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
          text ever since the 1500.
        </p>
        <div className={`${styles.rank}`}>
          <div className={`${styles.rankInside}`}>
            <p>Your best rank achieved</p>
            <p className={`${styles.rankNumber}`}>03</p>
          </div>
          <div className={`${styles.rankInside}`}>
            <p> Number of Days at top Rank</p>
            <p className={`${styles.rankNumber}`}>14</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsTabTop;
