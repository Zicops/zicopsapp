import styles from '../home.module.scss';
import { useEffect, useRef } from 'react';

const ScrollItems = ({ item }) => {
  // let observer = null;
  const elem = useRef(null);

  // useEffect(() => {
  //   observer = new IntersectionObserver((entries) => {
  //     console.log(entries);
  //     if (entries[0].isIntersecting) {
  //       const isZoomInExist = elem.current.parentElement.classList?.contains(styles.zoomIn);
  //       window.s = elem;
  //       elem.current.parentElement.classList.add(isZoomInExist ? styles.zoomOut : styles.zoomIn);
  //     } else {
  //       // elem.current.parentElement.classList.add(styles.zoomOut);
  //       // elem.current.classList.add(styles.zoomOut);
  //     }

  //     setTimeout(() => {
  //       const isZoomOutExist = elem.current.parentElement.classList?.contains(styles.zoomOut);
  //       if (isZoomOutExist) {
  //         elem.current.parentElement.classList.remove(styles.zoomIn);
  //       }
  //       elem.current.parentElement.classList.remove(styles.zoomOut);
  //     }, 2000);
  //   });

  //   observer.observe(elem.current);
  // }, []);
  return (
    <div className={`${styles.scrollItems}`}>
      <div className={`${styles.Lcontainer}`}>
        <img src={`${item?.icon}`} />
        <img src="./images/Zicops-logo-text.png" />
      </div>
      <div className={`${styles.text}`}>
        <p>{item?.text}</p>
      </div>
    </div>
  );
};

export default ScrollItems;
