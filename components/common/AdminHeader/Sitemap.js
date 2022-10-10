import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import { getSiteMapForView } from '../../../state/atoms/sitemap.atom';
import styles from './adminHeader.module.scss';

export default function Sitemap() {
  const sitemapForView = useRecoilValue(getSiteMapForView);
  const router = useRouter();
  let isCurrentRoute = router.asPath === '/admin';

  return (
    <>
      <h4 className={`${styles.adminHeading} ${isCurrentRoute ? styles.active : ''}`}>
        <Link href="/admin">
          <a>Admin</a>
        </Link>
      </h4>

      <div className={`${styles.sitemap}`}>
        {Object.keys(sitemapForView).map((key) => {
          return (
            <div>
              <h4 className={`${styles.title}`}>{key}</h4>

              <>
                {sitemapForView[key].map((item) => {
                  isCurrentRoute = router.asPath === item?.route;
                  return (
                    <p>
                      <span className={`${isCurrentRoute ? styles.active : ''}`}></span>
                      <Link href={item?.route}>
                        <a>{item?.displayName}</a>
                      </Link>
                    </p>
                  );
                })}
              </>
            </div>
          );
        })}
      </div>
    </>
  );
}
