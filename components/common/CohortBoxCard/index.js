import { truncateTo16 } from '@/components/Nav/Logic/nav.helper';
import { truncateToN } from '@/helper/common.helper';
import styles from './courseBoxCard.module.scss';

export default function CohortBoxCard({
  cardWidth = 330,
  handleClick,
  img,
  name,
  totalMembers,
  type,
  description,
  joinedOn,
  children
}) {
  return (
    <div
      className={`${styles.cardContainer}`}
      style={{ width: `${cardWidth}px` }}
      onClick={handleClick}>
      <div className={`${styles.imgContainer}`} style={{ height: `${cardWidth / 1.8125}px` }}>
        {/* course img */}
        <img src={img || '/images/profile-card.png'} alt="" />
      </div>

      {/* title and cat sub cat */}
      <div className={`${styles.cardBody}`}>
        <div>
          <p className={`${styles.title}`}>{name || 'Cohort Name'}</p>
          <div className={`${styles.details}`}>
            <p>Total Members: {totalMembers || 0}</p>
            <p>Type: {type || ''}</p>
          </div>
        </div>

        <div className={`${styles.description}`}>{truncateToN(description, 160)}</div>
        <div className={`${styles.joinedOn}`}>Joined on {joinedOn || '26/3/2022'}</div>

        {children}
      </div>
    </div>
  );
}
