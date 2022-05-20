import { data } from './Logic/circleCard.helper';
import styles from '../zicopsCarousel.module.scss';

const CircleCard = ({ image }) => {
  return (
    <>
      <div className={`${styles.circleCardContainer}`}>
        <div className={`${styles.circleInnerContainer}`}>
          <div className={`${styles.circleFront}`}>
            <img src={image || data.imgSrc} alt="Not found" />
          </div>
          <div className={`${styles.circleBack}`}>
            <div className={`${styles.cTitle}`}>{data.title}</div>
            <div className={`${styles.cType}`}>{data.type}</div>
            <div className={`${styles.cInfo}`}>
              <p>
                <span>Level: </span>
                {data.level}
              </p>
              <p>
                <span>Duration: </span>
                {data.Duration} mins
              </p>
            </div>
            <div className={`${styles.description}`}>{data.Discription}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CircleCard;
