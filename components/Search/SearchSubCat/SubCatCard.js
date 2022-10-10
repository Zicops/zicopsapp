// components\Search\SearchSubCat\SubCatCard.js

import styles from '../search.module.scss';

export default function SubCatCard({ data }) {
  return (
    <>
      <div className={styles.subCatCard} onClick={() => data?.handleClick(data?.name)}>
        {data?.img && (
          <div className={styles.imgContainer}>
            <img src={data?.img} alt="" />
          </div>
        )}
        <div>{data?.name}</div>
      </div>
    </>
  );
}
