// components\common\Loader\index.js

import { CircularProgress, createTheme, ThemeProvider } from '@mui/material';
import styles from './loader.module.scss';

export default function Loader({ customStyles = {} }) {
  return (
    <>
      <div className={styles.loaderContainer} style={customStyles}>
        <ThemeProvider
          theme={createTheme({
            palette: {
              primary: {
                main: '#6bcfcf'
              }
            }
          })}>
          <CircularProgress />
        </ThemeProvider>
      </div>
    </>
  );
}
