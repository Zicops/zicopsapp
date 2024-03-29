// screens\HomepageScreen\HomePageLoader.js

import { Skeleton } from '@mui/material';
import { useEffect } from 'react';
import styles from './homepageScreen.module.scss';

export default function HomePageLoader({ heroHeight = 380 }) {
  const rowCount = 3;
  const cardCount = 7;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    return () => (document.body.style.overflow = '');
  }, []);

  return (
    <div className={`${styles.homePageLoader}`}>
      <Skeleton
        sx={{ bgcolor: 'dimgray' }}
        variant="rectangular"
        animation="wave"
        height={heroHeight}
      />

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

            <div className={`${styles.cardContainer}`}>
              {[...Array(cardCount)].map((val, i) => (
                <Skeleton
                  key={i}
                  sx={{ bgcolor: 'dimgray', borderRadius: '5px' }}
                  variant="rectangular"
                  width={230}
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
