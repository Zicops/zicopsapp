import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './sidebar.module.scss';

// move the styles in sidebar.module.scss in this folder
export default function Sidebar({ sidebarItemsArr }) {
  const router = useRouter();
  return (
    <div className={styles.sidebar}>
      <div className={styles.course_management}>
        <img src="/images/sidebar_img.png" className={styles.sidebar_img} alt="" />
        <h3>Course Management</h3>
      </div>

      <div className={styles.sidebar_menu}>
        <ul>
          {sidebarItemsArr.map((val, key) => {
            return (
              <Link
                href={val.link}
                key={key}
                className="row"
                // id={router.pathname == val.link ? 'active' : ''}
                onClick={() => {
                  router.pathname = val.link;
                }}>
                <a
                  className={
                    router.pathname == val.link
                      ? styles.active
                      : ''
                  }
                >
                  {val.title}
                </a>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
