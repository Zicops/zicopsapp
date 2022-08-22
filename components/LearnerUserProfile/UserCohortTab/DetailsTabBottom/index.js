import styles from '../../learnerUserProfile.module.scss';
import CohortManagerList from '../CohortManagerList';
const DetailsTabBottom = () => {
    return (
      <div className={`${styles.detailsBottomsection}`}>
        <div className={`${styles.bottomLeft}`}>
          <p className={`${styles.text}`}>Cohort Managers</p>
          <div className={`${styles.list}`}>
            <div
              style={{
                height: '120px',
                overflowY: 'scroll',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
              <CohortManagerList />
              <CohortManagerList />

              <CohortManagerList />
              <CohortManagerList />
            </div>
          </div>
        </div>
        <div className={`${styles.bottomRight}`}>
          <p className={`${styles.text}`}>Active Members</p>
          <div className={`${styles.list}`}>
            <div
              style={{
                height: '120px',
                overflowY: 'scroll',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
              <CohortManagerList />
              <CohortManagerList />

              <CohortManagerList />
              <CohortManagerList />
            </div>
          </div>
        </div>
      </div>
    );
}
 
export default DetailsTabBottom;