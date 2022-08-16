import styles from '../learnerUserProfile.module.scss';

const CategoryPreferences = ({ subCategoryData }) => {
  return (
    <div className={`${styles.categoryPreferences}`}>
      <div className={`${styles.text}`}>Sub-category preferences:</div>
      <div className={`${styles.category}`}>
        {subCategoryData.map((v, i) => (
          <div className={`${styles.textSubCategory}`}>{v?.sub_category}</div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPreferences;
