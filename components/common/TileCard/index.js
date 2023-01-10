import styles from './tileCard.module.scss';
import { getDynamicFontClass, truncateToN } from '@/helper/common.helper';
import PropTypes from 'prop-types';
import Image from 'next/image';

export default function TileCard({
  tileImg,
  type,
  courseName,
  ownerName,
  level,
  duration,
  description,
  category,
  subCategory,
  showOverlay,
  overlayPositon,
  customClass,
  handleClick = () => {}
}) {
  let courseClass = getDynamicFontClass(
    courseName,
    `${styles.coursename}`,
    `${styles.coursenamesmall}`
  );

  return (
    <div className={`${styles.main} ${customClass}`} onClick={handleClick}>
      <div className={styles.tileCard}>
        <div className={styles.tileCardWrapper}>
          {/* <div className={styles.banner}>{type}</div>
          <div className={courseClass}>{courseName}</div>
          <div className={styles.courseowner}>{ownerName}</div> */}
        </div>
        <Image
          src={tileImg || '/images/courses/workplace design.png'}
          alt=""
          layout="fill"
          //   width="250px"
          //   height="150px"
          className={styles.img}
        />
      </div>
      {showOverlay && (
        <div className={`${styles.overlay} ${styles[overlayPositon]}`}>
          <div className={styles.bottomBox}>
            <div className={styles.titleArea}>
              <div className={styles.firstline}>
                <div className={styles.title}>{courseName}</div>
              </div>
              <div className={styles.secondline}>{type}</div>
            </div>
            <div className={styles.addCoursePlus}>
              <Image src="/images/add-line.svg" alt="" width="25px" height="25px" />
            </div>
            <div className={styles.descArea}>
              <div className={styles.mainDesc}>
                <div className={styles.one}>
                  <div className={styles.oneText}>
                    <span className={styles.level}>Level:</span>
                    <span className={styles.value}>{level}</span>
                  </div>
                  <div className={styles.oneText}>
                    <span className={styles.level}>Duration:</span>
                    <span className={styles.value}>{duration} mins</span>
                  </div>
                </div>

                <div className={styles.description}>{truncateToN(description, 160)}</div>
              </div>
              <div className={styles.category}>
                <ul className={styles.categoryUl}>
                  <span className={styles.categoryLi}>{category}</span>
                  <li className={styles.categoryLi}>{subCategory}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
TileCard.propTypes = {
  overlayPositon: PropTypes.oneOf(['right', 'center', 'left']),
  courseName: PropTypes.string,
  type: PropTypes.string,
  tileImg: PropTypes.string,
  level: PropTypes.string,
  ownerName: PropTypes.string,
  duration: PropTypes.string,
  description: PropTypes.string,
  category: PropTypes.string,
  subCategory: PropTypes.string,
  showOverlay: PropTypes.bool
};

TileCard.defaultProps = {
  overlayPositon: 'center',
  showOverlay: true
};
