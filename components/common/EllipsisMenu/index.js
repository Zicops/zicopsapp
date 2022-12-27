import { useEffect, useRef, useState } from 'react';
import ToolTip from '../ToolTip';
import { ADMIN_USERS } from '../ToolTip/tooltip.helper';
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
            <ToolTip title={ADMIN_USERS.myUsers.viewBtn} placement="right">
              <li>
                <button disabled={btn1?.isDisabled || false} onClick={btn1?.handleClick}>
                  {btn1?.text || 'View'}
                </button>
              </li>
            </ToolTip>
            <ToolTip title={ADMIN_USERS.myUsers.editBtn} placement="right">
              <li>
                <button disabled={btn2?.isDisabled || false} onClick={btn2?.handleClick}>
                  {btn2?.text || 'Edit'}
                </button>
              </li>
            </ToolTip>
            {btns.map((btn) => {
              if (btn?.hideBtn) return;

              return (
                <ToolTip title={`${btn?.text} user`} placement="right">
                  <li>
                    <button disabled={btn?.isDisabled || false} onClick={btn?.handleClick}>
                      {btn?.text}
                    </button>
                  </li>
                </ToolTip>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
