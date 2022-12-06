import Link from 'next/link';
import Image from 'next/image';
import styles from '../home.module.scss';
const HomeHeader = ({ showLogin = true, showBackBtn = false, showLogo = true }) => {
  return (
    <>
      <header className={`${styles.HomeHeader}`}>
        <Link href="/home">
          <a className={`${styles.ZicopsLogo}`}>
            {showLogo ? <img src="/images/brand/zicops-new-logo.svg" alt="zicops logo" /> : ''}
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
