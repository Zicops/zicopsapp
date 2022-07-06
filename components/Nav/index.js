import Link from 'next/link';
import styles from './nav.module.scss';
import { useContext, useRef } from 'react';
import { AdminMenu, truncateTo16, UserMenu } from './Logic/nav.helper';
import { useHandleNav } from './Logic/useHandleNav';
import LeftMenuDropdown from './LeftMenuDropdown';
import { userContext } from '../../state/contexts/UserContext';
import { useRouter } from 'next/router';
import RightDropDownMenu from './RightDropDownMenu';

import HamburgerMenuIcon from '../../public/images/menu.png';
import UserDisplay from './UserDisplay';

export default function Nav() {
  const { isAdmin, makeAdmin } = useContext(userContext);
  const {
    searchQuery,
    activateSearch,
    deactivateSearch,
    searchInputRef,
    handleSearch,
    gotoAdmin,
    gotoUser
  } = useHandleNav(isAdmin, makeAdmin);

  const router = useRouter();

  return (
    <div className={styles.navbar} id="navbar">
      <div className={styles.left}>
        <LeftMenuDropdown
          isAdmin={isAdmin}
          handleClick={{ gotoAdmin, gotoUser }}
          navmenuicon={HamburgerMenuIcon}
        />

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
                  <li
                    className={
                      router.route.toLowerCase().includes(`${val.title.toLowerCase()}`)
                        ? styles.active
                        : ''
                    }>
                    {val.title}
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>

      <div className={styles.right} onBlur={deactivateSearch}>
        {/* {searchQuery !== null && ( */}
        {!isAdmin && (
          <div className={`${styles.search_menu}`} id="search_menu">
            {/* <select className={styles.nav_search_dropdown} placeholder="Search...">
              {['All', 'Self Paced', 'Classroom', 'Labs', 'Exam', 'Blogs'].map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select> */}

            <input
              type="search"
              ref={searchInputRef}
              className={`${styles.nav_search} ${searchQuery ? styles.nav_search_long : ''}`}
              placeholder="Search..."
              onInput={handleSearch}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  searchQuery && router.push(`/search-page/${searchQuery}`);
                }
              }}
            />
            <button
              className={styles.nav_search_btn}
              onClick={() => searchQuery && router.push(`/search-page/${searchQuery}`)}></button>
          </div>
        )}

        <div className={styles.special_menu}>
          <ul>
            {/* {!isAdmin && searchQuery === null && (
              <li onClick={() => activateSearch(true)}>
                <img src="/images/search.png" />
              </li>
            )} */}
            <li>
              <img src="/images/bell.png" />
            </li>
            {/* <li>
              <img src="/images/chat.png" />
            </li> */}
          </ul>
        </div>

        {/* <div className={styles.profile}>
          <img className={styles.profilepic} src="/images/dp.png" />
          <div className={styles.profilename}>
            <div className={styles.name}>{truncateTo16('Abhishek Ghosh')}</div>
            <div className={styles.desg}>Zicops</div>
          </div>
          <img className={styles.dropdownicon} src="/images/arrow2.png" />
          <RightDropDownMenu />
        </div> */}
        <UserDisplay />
      </div>
    </div>
  );
}
