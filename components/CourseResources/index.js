import styles from './courseResources.module.scss';

const CourseResourses = () => {
    return (
      <>
        <div className={`${styles.topic}`}>
          <div className={`${styles.topic_head}`}>Topic 1</div>
          <div className={`${styles.topic_body}`}>
            <div className={`${styles.topic_data}`}>
              <p>6 Files</p>
            </div>
            <div className={`${styles.arrow_img}`}>
              <img src="/images/right-arrow-white.png" alt="" />
            </div>
          </div>
        </div>
      </>
    );
}
 
export default CourseResourses;