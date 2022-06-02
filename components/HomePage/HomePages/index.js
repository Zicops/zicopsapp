import styles from '../home.module.scss';
import ScrollItems from '../ScrollItems';
import HomeInputField from '../HomeInputField';

const HomePages = ({ item }) => {
  //   function handleScroll() {
  //     console.log(window.scrollY);
  //   }

  //   useEffect(() => {
  //     window.addEventListener('scroll', handleScroll);
  //   }, []);

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
        <div className={`${styles.scrollContainer}`}>
          <ScrollItems item={item} />
        </div>
        <div className={`${styles.btn}`}>
          <button>See More</button>
        </div>
        <HomeInputField />
      </div>
      <div className={`${styles.HomeFooter}`}>
        <div className={`${styles.HomeFooterInner}`}>
          <a href="/home">Zicops About</a>
          <a href="/home">Zicops About</a>
          <a href="/home">Zicops About</a>
          <a href="/home">Zicops About</a>
          <a href="/home">Zicops About</a>
        </div>
      </div>
    </div>
  );
};

export default HomePages;
