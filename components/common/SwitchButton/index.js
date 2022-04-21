import Switch from '@mui/material/Switch';
import styles from './SwitchButton.module.scss';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const SwitchButton = ({ text }) => {
  return (
    <>
      <button
        style={{ cursor: 'pointer', backgroundColor: 'transparent', outline: '0', border: '0' }}>
        <Switch {...label} defaultChecked color="success" />
        <span className={`${styles.text}`}>{text} </span>
      </button>
      <style>{`
      
      `}</style>
    </>
  );
};

export default SwitchButton;
