import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

export default function TimerDropdown() {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl >
        
        <NativeSelect
         
          
        >
          <option >Time Left</option>
          <option >Time</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}
