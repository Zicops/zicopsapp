import { FormControlLabel, Switch } from '@mui/material';
import { AntSwitch } from './Logic/switchButton.helper';

export default function SwitchButton({
  inputName,
  label,
  labelPlacement = 'start',
  isChecked,
  handleChange,
  styles = {},
  size = null,
  type = 'success',
  isDisabled = false
}) {
  const props = { disabled: !!isDisabled };

  if (type) props.color = type;

  return (
    <>
      <FormControlLabel
        control={
          <>
            {size === null && (
              <Switch name={inputName} checked={isChecked} {...props} onChange={handleChange} />
            )}

            {size === 'small' && (
              <AntSwitch {...props} name={inputName} checked={isChecked} onChange={handleChange} />
            )}
          </>
        }
        sx={styles}
        label={label}
        labelPlacement={labelPlacement}
      />
    </>
  );
}
