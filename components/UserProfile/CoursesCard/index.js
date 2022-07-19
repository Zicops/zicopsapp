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
        width: '100%'
      }}>
      <Box sx={{ width: '85%' }}>
        <LinearProgress
          sx={{ height: '5px', borderRadius: '10px', background: '#000' }}
          variant="determinate"
          value={value}
        />
      </Box>
      <Box color={'#6bcfcf'} fontSize={'14px'} fontWeight={600}>
        {value}%
      </Box>
    </Box>
  );
};

const CoursesCard = () => {
  return (
    <>
      <ThemeProvider
        theme={createTheme({
          palette: {
            primary: {
              main: '#6bcfcf'
            }
          }
        })}>
        <Box
          color={'#FFF'}
          width={'100%'}
          bgcolor={'#292F2F'}
          boxShadow={'0px 0px 30px 25px rgba(0, 0, 0, 0.25)'}
          borderRadius={'12px'}
          p={2}
          position={'relative'}>
          <Box borderRadius={'7px'}>
            <img src={'/images/profile-card.png'} alt={'dnd'} width={'100%'} height={'190px'} />
          </Box>

          <Box
            position={'absolute'}
            bgcolor={'#000'}
            top={24}
            right={20}
            fontSize={'12px'}
            px={1}
            py={0.3}
            borderRadius={'7px'}>
            Self Paced
          </Box>
          <Box mt={0.5} fontSize={'20px'} fontWeight={600}>
            Core Java Refresher.
          </Box>
          <Box mb={0.5} mt={0.5} display={'flex'} alignItems={'center'} fontSize={'13px'}>
            <Box mr={2}>Development</Box>
            <Box bgcolor={'#FFF'} width={'7px'} height={'7px'} borderRadius={'50%'} />
            <Box ml={2}>Java</Box>
          </Box>
          <LinearProgressWithLabel value={60} />
          <Box width={'100%'} mt={1}>
            <Button variant={'outlined'} fullWidth>
              Remove
            </Button>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default CoursesCard;
