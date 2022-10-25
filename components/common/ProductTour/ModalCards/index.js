import { ProductTourIndex } from '@/state/atoms/productTour.atom';
import { useRouter } from 'next/router';
import React from 'react';
import { useRecoilState } from 'recoil';
import ProductTooltip from '../ProductTooltip';
import styles from '../productTour.module.scss';

const ModalCards = ({ header, info, link }) => {
  const [index, setIndex] = useRecoilState(ProductTourIndex);
  const router = useRouter();
  const handleClick = () => {
    // alert(link);
    router.push(link);
    return setIndex(0);
  };
  // console.log(data);
  return (
    <div className={styles.modalCards}>
      <span className={styles.modalCards_header}>{header}</span>
      <div className={styles.modalCards_info}>
        <p>{info}</p>
        <button onClick={handleClick}>
          <img src="./images/svg/arrow_forward.svg" alt="" />
        </button>
      </div>
    </div>
  );
};

export default ModalCards;
