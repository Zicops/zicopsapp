import { FormControlLabel, Switch } from '@mui/material';
import { AntSwitch } from './Logic/switchButton.helper';

export default function SwitchButton({
  inputName,
  label,
  labelPlacement = 'start',
  isChecked,
  handleChange,
  styles = {},
  type = null,
  size = null,
  color = null
}) {
  const props = {};
  if (size) props.size = size;
  if (color) props.color = color;

  return (
    <>
      <FormControlLabel
        control={
          <>
            {type === null && (
              <Switch name={inputName} checked={isChecked} {...props} onChange={handleChange} />
            )}

            {type === 'antSwitch' && (
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
