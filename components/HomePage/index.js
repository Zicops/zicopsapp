import { useState, useEffect } from 'react';
import {
  CSSTransition,
  SwitchTransition,
  Transition,
  TransitionGroup
} from 'react-transition-group';
import HomePages from './HomePages';
import styles from './home.module.scss';
import { data } from './Logic/homePage.helper';
import Link from 'next/link';
import HomeInputField from './HomeInputField';
import HomeHeader from './HomeHeader';

const HomePage = () => {
  const [scrollDown, setScrollDown] = useState(0);
  const [slide, setSlide] = useState(false);

  function handleScrollAndZoom(e) {
    setSlide(!slide);
    if (e.deltaY < 0 && scrollDown > 0) {
      setScrollDown(--scrollDown);
    } else {
      setScrollDown(scrollDown);
    }
    if (e.deltaY > 0 && scrollDown < 3) {
      setScrollDown(++scrollDown);
    } else {
      setScrollDown(scrollDown);
    }
  }

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
      <CSSTransition
        in={slide}
        timeout={2000}
        classNames={{
          appear: styles.zoomOut,
          appearActive: styles.zoomOut,
          appearDone: styles.zoomIn,
          // enter: 'my-enter',
          // enterActive: 'my-active-enter',
          // enterDone: 'my-done-enter',
          // exit: 'my-exit',
          // exitActive: 'my-active-exit',
          // exitDone: 'my-done-exit',
          enterActive: styles.zoomIn,
          exitActive: styles.zoomOut
        }}
        // onEnter={showImage}
        // onEntering = {showImage}
        // onEntered={removeOpacity}
        // onExit
        // onExiting
        // onExited={hideImage}
        // className={`${styles.mynode}`}
      >
        <div className={`${styles.scrollItems}`} onWheel={handleScrollAndZoom}>
          <HomePages item={data[scrollDown]} />
        </div>
      </CSSTransition>
      <HomeInputField />
    </div>
  );
};

export default HomePage;
