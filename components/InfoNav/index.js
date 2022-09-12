import Link from 'next/link';
import { element } from 'prop-types';
import styles from './infoNav.module.scss';

const InfoNav = ({ showLogin = true }) => {
  const routerConfig = [
    {
      path: '/info/about-us',
      title: 'About Zicops'
    },
    {
      path: '/info/tour',
      title: 'Take a tour'
    },
    {
      path: '/info/collaborate',
      title: 'Collaborate with us'
    },
    {
      path: '/info/contact-us',
      title: 'Contact Us'
    },
    {
      path: '/info/careers',
      title: 'Careers'
    }
  ];

  return (
    <header className={`${styles.HomeHeader}`}>
      <Link href="/home">
        <a className={`${styles.ZicopsLogo}`}>
          <img src="/images/ZICOPS LOGO.svg" alt="zicops logo" />
        </a>
      </Link>
      <div className={`${styles.PageRoutes}`}>
        {routerConfig.map((element) => {
          return <Link href={element.path}>{element.title}</Link>;
        })}
      </div>
      {showLogin && (
        <Link href="/login">
          <div className={`${styles.Login}`}>
            <img src="/images/Union1.png" alt="not found" />
            <a>Login</a>
          </div>
        </Link>
      )}
    </header>
  );
};

export default InfoNav;
