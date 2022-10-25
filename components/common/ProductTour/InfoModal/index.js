import { ProductTourVisible } from '@/state/atoms/productTour.atom';
import React from 'react';
import { useRecoilState } from 'recoil';
import ModalCards from '../ModalCards';
import { adminPageData, PROD_TOUR_ADMIN_EXAMS } from '../productTour.helper';
import styles from '../productTour.module.scss';
import ProductTourFooter from '../ProductTourFooter';

const InfoModal = () => {
  const [showModal, setShowModal] = useRecoilState(ProductTourVisible);

  const handleClick = () => {
    setShowModal(false);
  };
  return (
    <div className={styles.infoModal}>
      <div className={styles.header}>
        <div>
          <span>Welcome to Admin Controls - Home!</span>
          <button onClick={handleClick}>X</button>
        </div>
        <div>
          <p>
            New to this Learning Space? Try taking our quick module tours and know how to seamlessly
            manage your learning space!
          </p>
        </div>
      </div>
      <div className={styles.cards}>
        {adminPageData.map((items) => {
          return <ModalCards header={items.title} info={items.info} link={items.link} />;
        })}
      </div>
      {/* <ProductTourFooter /> */}
    </div>
  );
};

export default InfoModal;
