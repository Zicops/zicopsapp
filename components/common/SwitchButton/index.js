import Switch from '@mui/material/Switch';
import styles from './SwitchButton.module.scss';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const SwitchButton = ({
  text,
  inputName,
  isChecked,
  changeHandler = function () {},
  isDisabled = false
}) => {
  return (
    <>
      <button className={styles.switchContainer}>
        <Switch
          {...label}
          defaultChecked
          checked={isChecked}
          disabled={isDisabled}
          color="success"
          name={inputName}
          onChange={changeHandler}
        />
        <span className={`${styles.text}`}>{text} </span>
      </button>
      <style>{`
      
      `}</style>
    </>
  );
};

export default SwitchButton;
