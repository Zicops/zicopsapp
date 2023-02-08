import DashboardTable from '@/components/AdminAnalyticsDashboardComp/CourseConsumptionStatistics/DashboardTable';
import styles from '../adminAnalyticsDashboard.module.scss';
import Dropdown from '@/components/DashboardComponents/Dropdown';
import { useHandleCatSubCat } from '@/helper/hooks.helper';
import { useState } from 'react';
import CourseTable from './CourseTable';

export default function TopCourseTable() {
  const { catSubCat, setActiveCatId } = useHandleCatSubCat();
  const [filters, setFilters] = useState({
    category: null,
    subCategory: null
  });
  const optionsCat = [{ value: '', label: '-- Select --' }, ...catSubCat?.cat];
  const catValue = { value: filters.category, label: filters.category };
  const optionsSubCat = [{ value: '', label: '-- Select --' }, ...catSubCat?.subCat];
  const subCatValue = { value: filters.subCategory, label: filters.subCategory };
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.wrapperHeading}`}>
        Top 5 courses
        <div style={{ display: 'flex', gap: 10 }}>
          <Dropdown
            placeholder={'Category'}
            options={optionsCat}
            value={catValue}
            changeHandler={(e) => {
              setActiveCatId(e);
              setFilters({ ...filters, category: e.value, subCategory: null });
            }}
          />
          <Dropdown
            placeholder={'Sub-category'}
            options={optionsSubCat}
            value={subCatValue}
            changeHandler={(e) => {
              setFilters({ ...filters, subCategory: e.value });
            }}
          />
        </div>
      </div>
      <div className={`${styles.wrapperSubHeading}`}>In all category</div>
      <CourseTable/>
    </div>
  );
}
