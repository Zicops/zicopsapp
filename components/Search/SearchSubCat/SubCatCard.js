// components\Search\SearchSubCat\SubCatCard.js

import styles from '../search.module.scss';

export default function SubCatCard({ img, name }) {
  return (
    <>
      <div className={styles.subCatCard}>
        {img && <img src={img} alt="" />}
        <div>{name}</div>
      </div>
    </>
  );
}
