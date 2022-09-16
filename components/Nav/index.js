import Link from 'next/link';
import styles from './nav.module.scss';
import { useContext, useEffect, useRef, useState } from 'react';
import { AdminMenu, truncateTo16, UserMenu } from './Logic/nav.helper';
import { useHandleNav } from './Logic/useHandleNav';
import LeftMenuDropdown from './LeftMenuDropdown';
import { userContext } from '../../state/contexts/UserContext';
import { useRouter } from 'next/router';
import RightDropDownMenu from './RightDropDownMenu';
import AllNotification from '../Notifications';
import Notifications from '../Notifications';

import HamburgerMenuIcon from '../../public/images/menu.png';
import UserDisplay from './UserDisplay';
import ToolTip from '../common/ToolTip';

export default function Nav() {
  const { isAdmin, makeAdmin } = useContext(userContext);

  const [showNotification, setShowNotification] = useState(false);
  const notificationBarRef = useRef(null);

  const handleClickInside = () => setShowNotification(!showNotification);

  useEffect(() => {
    const handleClickOutside = (e) => {
      // console.log(e.target, notificationBarRef.current);
      if (!notificationBarRef.current.contains(e.target) && notificationBarRef.current) {
        setShowNotification(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [notificationBarRef]);

  const {
    searchQuery,
    activateSearch,
    deactivateSearch,
    searchInputRef,
    handleSearch,
    gotoAdmin,
    gotoUser,
    isOnLearnerSide
  } = useHandleNav(isAdmin, makeAdmin);

  const router = useRouter();

  return (
    <div className={styles.navbar} id="navbar">
      <div className={styles.left}>
        <LeftMenuDropdown
          isOnLearnerSide={isOnLearnerSide}
          handleClick={{ gotoAdmin, gotoUser }}
          navmenuicon={HamburgerMenuIcon}
        />

        <Link href={!isOnLearnerSide ? '/admin' : '/'}>
          <a className={styles.logo}>
            <ToolTip title={`${!isOnLearnerSide ? 'Go Back to Admin Home':""}`} placement="bottom">
              <img src="/images/zicops-header-logo.png" />
            </ToolTip>
          </a>
        </Link>

        <div className={styles.menu}>
          <ul>
            {(!isOnLearnerSide ? AdminMenu : UserMenu).map((val, key) => {
              return (
                <Link href={val.link} key={key}>
                  <li
                    className={
                      router.route.toLowerCase().includes(`${val.title.toLowerCase()}`)
                        ? styles.active
                        : ''
                    }>
                      <span>{val.title}</span>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>

      <div className={styles.right} onBlur={deactivateSearch}>
        {/* {searchQuery !== null && ( */}
        {isOnLearnerSide && (
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

        <div ref={notificationBarRef} className={styles.special_menu}>
          <ul>
            {/* {!isAdmin && searchQuery === null && (
              <li onClick={() => activateSearch(true)}>
                <img src="/images/search.png" />
              </li>
            )} */}
            <li onClick={handleClickInside} className={styles.notificationIcon}>
              {showNotification ? (
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <mask
                    id="mask0_1267_651"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="25"
                    height="25">
                    <rect x="0.125244" y="0.333252" width="24" height="24" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_1267_651)">
                    <path
                      d="M3.77515 19.5084V17.2334H5.85015V10.4584C5.85015 9.0084 6.27948 7.72507 7.13815 6.6084C7.99615 5.49173 9.10848 4.7584 10.4751 4.4084V3.7334C10.4751 3.2834 10.6378 2.90007 10.9631 2.5834C11.2878 2.26673 11.6751 2.1084 12.1251 2.1084C12.5751 2.1084 12.9628 2.26673 13.2881 2.5834C13.6128 2.90007 13.7751 3.2834 13.7751 3.7334V4.4084C15.1585 4.7584 16.2751 5.49173 17.1251 6.6084C17.9751 7.72507 18.4001 9.0084 18.4001 10.4584V17.2334H20.4751V19.5084H3.77515ZM12.1251 22.5334C11.5585 22.5334 11.0711 22.3334 10.6631 21.9334C10.2545 21.5334 10.0501 21.0501 10.0501 20.4834H14.2001C14.2001 21.0501 13.9961 21.5334 13.5881 21.9334C13.1795 22.3334 12.6918 22.5334 12.1251 22.5334Z"
                      fill="#6BCFCF"
                    />
                  </g>
                </svg>
              ) : (
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <mask
                    id="mask0_1267_1318"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="25"
                    height="25">
                    <rect x="0.125244" y="0.333252" width="24" height="24" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_1267_1318)">
                    <path
                      d="M3.7749 19.5084V17.2334H5.8499V10.4584C5.8499 9.02507 6.27924 7.74573 7.1379 6.6204C7.9959 5.49573 9.10824 4.7584 10.4749 4.4084V3.7334C10.4749 3.2834 10.6376 2.90007 10.9629 2.5834C11.2876 2.26673 11.6749 2.1084 12.1249 2.1084C12.5749 2.1084 12.9626 2.26673 13.2879 2.5834C13.6126 2.90007 13.7749 3.2834 13.7749 3.7334V4.4084C15.1582 4.7584 16.2749 5.49173 17.1249 6.6084C17.9749 7.72507 18.3999 9.0084 18.3999 10.4584V17.2334H20.4749V19.5084H3.7749ZM12.1249 22.5334C11.5582 22.5334 11.0709 22.3334 10.6629 21.9334C10.2542 21.5334 10.0499 21.0501 10.0499 20.4834H14.1999C14.1999 21.0501 13.9959 21.5334 13.5879 21.9334C13.1792 22.3334 12.6916 22.5334 12.1249 22.5334ZM8.1249 17.2334H16.1249V10.4584C16.1249 9.3584 15.7332 8.41673 14.9499 7.6334C14.1666 6.85007 13.2249 6.4584 12.1249 6.4584C11.0249 6.4584 10.0832 6.85007 9.2999 7.6334C8.51657 8.41673 8.1249 9.3584 8.1249 10.4584V17.2334Z"
                      fill="#6BCFCF"
                    />
                  </g>
                </svg>
              )}
            </li>
            {/* <li>
              <img src="/images/chat.png" />
            </li> */}
          </ul>
          {showNotification && <Notifications />}
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
