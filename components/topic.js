
import Image from 'next/image';
import styles from '../styles/Topic.module.css';
const Topic = () =>{
    return(
        <div className={styles.topic}>
        <div className={styles.preclass}>
            <div><img src="images/resourcesicon.png"/><p>Resources</p></div>
            <div><img src="images/discussicon.png"/><p>Discuss</p></div>
        </div>
        <div className={styles.topic_loop}>
            <div className={styles.topic_img}>
                <img src="images/topicImage.png" alt=""/>
            </div>
            <div className={styles.topic_text}>
                <div className={styles.topic_heading}>
                    <h4><span>1. </span>Minim veniam</h4>
                </div>
                <div className={styles.topic_description}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce egestas interdum leo vehicula vulputate. Vivamus venenatis, justo ut luctus laoreet, ex lacus semper libero, eget suscipit purus lacus a augue.</p>
                </div>
            </div>
            <div className={styles.topic_player}>
                <div className={styles.progress_bar}>
                    <img src="images/progressTriangle.png" alt=""/>
                </div>
                <div className={styles.details}>
                    <div>
                        Video + Quiz
                    </div>
                    <div>
                        Duration : <span>1 hour</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
export default Topic