import { ProductTourVisible } from '@/state/atoms/productTour.atom';
import MyQuestionBanks from 'pages/admin/exams/my-question-bank/[questionBankId]';
import React, { Children, useState } from 'react';
import { useRecoilValue } from 'recoil';
import InfoModal from './InfoModal';
import styles from './productTour.module.scss';
import ProductTourFooter from './ProductTourFooter';

const ProductTour = ({ children, customStyle, showInfoModal }) => {
  const showOverlay = useRecoilValue(ProductTourVisible);

  // function handleClick() {
  //   setShowOverlay(false);
  // }
  // console.log(showInfoModal);

  return (
    <>
      {showOverlay && (
        <div className={`${customStyle === 'transparent' ? styles.transparent : styles.overlay}`}>
          {children}
          {showInfoModal && <InfoModal />}
          {/* <MyQuestionBanks /> */}
          {/* <ProductTourFooter isVisible={false} handleOverlay={handleClick} /> */}
        </div>
      )}
    </>
  );
};

export default ProductTour;
