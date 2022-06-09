import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from 'react';
import styles from './datePicker.module.scss';

export default function DatePicker() {
  const [value, setValue] = useState(new Date());

  const handleChange = (newValue, a, b) => {
    console.log(newValue, a, b);
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        label="Date desktop"
        inputFormat="MM/dd/yyyy"
        value={value}
        onChange={handleChange}
        className={styles.container}
        renderInput={(params) => {
          console.log(params);
          return <TextField {...params} />;
        }}
      />

      {/* <Stack spacing={3}>
        <MobileDatePicker
          label="Date mobile"
          inputFormat="MM/dd/yyyy"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
        <TimePicker
          label="Time"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
        <DateTimePicker
          label="Date&Time picker"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack> */}
    </LocalizationProvider>
  );
}
