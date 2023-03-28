// components\AdminAnalyticsDashboardComp\common\SortBtn\index.js
import { DownSortTriangleIcon } from '@/components/common/ZicopsIcons';
import styles from './sortBtn.module.scss';

export default function SortBtn({
  handleClick = () => {},
  displayText = '',
  sortIndex = 0,
  isAxisX = true
}) {
  return (
    <>
      <div className={`${styles.sortBtn}`} onClick={handleClick}>
        <span style={{ transform: `rotate(${!!isAxisX ? 0.25 : 0}turn)` }}>
          <DownSortTriangleIcon
            color={sortIndex === 1 ? styles.primary : styles.darkThree}
            turns="0.5"
          />
          <DownSortTriangleIcon color={sortIndex === 2 ? styles.primary : styles.darkThree} />
        </span>
        {displayText}
      </div>
    </>
  );
}
