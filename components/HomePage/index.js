import styles from './home.module.scss';
import ScrollItems from './ScrollItems';
import { data } from './Logic/homePage.helper';
import HomeInputField from './HomeInputField';
import { useEffect } from 'react';

const HomePage = () => {
  function handleScroll() {
    console.log(window.scrollY);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`${styles.HomeContainer}`}>
      <header className={`${styles.HomeHeader}`}>
        <div className={`${styles.ZicopsLogo}`}>
          <img src="./images/zicops-header-logo.png" alt="not found" />
        </div>
        <div className={`${styles.Login}`}>
          <img src="./images/Union1.png" alt="not found" />
          <a href="/home">Log In</a>
        </div>
      </header>
      <div className={`${styles.HomeBody}`}>
        <div className={`${styles.scrollContainer} ${styles.y}`}>
          {/* {data.map((item) => ( */}
          <ScrollItems item={data[0]} />
          {/* ))} */}
        </div>
        <div className={`${styles.btn}`}>
          <button>See More</button>
        </div>
        <HomeInputField />
      </div>
      <footer className={`${styles.HomeFooter}`}>
        <div className={`${styles.HomeFooterInner}`}>
          <a href="/home">Zicops About</a>
          <a href="/home">Zicops About</a>
          <a href="/home">Zicops About</a>
          <a href="/home">Zicops About</a>
          <a href="/home">Zicops About</a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
