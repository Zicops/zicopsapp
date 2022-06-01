import HomePages from './HomePages';
import styles from './home.module.scss';
import { data } from './Logic/homePage.helper';

const HomePage = () => {
  return (
    <div className={`${styles.container}`}>
      {data.map((item) => (
        <section>
          <HomePages item={item} />
        </section>
      ))}
    </div>
  );
};

export default HomePage;
