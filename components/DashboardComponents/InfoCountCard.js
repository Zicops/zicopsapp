import Spinner from '@/components/common/Spinner';
import styles from './dashboardComponents.module.scss';

export default function InfoCountCard({ title = '', image = '', count = '', caption = '' }) {
  return (
    <div className={`${styles.infoCountCardContainer}`}>
      <div className={`${styles.header}`}>
        <div className={`${styles.title}`}>{title}</div>

        <div className={`${styles.iconContainer}`}>
          <img src={image} alt="" />
        </div>
      </div>

      <div className={`${styles.count}`}>
        {count == null ? (
          <Spinner size="30px" customStyles={{ justifyContent: 'flex-start' }} />
        ) : (
          count
        )}
      </div>

      <div className={`${styles.caption}`}>{caption}</div>
    </div>
  );
}
