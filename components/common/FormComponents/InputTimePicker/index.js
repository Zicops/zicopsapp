import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import styles from '../formComponents.module.scss';

export default function InputTimePicker({
  selected = new Date(),
  timeIntervals = 15,
  changeHandler
}) {
  return (
    <div className="w-100">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TimePicker
          // label="Time"
          value={selected}
          className={styles.timePicker}
          onChange={changeHandler}
          renderInput={(params) => (
            <TextField className={styles.timePicker} label="" placeholder="" {...params} />
          )}
        />
      </LocalizationProvider>
    </div>
  );
}
