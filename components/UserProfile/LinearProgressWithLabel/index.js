import { Box, Grid, LinearProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

const LinearProgressWithLabel = ({ value }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: '#6BCFCF'
      }}>
      <Box sx={{ width: '100%' }}>
        <LinearProgress
          sx={{
            height: '5px',
            borderRadius: '10px',
            background: '#000',
            '&.MuiLinearProgress-bar': {
              color: '#6BCFCF'
            }
          }}
          variant="determinate"
          value={value}
        />
      </Box>
      <Box color={'#6bcfcf'} fontSize={'14px'} fontWeight={600} marginLeft={'10px'}>
        {value}%
      </Box>
    </Box>
  );
};

export default LinearProgressWithLabel;
