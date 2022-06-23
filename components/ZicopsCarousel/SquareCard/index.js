import styles from '../zicopsCarousel.module.scss';
import { backSide, frontSide } from './Logic/cardFlipPreview.helper';

const SquareCard = ({ image }) => {
  return (
    <>
      <div className={`${styles.cardContainer}`}>
        <div className={`${styles.cardInnerContainer}`}>
          <div className={`${styles.cardFrontSide}`}>
            <img src={image || frontSide.imgSrc} alt="not found" />
          </div>
          <div className={`${styles.cardBackSide}`}>
            <div className={`${styles.cbTitle}`}>{backSide.title}</div>
            <div className={`${styles.cbType}`}>{backSide.type}</div>
            <div className={`${styles.cbInfo}`}>
              <p>
                <span>Level: </span>
                {backSide.level}
              </p>
              <p>
                <span>Duration: </span>
                {backSide.Duration} mins
              </p>
            </div>
            <div className={`${styles.cbDiscription}`}>{backSide.Discription}</div>
            <div className={`${styles.category}`}>
              <ul>
                {/* <li>{courseData.category || " Category 1"}</li> */}
                <li>{' Category that is longer'}</li>
                <li>{' Category longer'}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SquareCard;
