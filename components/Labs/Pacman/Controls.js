import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import TurnRightIcon from '@mui/icons-material/TurnRight';
import styles from '../labs.module.scss';

export default function Controls(props) {
  const { pacmanRef, handleClick, activeBtn } = props;

  return (
    <div className={styles.controls}>
      <div className={`${styles.arrowContainer}`}>
        {[ArrowUpwardIcon, ArrowBackIcon, ArrowDownwardIcon, ArrowForwardIcon].map(
          (Comp, index) => {
            return (
              <div
                key={index}
                className={`${styles.arrowBtn} ${activeBtn === index ? styles.activeBtn : ''}`}
                onClick={(e) => handleClick(e, index)}>
                <Comp />
              </div>
            );
          }
        )}

        {/* <div className={`${styles.arrowBtn} ${activeBtn === 2 ? styles.activeBtn : ''}`}></div>
        <div className={`${styles.arrowBtn} ${activeBtn === 3 ? styles.activeBtn : ''}`}></div>
    <div className={`${styles.arrowBtn} ${activeBtn === 4 ? styles.activeBtn : ''}`}></div> */}
      </div>

      <div className={`${styles.enterLabBtn}`}>
        <button
          disabled={pacmanRef?.current?.activeRoom == null}
          onClick={() => alert(pacmanRef?.current?.activeRoom?.route)}>
          <TurnRightIcon />
        </button>
        <span>Enter Labs</span>
      </div>
    </div>
  );
}
