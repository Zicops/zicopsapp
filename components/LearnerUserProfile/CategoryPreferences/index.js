import styles from '../learnerUserProfile.module.scss';
import { subCategory } from '../Logic/userData.helper';

const CategoryPreferences = () => {
  //   console.log(subCategory);
  return (
    <div className={`${styles.categoryPreferences}`}>
      <div className={`${styles.text}`}>Sub-category preferences:</div>
      <div className={`${styles.category}`}>
        {subCategory.map((v, i) => (
          <div className={`${styles.textSubCategory}`}>{subCategory[i]}</div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPreferences;
