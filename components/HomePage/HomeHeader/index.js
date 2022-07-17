import Link from 'next/link';
import styles from '../home.module.scss';
const HomeHeader = () => {
  return (
    <>
      <header className={`${styles.HomeHeader}`}>
        <div className={`${styles.ZicopsLogo}`}>
          <img src="./images/zicops-header-logo.png" alt="not found" />
        </div>
        <Link href="/login">
          <div className={`${styles.Login}`}>
            <img src="./images/Union1.png" alt="not found" />
            <a>Log In</a>
          </div>
        </Link>
      </header>
    </>
  );
};

export default HomeHeader;
