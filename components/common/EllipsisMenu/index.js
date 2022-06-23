import { useEffect, useRef, useState } from 'react';
import styles from './ellipsisMenu.module.scss';

export default function EllipsisMenu({ buttonArr = [] }) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const [btn1, btn2, ...btns] = buttonArr;
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsMenuVisible(false);
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function showMenu(e) {
    e.currentTarget.focus();
    setIsMenuVisible(true);
  }

  function hideMenu(e) {
    e.currentTarget.blur();
    setIsMenuVisible(false);
  }

  return (
    <div
      onClick={showMenu}
      onMouseEnter={showMenu}
      onMouseLeave={hideMenu}
      className={styles.container}
      ref={containerRef}
      tabIndex="-1">
      <div className={styles.ellipsis}></div>

      {isMenuVisible && (
        <div className={styles.dropdown}>
          <ul>
            <li>
              <button onClick={btn1?.handleClick}>{btn1?.text || 'View'}</button>
            </li>
            <li>
              <button onClick={btn2?.handleClick}>{btn2?.text || 'Edit'}</button>
            </li>
            {btns.map((btn) => {
              return (
                <li>
                  <button onClick={btn?.handleClick}>{btn?.text}</button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
