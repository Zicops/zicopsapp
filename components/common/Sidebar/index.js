import { GET_USER_VENDORS, userQueryClient } from '@/api/UserQueries';
import { loadAndCacheDataAsync } from '@/helper/api.helper';
import { PRODUCT_TOUR_PATHS, USER_LSP_ROLE } from '@/helper/constants.helper';
import { FeatureFlagsAtom } from '@/state/atoms/global.atom';
import {
  ActiveTourAtom,
  ProductTourIndex,
  ProductTourVisible
} from '@/state/atoms/productTour.atom';
import { UsersOrganizationAtom, UserStateAtom } from '@/state/atoms/users.atom';
import { VendorStateAtom } from '@/state/atoms/vendor.atoms';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import ProductTooltip from '../ProductTour/ProductTooltip';
import ToolTip from '../ToolTip';
import styles from './sidebar.module.scss';

// move the styles in sidebar.module.scss in this folder
export default function Sidebar({ sidebarItemsArr, isProductTooltip, proproductTooltipData }) {
  const activeTour = useRecoilValue(ActiveTourAtom);
  const { isDemo, isDev } = useRecoilValue(FeatureFlagsAtom);
  const [index, setIndex] = useRecoilState(ProductTourIndex);
  const [showProductTour, setShowProductTour] = useRecoilState(ProductTourVisible);
  const userOrgData = useRecoilValue(UsersOrganizationAtom);
  const [vendorDetails, setVendorDetails] = useRecoilState(VendorStateAtom);
  const userDetails = useRecoilValue(UserStateAtom);

  const router = useRouter();
  const lastItem = useRef();
  const [isSidebarBottomReached, setIsSidebarBottomReached] = useState(false);

  const isVendor = userOrgData.user_lsp_role?.toLowerCase()?.includes(USER_LSP_ROLE.vendor);

  const handleProductTour = () => {
    setShowProductTour(true);
    return setIndex(0);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      setIsSidebarBottomReached(entries[0].isIntersecting);
    });

    if (lastItem?.current) observer.observe(lastItem?.current);
  }, []);

  useEffect(async () => {
    if (!isVendor) return;
    if (vendorDetails?.vendorId) return;
    const vendorDetail = await loadAndCacheDataAsync(
      GET_USER_VENDORS,
      { user_id: userDetails?.id },
      {},
      userQueryClient
    );
    if (!vendorDetail?.getUserVendor?.[0]?.vendorId) return;
    setVendorDetails(vendorDetail?.getUserVendor[0]);
  }, [userDetails?.id]);

  const isProductTourValid = PRODUCT_TOUR_PATHS.includes(router?.asPath?.split('/')?.[2]);

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
          {isProductTourValid && (
            <ToolTip title="Take a tour" placement="bottom">
              <button onClick={handleProductTour} className={styles.course_management_btn}>
                <img src="/images/svg/hub.svg" alt="" />
              </button>
            </ToolTip>
          )}
        </div>

        <div className={styles.sidebar_menu}>
          <ul>
            {sidebarItemsArr.data.map((val, key) => {
              const currentUrl = router.pathname.split('/')[3];
              const pathUrl = val.link.split('/');
              let isActive = currentUrl === pathUrl[pathUrl.length - 1];
              const tourData = activeTour?.id === val?.tourId ? activeTour : null;

              let path = val.link;
              if (val?.isHidden && !isDemo && !isDev) return null;
              if (isVendor && !val?.isVendor) return null;
              if (isVendor && val?.isCustomRoute)
                path = `/admin/vendor/manage-vendor/update-vendor/${vendorDetails?.vendorId}`;

              // temp fix: Change page route for edit course later
              if (
                router.pathname?.split('/')?.[2]?.includes('courses') &&
                val.title?.toLowerCase()?.includes('my course')
              ) {
                isActive = true;
              }
              return (
                <Fragment key={val.id}>
                  {isProductTooltip ? (
                    <ProductTooltip
                      title={tourData?.title}
                      buttonName={tourData?.btnName}
                      tooltipIsOpen={!!tourData}
                      // tooltipIsOpen={true}
                      placement="right-start">
                      <span>
                        <Link href={path} key={key} className="row">
                          <a className={isActive ? styles.active : ''}>
                            <div>{val.title}</div>
                          </a>
                        </Link>
                      </span>
                    </ProductTooltip>
                  ) : (
                    <ToolTip title={val.description} placement="right">
                      <span>
                        <Link href={path} key={key} className="row">
                          <a className={isActive ? styles.active : ''}>
                            <div>{val.title}</div>
                          </a>
                        </Link>
                      </span>
                    </ToolTip>
                  )}
                </Fragment>
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
