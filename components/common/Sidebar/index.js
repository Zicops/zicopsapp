import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './sidebar.module.scss';
import { examSidebarData } from './Logic/sidebar.helper';

// move the styles in sidebar.module.scss in this folder
export default function Sidebar() {
  const router = useRouter();
  return (
    <div className={styles.sidebar}>
      <div className={styles.course_management}>
        <img src="/images/sidebar_img.png" className={styles.sidebar_img} alt="" />
        <h3>Course Management</h3>
      </div>

      <div className={styles.sidebar_menu}>
        <ul>
          {examSidebarData.map((val, key) => {
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
                //   className={
                //     router.pathname == val.link ||
                //     (router.route.includes('admin/courses') && val.link == '/admin/my-courses')
                //       ? styles.active
                //       : ''
                //   }
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
