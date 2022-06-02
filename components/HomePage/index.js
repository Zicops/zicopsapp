import HomePages from './HomePages';
import styles from './home.module.scss';
import { data } from './Logic/homePage.helper';

const HomePage = () => {
  return (
    <div className={`${styles.container}`}>
      <header className={`${styles.HomeHeader}`}>
        <div className={`${styles.ZicopsLogo}`}>
          <img src="./images/zicops-header-logo.png" alt="not found" />
        </div>
        <div className={`${styles.Login}`}>
          <img src="./images/Union1.png" alt="not found" />
          <a href="/home">Log In</a>
        </div>
      </header>
      <div className={`${styles.scrollItems}`} onWheel={(e) => console.log(e)}>
        {/* {data.map((item) => ( */}
        <section>
          <HomePages item={data[0]} key={data[0].id} />
        </section>
        {/* ))} */}
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
