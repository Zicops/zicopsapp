import { FormControlLabel, Switch } from '@mui/material';

export default function SwitchButton({
  inputName,
  label,
  labelPlacement = 'start',
  isChecked,
  handleChange
}) {
  return (
    <>
      <FormControlLabel
        control={
          <Switch color="success" name={inputName} checked={isChecked} onChange={handleChange} />
        }
        label={label}
        labelPlacement={labelPlacement}

      />
    </>
  );
}
