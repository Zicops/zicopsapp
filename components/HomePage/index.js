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
  // useEffect(() => {
  //   setSlide(() => scrollDown);
  // }, [scrollDown]);
  return (
    <div className={`${styles.container}`}>
      <header className={`${styles.HomeHeader}`}>
        <div className={`${styles.ZicopsLogo}`}>
          <img src="./images/zicops-header-logo.png" alt="not found" />
        </div>
        <div className={`${styles.Login}`}>
          <img src="./images/Union1.png" alt="not found" />
          <a href="/home">Log In</a>
        </div>
      </header>
      <CSSTransition
        in={slide}
        timeout={2000}
        classNames={{
          enterActive: styles.zoomIn,
          exitActive: styles.zoomOut
        }}
        // onEnter={showImage}
        // onEntered={removeOpacity}
        // onExited={hideImage}
        className={`${styles.animated}`}>
        <div className={`${styles.scrollItems}`} onWheel={handleScrollAndZoom}>
          {/* {data.map((item) => ( */}
          {/* <section> */}
          {/* <HomePages item={slide} /> */}
          {/* </section> */}
          {/* ))} */}
          <div className={`${styles.HomeBody}`}>
            <div className={`${styles.scrollContainer}`}>
              <div className={`${styles.scrollItems}`}>
                <div className={`${styles.Lcontainer}`}>
                  <img src={data[scrollDown].icon} />
                  <img src="./images/Zicops-logo-text.png" />
                </div>
                <div className={`${styles.text}`}>
                  <p>{data[scrollDown].text}</p>
                </div>
              </div>
            </div>
            <div className={`${styles.btn}`}>
              <button>See More</button>
            </div>
            <form className={`${styles.formContainer}`}>
              <span>
                <img src="./images/search2.png" alt="not found" />
              </span>
              <input type="text" placeholder="Search your Organization" />
              <button>GO</button>
            </form>
          </div>
        </div>
      </CSSTransition>

      <footer className={`${styles.HomeFooter}`}>
        <div className={`${styles.HomeFooterInner}`}>
          <a href="/home">Zicops About</a>
          <a href="/home">Zicops About</a>
          <a href="/home">Zicops About</a>
          <a href="/home">Zicops About</a>
          <a href="/home">Zicops About</a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
