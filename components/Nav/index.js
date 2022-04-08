import Link from 'next/link';
import styles from './nav.module.scss';
import { useContext } from 'react';
import { AdminMenu, truncateTo16, UserMenu } from './Logic/nav.helper';
import { useHandleNav } from './Logic/useHandleNav';
import LeftMenuDropdown from './LeftMenuDropdown';
import { userContext } from '../../state/contexts/UserContext';

export default function Nav() {
  const { isAdmin, makeAdmin } = useContext(userContext);
  const { isSearch, handleMouseHover, handleSearch, gotoAdmin, gotoUser } = useHandleNav(
    isAdmin,
    makeAdmin
  );

  return (
    <div className={styles.navbar} id="navbar">
      <div className={styles.left}>
        <LeftMenuDropdown isAdmin={isAdmin} handleClick={{ gotoAdmin, gotoUser }} />

        <Link href={isAdmin ? '/admin' : '/'}>
          <a className={styles.logo}>
            <img src="/images/zicops-header-logo.png" />
          </a>
        </Link>

        <div className={styles.menu}>
          <ul>
            {(isAdmin ? AdminMenu : UserMenu).map((val, key) => {
              return (
                <Link href={val.link} key={key}>
                  <li>{val.title}</li>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>

      <div className={styles.right}>
        {!isSearch ? '' : (
          <div
            className={`${isSearch ? '' : styles.search_menu}`}
            onMouseLeave={() => handleMouseHover(0)}
            id="search_menu">
            <select className={styles.nav_search_dropdown} placeholder="Search...">
              {['All', 'Self Paced', 'Classroom', 'Labs', 'Exam', 'Blogs'].map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>

            <input
              type="text"
              className={styles.nav_search}
              placeholder="Search..."
              onInput={handleSearch}
            />
            <button className={styles.nav_search_btn}></button>
          </div>
        )}

        <div className={styles.special_menu}>
          <ul>
            {!isAdmin && !isSearch && (
              <li onMouseOver={() => handleMouseHover(1)}>
                <img src="/images/search.png" />
              </li>
            )}
            <li>
              <img src="/images/bell.png" />
            </li>
            <li>
              <img src="/images/chat.png" />
            </li>
          </ul>
        </div>

        <div className={styles.profile}>
          <img className={styles.profilepic} src="/images/dp.png" />
          <div className={styles.profilename}>
            <div className={styles.name}>{truncateTo16('Abhishek Ghosh')}</div>
            <div className={styles.desg}>Zicops</div>
          </div>
          <img className={styles.dropdownicon} src="/images/arrow2.png" />
        </div>
      </div>
    </div>
  );
}
