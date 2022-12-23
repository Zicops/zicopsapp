// screens\HomepageScreen\HomePageLoader.js

import { Skeleton } from '@mui/material';
import { useEffect } from 'react';
import styles from './listCardLoader.module.scss';

export default function ListCardLoader({ heroHeight = 380 }) {
  const rowCount = 1;
  const cardCount = 4;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    return () => (document.body.style.overflow = '');
  }, []);

  return (
    <div className={`${styles.homePageLoader}`}>
      
      <div className={`${styles.rowContainer}`}>
        {[...Array(rowCount)].map((v, index) => (
          <div key={index}>
            <div
              style={{
                marginLeft: '4%',
                marginRight: '4%',
                paddingTop: '25px'
              }}>
              <Skeleton
                style={{ marginBottom: '10px' }}
                sx={{ bgcolor: 'dimgray' }}
                variant="text"
                width={350}
                height={40}
              />
            </div>

            <div className={`${styles.listContainer}`}>
              {[...Array(cardCount)].map((val, i) => (
                <Skeleton
                  key={i}
                  sx={{ bgcolor: 'dimgray', borderRadius: '5px' }}
                  variant="rectangular"
                  height={140}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
