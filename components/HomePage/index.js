import { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './home.module.scss';
import HomeHeader from './HomeHeader';
import HomeInputField from './HomeInputField';
import HomePages from './HomePages';
import { data } from './Logic/homePage.helper';

export default function HomePage() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [slideData, setSlideData] = useState({
    activeSlide: 0,
    isLastScrollUp: false
  });
  const [deltaY, setDeltaY] = useState(null);
  const [slide, setSlide] = useState(false);

  const maxSlideCount = 3;
  let wait = false;
  let handler = null;
  function callback(e) {
    // if (wait) return;
    const deltaY = e.deltaY;
    console.log(deltaY, handler);
    clearTimeout(handler);

    handler = setTimeout(() => {
      wait = false;
      const isScrollUp = deltaY > 0;
      let index = slideIndex + (isScrollUp ? 1 : -1);

      if (index < 0) index = 0;
      if (index > maxSlideCount) index = maxSlideCount;

      if (index !== slideIndex) {
        setSlide(!slide);

        setSlideData({
          ...slideData,
          activeSlide: index,
          isLastScrollUp: isScrollUp
        });
      }

      setSlideIndex(index);
    }, 100);
  }

  useEffect(() => {
    console.log(slideIndex);
  }, [slideIndex]);

  function showImage() {
    alert('enter');
  }
  function hideImage() {
    alert('exit');
  }
  // useEffect(() => {
  //   setSlide(() => scrollDown);
  // }, [scrollDown]);

  return (
    <div className={`${styles.container}`}>
      <HomeHeader />

      {[0, 1, 2, 3].map((i) => {
        const { activeSlide, isLastScrollUp } = slideData;
        let count = isLastScrollUp ? 1 : -1;
        let nextSlide = activeSlide + count;

        if (nextSlide < 0 || nextSlide > maxSlideCount) nextSlide = null;

        const outClass = isLastScrollUp ? styles.zoomOut : styles.scaleOut;
        const inClass = isLastScrollUp ? styles.zoomIn : styles.scaleIn;

        return (
          <CSSTransition
            in={activeSlide === i}
            timeout={2000}
            classNames={{
              enterActive: nextSlide === i ? outClass : inClass,
              exitActive: nextSlide === i ? inClass : outClass
            }}>
            <div
              className={`${styles.scrollItems}  ${activeSlide === i ? '' : styles.scaleDown}`}
              onWheel={(e) => callback(e)}>
              <HomePages item={data[i]} />
            </div>
          </CSSTransition>
        );
      })}

      {/* <CSSTransition
        in={slideData?.activeSlide === 0}
        timeout={2000}
        classNames={{
          enterActive: !slideData.isLastScrollUp&&slideData?.activeSlide  ? styles.zoomIn : styles.zoomOut,
          exitActive: slideData.isLastScrollUp ? styles.zoomIn : styles.zoomOut
        }}>
        <div
          className={`${styles.scrollItems}  ${
            slideData?.activeSlide === 0 ? '' : styles.scaleDown
          }`}
          onWheel={(e) => setDeltaY(e.deltaY)}>
          <HomePages item={data[0]} />
        </div>
      </CSSTransition>

      <CSSTransition
        in={slideData?.activeSlide === 1}
        timeout={2000}
        classNames={{
          enterActive: !slideData.isLastScrollUp ? styles.zoomIn : styles.zoomOut,
          exitActive: slideData.isLastScrollUp ? styles.zoomIn : styles.zoomOut
        }}>
        <div
          className={`${styles.scrollItems}  ${
            slideData?.activeSlide === 1 ? '' : styles.scaleDown
          }`}
          onWheel={(e) => setDeltaY(e.deltaY)}>
          <HomePages item={data[1]} />
        </div>
      </CSSTransition> */}

      <HomeInputField />
    </div>
  );
}

// {
//   /* <CSSTransition
//   in={slide}
//   timeout={2000}
//   // className="fade"
//   classNames={{
//     // appear: styles.zoomOut,
//     // appearActive: styles.zoomOut,
//     // appearDone: styles.zoomIn,
//     // enter: 'my-enter',
//     // enterActive: 'my-active-enter',
//     // enterDone: 'my-done-enter',
//     // exit: 'my-exit',
//     // exitActive: 'my-active-exit',
//     // exitDone: styles.zoomOut,
//     // enterActive: styles.zoomIn,
//     enterActive: deltaY < 0 ? styles.zoomIn : styles.zoomOut,
//     exitActive: deltaY < 0 ? styles.zoomIn : styles.zoomOut
//   }}
//   // onEnter={() => console.log('enter')}
//   // onEntering = {showImage}
//   // onEntered={removeOpacity}
//   // onExit
//   // onExiting
//   // onExited={hideImage}
//   // className={`${styles.mynode}`}
// >
//   <div className={`${styles.scrollItems}`} onWheel={(e) => setDeltaY(e.deltaY)}>
//     <HomePages item={data[slideIndex]} />
//   </div>
// </CSSTransition> */
// }
