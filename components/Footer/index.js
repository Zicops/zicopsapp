import styles from './footer.module.scss';
import LeftFooter from './LeftFooter';
import RightFooter from './RightFooter';

export default function Footer() {
  return (
    <div className={`${styles.footer}`}>
      <LeftFooter />
      <RightFooter />
    </div>
  );
}
