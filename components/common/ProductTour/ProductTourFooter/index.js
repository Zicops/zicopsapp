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
    const currentTour = PRODUCT_TOUR_FLOW?.[index === null ? 0 : index];
    if (index === null) return;
    // console.log(currentTour,index);
    setActiveTour(currentTour);
    if (!currentTour?.route?.includes(router?.asPath) && currentTour?.route) {
      router.push(currentTour?.route);
    }
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
              <span>
                <button disabled>
                  <img src="/images/svg/play_arrow.svg" alt="" className={styles.reverse_img} />
                </button>
              </span>
            ) : (
              <button onClick={() => setIndex(index - 1)}>
                <img src="/images/svg/play_arrow.svg" alt="" className={styles.reverse_img} />
              </button>
            )}
            {index === PRODUCT_TOUR_FLOW.length - 1 ? (
              <span>
                <button disabled>
                  <img src="/images/svg/play_arrow.svg" alt="" />
                </button>
              </span>
            ) : (
              <button
                onClick={() => {
                  return index === null ? setIndex(0) : setIndex(index + 1);
                }}>
                <img src="/images/svg/play_arrow.svg" alt="" />
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
