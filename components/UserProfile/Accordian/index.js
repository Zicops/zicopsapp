import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from './accordian.module.scss';

const Index = ({ height, children, acc_title }) => {
  const [isActive, setIsActive] = useState(false);

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
          width={'100%'}
          boxShadow={'0px 0px 45px 5px rgba(0, 0, 0, 0.55)'}
          bgcolor={'#1E1F1F'}
          px={2}
          py={1}
          my={2}
          pb={isActive ? 3 : 2}
          borderRadius={'15px'}
          color={'#FFF'}>
          <Box
            width={'100%'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}>
            <Box fontWeight={700}>{acc_title}</Box>
            <IconButton
              onClick={() => {
                if (children) setIsActive(!isActive);
              }}>
              {isActive ? <RemoveIcon color={'primary'} /> : <AddIcon sx={{ color: '#FFF' }} />}
            </IconButton>
          </Box>
          {isActive && (
            <Box mt={2} height={height} className={`${styles.container}`}>
              {children}
            </Box>
          )}
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Index;
