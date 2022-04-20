import styles from './button.module.scss';

const Button = ({ text, type }) => {
  return (
    <>
      <button className={`${styles.btn}`} type={`${type}`}>
        {text}
      </button>
    </>
  );
};

export default Button;
