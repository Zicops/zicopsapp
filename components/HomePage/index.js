import { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './home.module.scss';
import HomeHeader from './HomeHeader';
import HomeInputField from './HomeInputField';
import SingleSlide from './SingleSlide';
import { data } from './Logic/homePage.helper';
import ScrollDownAnimation from '../common/ScrollDownAnimation';

export default function HomePage() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isAnimationOngoing, seIsAnimationOngoing] = useState(0);
  const [slideData, setSlideData] = useState({
    activeSlide: 0,
    isLastScrollUp: false
  });

  const DURATION = 1000;
  const maxSlideCount = 3;

  function showSlidesOnScroll(e) {
    if (isAnimationOngoing) return;
    seIsAnimationOngoing(1);
      const isScrollUp = e.deltaY > 0;
      let index = slideIndex + (isScrollUp ? 1 : -1);
      if (index < 0) index = 0;
      if (index > maxSlideCount) index = maxSlideCount;
      if (index !== slideIndex) {
        setSlideData({
          ...slideData,
          activeSlide: index,
          isLastScrollUp: isScrollUp
        });
      }
    setSlideIndex(index);
      
    setTimeout(() => {
      seIsAnimationOngoing(0);
    }, (index === maxSlideCount || index === 0) ? 1 : DURATION);
  }

  return (
    <div className={`${styles.container}`}>
      <HomeHeader />

      {[...Array(maxSlideCount + 1).fill(null)].map((v, i) => {
        const { activeSlide, isLastScrollUp } = slideData;
        let count = isLastScrollUp ? 1 : -1;
        let nextSlide = activeSlide + count;

        if (nextSlide < 0 || nextSlide > maxSlideCount) nextSlide = null;

        const outClass = isLastScrollUp ? styles.wheeldownZoomOut : styles.wheelupZoomIn;
        const inClass = isLastScrollUp ? styles.wheeldownZoomIn : styles.wheelupZoomOut;

        return (
          <CSSTransition
            in={activeSlide === i}
            timeout={DURATION}
            classNames={{
              enterActive: nextSlide === i ? outClass : inClass,
              exitActive: nextSlide === i ? inClass : outClass
            }}>
            <div
              className={`${styles.homepageSlides} ${
                activeSlide === i ? styles.showActiveSlide : styles.hideOtherSlides
              }`}
              onWheel={showSlidesOnScroll}>
              <SingleSlide item={data[i]} />
            </div>
          </CSSTransition>
        );
      })}

      <HomeInputField />

    </div>
  );
}