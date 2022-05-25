import styles from '../home.module.scss';

const ScrollItems = ({ item }) => {
  return (
    <div className={`${styles.scrollItems}`}>
      <div className={`${styles.Lcontainer}`}>
        <img src={`${item.icon}`} />
        <img src="./images/Zicops-logo-text.png" />
      </div>
      <div className={`${styles.text}`}>
        <p>{item.text}</p>
      </div>
    </div>
  );
};

export default ScrollItems;
