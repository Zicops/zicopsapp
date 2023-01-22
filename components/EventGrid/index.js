import styles from './eventGrid.module.scss';

const EventGrid = () => {
    return (
      <div className={`${styles.heroContainer}`}>
        <div className={`${styles.eventGrid}`}>
          <div className={`${styles.gridItem}`}>
            <img src="/images/eventsBanner/animation.jpeg" />
          </div>
          <div className={`${styles.gridItem}`}>
            <img src="/images/eventsBanner/file-handling.jpeg" />
          </div>
          <div className={`${styles.gridItem}`}>
            <img src="/images/eventsBanner/machine-learning.jpeg" />
          </div>
          <div className={`${styles.gridItem}`}>
            <img src="/images/eventsBanner/pandas.jpeg" />
          </div>
          <div className={`${styles.gridItem}`}>
            <img src="/images/eventsBanner/regex.jpeg" />
          </div>
          <div className={`${styles.gridItem}`}>
            <img src="/images/eventsBanner/neural-network.jpeg" />
          </div>
          <div className={`${styles.gridItem}`}>
            <img src="/images/eventsBanner/ab-testing.jpeg" />
          </div>
          <div className={`${styles.gridItem}`}>
            <img src="/images/eventsBanner/data-visualization.jpeg" />
          </div>
          <div className={`${styles.gridItem}`}>
            <img src="/images/eventsBanner/statistics.jpeg" />
          </div>
        </div>
      </div>
    );
}
 
export default EventGrid;