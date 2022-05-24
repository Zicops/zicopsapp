import styles from '../home.module.scss';

const HomeInputField = () => {
  return (
    <form className={`${styles.formContainer}`}>
      <span>
        <img src="./images/search2.png" alt="not found" />
      </span>
      <input type="text" placeholder="Search your Organization" />
      <button>GO</button>
    </form>
  );
};

export default HomeInputField;
