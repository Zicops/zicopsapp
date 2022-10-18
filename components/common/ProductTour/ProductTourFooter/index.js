import {
  ActiveTourAtom,
  ProductTourIndex,
  ProductTourVisible
} from '@/state/atoms/productTour.atom';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { PRODUCT_TOUR_FLOW } from '../productTour.flow';
import styles from '../productTour.module.scss';

const ProductTourFooter = ({ data, isVisible }) => {
  const [index, setIndex] = useRecoilState(ProductTourIndex);

  const [activeTour, setActiveTour] = useRecoilState(ActiveTourAtom);
  const [closeProductTour, setCloseProductTour] = useRecoilState(ProductTourVisible);
  const router = useRouter();

  useEffect(() => {
    if (index === null) return;
    const currentTour = PRODUCT_TOUR_FLOW?.[index === 0 ? 0 : index];
    // console.log(currentTour,index);
    setActiveTour(currentTour);
    if (!currentTour?.route?.includes(router?.asPath) && currentTour?.route) {
      router.push(currentTour?.route);
    }
  }, [index]);

  const handleCloseProductTour = () => {
    setCloseProductTour(false);
    setActiveTour({ id: null });
    return setIndex(null);
  };

  // const handlePreviousKey = () => {
  //   setActiveTour((prev) => {
  //     return { ...prev, id: (prev?.id == null ? 1 : prev?.id) + 1 };
  //   });
  //   router.push(data?.[id]?.nextPageRoute);
  // };

  return (
    <>
      {isVisible && (
        <div className={styles.footer}>
          <div className={styles.btn_container}>
            {index === 0 || index === null ? (
              <button disabled>
                <svg
                  style={{ transform: 'rotate(180deg)' }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="70"
                  height="70"
                  viewBox="0 0 24 24"
                  fill="none">
                  <path d="M9.5 17L14.5 12L9.5 7V17Z" fill="#C4C4C4" />
                </svg>
              </button>
            ) : (
              <button onClick={() => setIndex(index - 1)}>
                <svg
                  style={{ transform: 'rotate(180deg)' }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="70"
                  height="70"
                  viewBox="0 0 24 24"
                  fill="none">
                  <path d="M9.5 17L14.5 12L9.5 7V17Z" fill="#C4C4C4" />
                </svg>
              </button>
            )}
            {index === PRODUCT_TOUR_FLOW.length - 1 ? (
              <button disabled>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="70"
                  height="70"
                  viewBox="0 0 24 24"
                  fill="none">
                  <path d="M9.5 17L14.5 12L9.5 7V17Z" fill="#C4C4C4" />
                </svg>
              </button>
            ) : (
              <button
                onClick={() => {
                  return index === null ? setIndex(0) : setIndex(index + 1);
                }}>
                {/* <img src="/images/svg/arrow_right.svg" alt=""  /> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="70"
                  height="70"
                  viewBox="0 0 24 24"
                  fill="none">
                  <path d="M9.5 17L14.5 12L9.5 7V17Z" fill="#C4C4C4" />
                </svg>
              </button>
            )}
          </div>
          <button
            className={styles.close_btn}
            onClick={() => {
              handleCloseProductTour();
            }}>
            Close Info Panel
          </button>
        </div>
      )}
    </>
  );
};

export default ProductTourFooter;
