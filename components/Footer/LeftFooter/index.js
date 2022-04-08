import Link from 'next/link';
import styles from '../footer.module.scss';
import { footerLinks } from '../Logic/footer.helper';

export default function LeftFooter() {
  return (
    <div className={`${styles.footerLeft}`}>
      <div className={`${styles.heading}`}>
        {footerLinks.map((link) => (
          <Link href={link.to} key={link.name}>
            <a>{link.name}</a>
          </Link>
        ))}
      </div>

      <p className={`${styles.text}`}>
        © 2021 Zicops. All Rights Reserved. Zicops and all related channel and programming logos are
        service marks of, and all related programming visuals and elemnts are the property of
        Zicops,Inc. All rights reserved.
      </p>
    </div>
  );
}
