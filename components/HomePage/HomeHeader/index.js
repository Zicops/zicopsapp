import { UsersOrganizationAtom } from '@/state/atoms/users.atom';
import Image from 'next/image';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import styles from '../home.module.scss';
const HomeHeader = ({ showLogin = true, showBackBtn = false, showLogo = true }) => {
  // /images/brand/zicops-new-logo.svg
  const userOrgData = useRecoilValue(UsersOrganizationAtom);

  return (
    <>
      <header className={`${styles.HomeHeader}`}>
        <Link href="/home">
          <a className={`${styles.ZicopsLogo}`}>
            {!showLogo && userOrgData?.logo_url == null ? (
              <div></div>
            ) : (
              <img
                src={`${
                  userOrgData?.logo_url?.length
                    ? userOrgData?.logo_url
                    : '/images/brand/zicops-new-logo.svg'
                }`}
                alt="zicops logo"
              />
            )}
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
