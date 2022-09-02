import React, { useEffect, useState } from 'react';
import styles from './contents.module.scss';

const Contents = ({ heading }) => {
  // const [selected, setSelected] = useState('');
  const [offsetY, setOffsetY] = useState(0)

  const handleScroll = () => setOffsetY(window.scrollY)

  useEffect(()=>{
    window.addEventListener('scroll',handleScroll)

    return ()=> window.removeEventListener('scroll',handleScroll)
  },[])
  
  return (
    <>
      <div className={`${styles.header}`}>{heading}</div>
      <div className={`${styles.aboutUs_poster}`}>
        {/* <InfoNav /> */}
        {/* <HomeHeader /> */}
      </div>
      <div className={`${styles.aboutUs_details}`} style={{transform:`translateY(-${offsetY * 0.8}px)`}}>
        <div style={{transform:`translateY(${offsetY * 0.3}px)`}}>
          <img src="/images/courses/42.png" alt="images" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
        <div style={{transform:`translateY(${offsetY * 0.3}px)`}}>
          <img src="/images/courses/1221.png" alt="images" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
        <div style={{transform:`translateY(${offsetY * 0.3}px)`}}>
          <img src="/images/courses/5.png" alt="images" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
        <div style={{transform:`translateY(${offsetY * 0.3}px)`}}>
          <img src="/images/courses/5.png" alt="images" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
        <div style={{transform:`translateY(${offsetY * 0.3}px)`}}>
          <img src="/images/courses/5.png" alt="images" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
        <div style={{transform:`translateY(${offsetY * 0.3}px)`}}>
          <img src="/images/courses/5.png" alt="images" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
        <div style={{transform:`translateY(${offsetY * 0.3}px)`}}>
          <img src="/images/courses/5.png" alt="images" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
      <div
        className={`${styles.footerOverlay} ${styles.footerOverlayZoom}`}
        // onAnimationStart={() => {
        //   router.prefetch(`info/${selected}`);
        // }}
        onAnimationEnd={() => {
          // setIsPageLoad(true);
        }}></div>
    </>
  );
};

export default Contents;
