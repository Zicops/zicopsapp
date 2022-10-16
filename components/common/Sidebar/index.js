import { ActiveTourAtom, ProductTourVisible } from '@/state/atoms/productTour.atom';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import ProductTooltip from '../ProductTour/ProductTooltip';
import ToolTip from '../ToolTip';
import styles from './sidebar.module.scss';

// move the styles in sidebar.module.scss in this folder
export default function Sidebar({ sidebarItemsArr, isProductTooltip, proproductTooltipData }) {
  const activeTour = useRecoilValue(ActiveTourAtom);
  const [showProductTour, setShowProductTour] = useRecoilState(ProductTourVisible);
  const router = useRouter();
  const lastItem = useRef();
  const [isSidebarBottomReached, setIsSidebarBottomReached] = useState(false);

  const handleProductTour = () => {
    setShowProductTour(true);
  };

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
          <button onClick={handleProductTour} className={styles.course_management_btn}>
            <img src="/images/svg/hub.svg" alt="" />
          </button>
        </div>

        <div className={styles.sidebar_menu}>
          <ul>
            {sidebarItemsArr.data.map((val, key) => {
              const currentUrl = router.pathname.split('/')[3];
              const pathUrl = val.link.split('/');
              const isActive = currentUrl === pathUrl[pathUrl.length - 1];
              const tourData = activeTour?.id === val?.tourId ? activeTour : null;

              return (
                <>
                  {isProductTooltip ? (
                    <ProductTooltip
                      title={tourData?.title}
                      buttonName={tourData?.btnName}
                      tooltipIsOpen={!!tourData}
                      // tooltipIsOpen={true}
                      placement="right-start">
                      <span>
                        <Link href={val.link} key={key} className="row">
                          <a
                            className={isActive ? styles.active : ''}
                            onClick={() => {
                              router.pathname = val.link;
                            }}>
                            <div>{val.title}</div>
                          </a>
                        </Link>
                      </span>
                    </ProductTooltip>
                  ) : (
                    <ToolTip title={val.description} placement="right">
                      <span>
                        <Link href={val.link} key={key} className="row">
                          <a
                            className={isActive ? styles.active : ''}
                            onClick={() => {
                              router.pathname = val.link;
                            }}>
                            <div>{val.title}</div>
                          </a>
                        </Link>
                      </span>
                    </ToolTip>
                  )}
                </>
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
