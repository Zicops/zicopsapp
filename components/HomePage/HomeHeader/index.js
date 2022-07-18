import Link from 'next/link';
import styles from '../home.module.scss';
const HomeHeader = ({ showLogin = true }) => {
  return (
    <>
      <header className={`${styles.HomeHeader}`}>
        <Link href="/home">
          <a className={`${styles.ZicopsLogo}`}>
            <img src="/images/zicops-header-logo.png" alt="not found" />
          </a>
        </Link>

        {showLogin && (
          <Link href="/login">
            <div className={`${styles.Login}`}>
              <img src="/images/Union1.png" alt="not found" />
              <a>Log In</a>
            </div>
          </Link>
        )}
      </header>
    </>
  );
};

export default HomeHeader;
