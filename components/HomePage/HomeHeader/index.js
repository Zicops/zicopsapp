import Link from 'next/link';
import styles from '../home.module.scss';
const HomeHeader = ({ showLogin = true }) => {
  return (
    <>
      <header className={`${styles.HomeHeader}`}>
        <Link href="/home">
          <a className={`${styles.ZicopsLogo}`}>
            <img src="/images/ZICOPS LOGO.svg" alt="zicops logo" />
          </a>
        </Link>

        {showLogin && (
          <Link href="/login">
            <div className={`${styles.Login}`}>
              <img src="/images/Union1.png" alt="not found" />
              <a>Login</a>
            </div>
          </Link>
        )}
      </header>
    </>
  );
};

export default HomeHeader;
