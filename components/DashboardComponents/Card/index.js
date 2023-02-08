import Spinner from '@/components/common/Spinner';
import styles from '../dashboardComponents.module.scss';

export default function Card({ title = '', image = '', count = '', description = '' }) {
  return (
    <div className={`${styles.card_wrapper}`}>
      <div className={`${styles.card_head}`}>
        <div className={`${styles.card_title}`}>{title}</div>
        <div className={`${styles.card_img}`}>
          <img src={image} alt={title} />
        </div>
      </div>
      <div className={`${styles.card_count}`}>
        {count == null ? <Spinner size="30px" customStyles={{ display: 'flex' }} /> : count}
      </div>
      <div className={`${styles.card_text}`}>{description}</div>
    </div>
  );
}
