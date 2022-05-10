import styles from './cardFlipPreview.module.scss';
import Image from 'next/image';
import frontImage from '../../../public/images/courses/ANGULAR.png';
import { backSide } from './Logic/cardFlipPreview.helper';

const CardFlipPreview = () => {
  return (
    <>
      <div className={`${styles.cardContainer}`}>
        <div className={`${styles.cardInnerContainer}`}>
          <div className={`${styles.cardFrontSide}`}>
            <Image src={frontImage} width="302px" height="332px" />
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
          </div>
        </div>
      </div>
    </>
  );
};

export default CardFlipPreview;
