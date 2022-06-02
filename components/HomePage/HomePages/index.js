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
      <div className={`${styles.HomeBody}`}>
        <div className={`${styles.scrollContainer}`}>
          <ScrollItems item={item} />
        </div>
        <div className={`${styles.btn}`}>
          <button>See More</button>
        </div>
        <HomeInputField />
      </div>
  );
};

export default HomePages;
