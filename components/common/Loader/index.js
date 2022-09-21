// components\common\Loader\index.js

import { CircularProgress, createTheme, ThemeProvider } from '@mui/material';
import styles from './loader.module.scss';

export default function Loader() {
  return (
    <>
      <div className={styles.loaderContainer}>
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
