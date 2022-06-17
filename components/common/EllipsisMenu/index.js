import { useState } from 'react';
import styles from './ellipsisMenu.module.scss';

export default function EllipsisMenu({ buttonArr = [] }) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

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
      onBlur={() => setIsMenuVisible(false)}
      tabIndex="-1">
      <div className={styles.ellipsis}></div>

      {isMenuVisible && (
        <div className={styles.dropdown}>
          <ul>
            <li>View</li>
            <li>Edit</li>
            {buttonArr}
          </ul>
        </div>
      )}
    </div>
  );
}
