import styles from './zicopsSidebarButton.module.scss';
import Link from 'next/link';

const ZicopsSidebarButton = ({ handlechange, title, key }) => {
  return (
    <div className={styles.sidebar_menu}>
      <ul>
        <Link href="#" key={key} onClick={handlechange}>
          <a>{title}</a>
        </Link>
      </ul>
    </div>
  );
};
export default ZicopsSidebarButton;
