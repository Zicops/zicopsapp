import styles from './button.module.scss';

const Button = ({ text, type, clickHandler }) => {
  return (
    <>
      <button className={`${styles.btn}`} type={`${type}`} onClick={clickHandler}>
        {text}
      </button>
    </>
  );
};

export default Button;
