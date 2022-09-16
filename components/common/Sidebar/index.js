import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRef, useState } from 'react';
import ToolTip from '../ToolTip';
import styles from './sidebar.module.scss';

// move the styles in sidebar.module.scss in this folder
export default function Sidebar({ sidebarItemsArr }) {
  const router = useRouter();
  const lastItem = useRef();
  const [isSidebarBottomReached, setIsSidebarBottomReached] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      setIsSidebarBottomReached(entries[0].isIntersecting);
    });

    if (lastItem?.current) observer.observe(lastItem?.current);
  }, []);

  return (
    <>
      <div
        className={styles.sidebar}
        onScroll={(e) => {
          const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
          console.log(bottom);
          setIsSidebarBottomReached(bottom);
        }}>
        <div className={styles.course_management}>
          <img
            src={sidebarItemsArr.image || '/images/sidebar_img.png'}
            className={styles.sidebar_img}
            alt=""
          />
          <h3>{sidebarItemsArr.heading || 'Admin Management'}</h3>
        </div>

        <div className={styles.sidebar_menu}>
          <ul>
            {sidebarItemsArr.data.map((val, key) => {
              const currentUrl = router.pathname.split('/')[3];
              const pathUrl = val.link.split('/');
              const isActive = currentUrl === pathUrl[pathUrl.length - 1];

              return (
                <Link href={val.link} key={key} className="row">
                  <a
                    className={isActive ? styles.active : ''}
                    onClick={() => {
                      router.pathname = val.link;
                    }}>
                    <ToolTip title={val.description} placement="right-end">
                      <div>{val.title}</div>
                    </ToolTip>
                  </a>
                </Link>
              );
            })}
          </ul>
        </div>

        <ToolTip title="Go Back to Admin Home" placement="top">
          <div
            className={styles.sidebar_footer_menu}
            style={isSidebarBottomReached ? { position: 'absolute' } : {}}>
            <ul>
              <Link href="/admin" className="row">
                <a>
                  <span>Back to Home</span>
                </a>
              </Link>
            </ul>
          </div>
        </ToolTip>
        <div ref={lastItem} className={styles.lastItem}></div>
      </div>
    </>
  );
}
