import HomePages from './HomePages';
import styles from './home.module.scss';
import { data } from './Logic/homePage.helper';

const HomePage = () => {
  return (
    <>
      {data.map((item) => (
        <div className={`${styles.HomeMainContainer}`}>
          <HomePages item={item} />
        </div>
      ))}
    </>
  );
};

export default HomePage;
