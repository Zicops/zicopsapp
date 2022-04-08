import Image from 'next/image';
import styles from '../footer.module.scss';
import { socialImage } from '../Logic/footer.helper';

export default function RightFooter() {
  return (
    <div className={`${styles.footerRight}`}>
      <div className={`${styles.connectWithUs}`}>
        <p className={`${styles.heading}`}>Connect with us</p>

        {socialImage.map((img) => (
          <span key={img.path}>
            <Image height={30} width={30} src={img.path} alt="" />
          </span>
        ))}
      </div>

      <div className={styles.store}>
        <p className={styles.h_footer}>Download App</p>
        <img src="/images/play_store.png" alt="" />
        <img src="/images/app_store.png" alt="" />
      </div>
    </div>
  );
}
