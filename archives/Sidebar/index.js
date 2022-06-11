import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../styles/Sidebar.module.css';
import { sidebarData } from './Logic/sidebar.helper';

// move the styles in sidebar.module.scss in this folder
export default function Sidebar({image, header}) {
  const router = useRouter();
  return (
    <div className={styles.sidebar}>
      <div className={styles.course_management}>
        <img src={image || '/images/sidebar_img.png'} className={styles.sidebar_img} alt="" />
        <h3>{header || "Zicops Management"}</h3>
      </div>

      <div className={styles.sidebar_menu}>
        <ul>
          {sidebarData.map((val, key) => {
            return (
              <Link
                href={val.link}
                key={key}
                className="row"
                id={router.pathname == val.link ? 'active' : ''}
                onClick={() => {
                  router.pathname = val.link;
                }}>
                <a
                  className={
                    router.pathname == val.link ||
                    (router.route.includes('admin/courses') && val.link == '/admin/my-courses')
                      ? styles.active
                      : ''
                  }>
                  {val.title}
                </a>
              </Link>
            );
          })}
          {/* <Link href="#">
                        <a>Zicops Courses</a>
                    </Link>
                    <Link href="#">
                        <a className={styles.active}>My Courses</a>
                    </Link>
                    <Link href="#">
                        <a>Categories</a>
                    </Link>
                    <Link href="#">
                        <a>Sub-categories</a>
                    </Link>
                    <Link href="#">
                        <a>Dashboard</a>
                    </Link> */}
        </ul>
      </div>
    </div>
  );
}
