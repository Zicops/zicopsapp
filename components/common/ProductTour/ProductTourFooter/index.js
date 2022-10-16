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
    const currentTour = PRODUCT_TOUR_FLOW?.[index?.currentIndex === null ? 0 : index?.currentIndex];
    setActiveTour(currentTour);
    if (!currentTour?.route?.includes(router?.asPath) && currentTour?.route) {
      router.push(currentTour?.route);
    }

    if (index.currentIndex === null && index.prevIndex === null) {
      return setIndex((prev) => ({ prevIndex: null, currentIndex: 0 }));
    }

    if (index.prevIndex !== null && index.currentIndex === null) {
      if (index.flag) return;
      return setIndex((prev) => ({ flag: 1, prevIndex: prev.prevIndex, currentIndex: null }));
    }

    console.log(index);
    // if (currentIndex === null) {
    //   setCurrentIndex((prev)=>{
    //     if(PRODUCT_TOUR_FLOW?.length -1 ===)
    //   });
    // }
    // console.log(currentTour?.route);
    // if (activeTour === null) {
    //   isVisible = false;
    // }
    // console.log(PRODUCT_TOUR_FLOW?.[currentIndex]?.id);
  }, [index.currentIndex]);

  const handleCloseProductTour = () => {
    setCloseProductTour(false);
    return setIndex((prev) => ({ prevIndex: prev.currentIndex, currentIndex: null }));
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
            {index.currentIndex === 0 ? (
              <span>
                <button disabled>
                  <img src="/images/svg/play_arrow.svg" alt="" className={styles.reverse_img} />
                </button>
              </span>
            ) : (
              <button
                onClick={() =>
                  setIndex((prev) => ({
                    prevIndex: prev.currentIndex,
                    currentIndex: prev.currentIndex - 1
                  }))
                }>
                <img src="/images/svg/play_arrow.svg" alt="" className={styles.reverse_img} />
              </button>
            )}
            {/* {currentIndex === PRODUCT_TOUR_FLOW.length - 1 ? (
              <span>
                <button disabled>
                  <img src="/images/svg/play_arrow.svg" alt="" />
                </button>
              </span>
            ) : ( */}

            <button
              onClick={() =>
                setIndex((prev) => ({
                  prevIndex: prev.currentIndex,
                  currentIndex: prev.currentIndex + 1
                }))
              }>
              <img src="/images/svg/play_arrow.svg" alt="" />
            </button>

            {/* )} */}
          </div>
          <button className={styles.close_btn} onClick={handleCloseProductTour}>
            Close Info Panel{index.currentIndex}
          </button>
        </div>
      )}
    </>
  );
};

export default ProductTourFooter;
