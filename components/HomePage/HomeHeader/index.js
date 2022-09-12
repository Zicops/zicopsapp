import Link from 'next/link';
import Image from 'next/image';
import styles from '../home.module.scss';
const HomeHeader = ({ showLogin = true, showBackBtn = false }) => {
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

        {showBackBtn && (
          <Link href="/login">
            <div className={`${styles.backBtn}`}>
              <Image src="/images/bigarrowleft.png" alt="" height={20} width={20} />
              <span>Back</span>
            </div>
          </Link>
        )}
      </header>
    </>
  );
};

export default HomeHeader;
