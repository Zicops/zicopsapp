import Dropdown from '@/components/common/Dropdown';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import TurnRightIcon from '@mui/icons-material/TurnRight';
import { useState } from 'react';
import LabeledDropdown from '../../common/FormComponents/LabeledDropdown';
import styles from '../labs.module.scss';

export default function Controls(props) {
  const { pacmanRef, handleClick, activeBtn } = props;

  const floorOptions = [
    { value: 'Programming', label: 'Programming' },
    { value: 'Design', label: 'Design' },
    { value: 'Infrastructure', label: 'Infrastructure' },
    { value: 'Leadership', label: 'Leadership' }
    // { value: 5, label: '5' }
  ];
  const [floor, setFloor] = useState(floorOptions[0]);

  return (
    <div className={styles.controls}>
      <div>
        <Dropdown
          options={floorOptions}
          handleChange={(e) => setFloor(e)}
          value={floor}
          customStyles={{ width: '100%' }}
        />
        {/* <LabeledDropdown
          dropdownOptions={{
            placeholder: 'Select Floor Level',
            options: floorOptions,
            value: { value: floor, label: floor }
          }}
          // isFiftyFifty={true}
          changeHandler={(e) => setFloor(e.value)}
        /> */}
      </div>

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
