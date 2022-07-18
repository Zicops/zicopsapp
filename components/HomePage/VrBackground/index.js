import { useEffect, useState } from 'react';
import styles from '../home.module.scss';

export default function VrBackground() {
  const [duration, setDuration] = useState(150000);

  // useEffect(() => {
  //   let timer = null;
  //   function handleMouseMove(e) {
  //     // console.log(e);
  //     clearTimeout(timer);

  //     timer = setTimeout(() => {
  //       console.log(e.screenX * 100);
  //       setDuration(e.screenX * 100);
  //     }, 100);
  //   }

  //   window.addEventListener('mousemove', handleMouseMove);
  //   return () => window.removeEventListener('mousemove', handleMouseMove);
  // }, []);

  return (
    <>
      {/* https://codepen.io/ssudoku/pen/prxEjg */}
      <section className={`${styles.vrContainer}`}>
        <a-scene className={`${styles.vrBackground}`}>
          <a-entity rotation="0 0 0">
            <a-animation
              attribute="rotation"
              dur={duration}
              easing="linear"
              fill="forwards"
              to="0 360 0"
              repeat="indefinite"></a-animation>
            {/* <a-sky src="https://upload.wikimedia.org/wikipedia/commons/1/18/Rheingauer_Dom%2C_Geisenheim%2C_360_Panorama_%28Equirectangular_projection%29.jpg"></a-sky> */}
            <a-sky src="/images/galaxy.jpg"></a-sky>
            {/* <a-sky src="/images/starrySky2.png"></a-sky> */}
          </a-entity>
        </a-scene>
      </section>
    </>
  );
}
