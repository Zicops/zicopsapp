import { useRecoilValue } from 'recoil';
import { getSiteMapForView } from '../../state/atoms/sitemap.atom';
import styles from './courseHead.module.scss';

export default function Sitemap() {
  const sitemapForView = useRecoilValue(getSiteMapForView);

  return (
    <>
      <h4 className={`${styles.adminHeading}`}>Admin</h4>

      <div className={`${styles.sitemap}`}>
        {Object.keys(sitemapForView).map((key) => {
          return (
            <div>
              <h4 className={`${styles.title}`}>{key}</h4>

              <>
                {sitemapForView[key].map((item) => (
                  <p>{item}</p>
                ))}
              </>
            </div>
          );
        })}
      </div>
    </>
  );
}
