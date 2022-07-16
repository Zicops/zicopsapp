import ScrollDownAnimation from '@/components/common/ScrollDownAnimation';
import styles from '../home.module.scss';

const HomeInputField = () => {
  return (
    <>
      <div className={`${styles.formContainerWrapper}`}>
        <form className={`${styles.formContainer}`}>
          <span>
            <img src="./images/search2.png" alt="not found" />
          </span>
          <input type="text" placeholder="Search your Organization" />
          <button>GO</button>
        </form>
        <ScrollDownAnimation />
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
    </>
  );
};

export default HomeInputField;
