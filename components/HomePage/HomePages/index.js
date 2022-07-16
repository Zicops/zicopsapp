import styles from '../home.module.scss';

const HomePages = ({ item }) => {
  return (
    <div className={`${styles.HomeBody}`}>
      <div className={`${styles.scrollContainer}`}>
        <div className={`${styles.scrollItems}`}>
          <div className={`${styles.Lcontainer}`}>
            <img src={item.icon} />
            <img src="./images/Zicops-logo-text.png" />
          </div>
          <div className={`${styles.text}`}>
            <p>{item.text}</p>
          </div>
        </div>
      </div>
      <div className={`${styles.btn}`}>
        <button>See More</button>
      </div>
    </div>
  );
};

export default HomePages;
