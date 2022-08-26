import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { MobileTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { disabledInput } from '../formComponents.module.scss';

export default function InputTimePicker({
  selected = new Date(),
  minTime = null,
  changeHandler,
  isDisabled = false
}) {
  const RedditTextField = styled((props) => (
    <TextField InputProps={{ disableUnderline: true }} {...props} />
  ))(({ theme }) => ({
    '&.MuiFormControl-root': {
      width: '100%'
    },
    '& .MuiOutlinedInput-root': {
      border: '2px solid #6bcfcf',
      color: '#FFF',
      fontSize: '14px',
      borderRadius: 1,
      height: '40px',
      outline: 0,
      transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
      '&:hover': {
        border: '2px solid #6bcfcf',
        // backgroundColor: 'red'
        outline: 0
      },

      '&.Mui-focused': {
        border: '2px solid #6bcfcf',
        boxShadow: '0px 0px 10px 0px #6bcfcf'
        // outline: 0,
      }
    },
    fieldset: {
      borderColor: 'transparent !important'
    }
  }));

  return (
    <div className="w-100">
      <ThemeProvider
        theme={createTheme({
          palette: {
            primary: {
              main: '#6bcfcf'
            },
            mode: 'dark'
          }
        })}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileTimePicker
            // label="Time"
            value={selected}
            onChange={changeHandler}
            renderInput={(params) => (
              <RedditTextField {...params} InputProps={{ disableUnderline: true }} />
            )}
            className={isDisabled ? disabledInput : ''}
            disabled={isDisabled}
            minTime={minTime ? new Date(minTime) : null}
          />
        </LocalizationProvider>
      </ThemeProvider>
    </div>
  );
}
