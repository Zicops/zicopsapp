import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './sidebar.module.scss';

// move the styles in sidebar.module.scss in this folder
export default function Sidebar({ sidebarItemsArr }) {
  const router = useRouter();
  return (
    <>
      <div className={styles.sidebar}>
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
                    {val.title}
                  </a>
                </Link>
              );
            })}
          </ul>
        </div>
      <div className={styles.sidebar_footer_menu}>
        <ul>
          <Link href="/admin" className="row">
            <a><span>Back to Home</span></a>
          </Link>
        </ul>
      </div>
      </div>
    </>
  );
}
