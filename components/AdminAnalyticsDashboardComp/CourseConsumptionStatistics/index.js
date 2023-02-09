import DashboardTable from './DashboardTable';
import styles from '../adminAnalyticsDashboard.module.scss';
import Dropdown from '@/components/DashboardComponents/Dropdown';
import CardHeader from '@/components/DashboardComponents/CardHeader';
import { useHandleCatSubCat } from '@/helper/hooks.helper';
import { useState } from 'react';

export default function CourseConsumptionStatistics() {
  const { catSubCat, setActiveCatId } = useHandleCatSubCat();
  const [filters, setFilters] = useState({
    category: null,
    subCategory: null
  });
  const optionsCat = [{ value: '', label: '-- Select --' }, ...catSubCat?.cat];
  const catValue = { value: filters.category, label: filters.category };
  const optionsSubCat = [{ value: '', label: '-- Select --' }, ...catSubCat?.subCat];
  const subCatValue = { value: filters.subCategory, label: filters.subCategory };
  const download = {
    text: 'Download',
    image: '/images/svg/downloadBlue.svg'
  };
  const search = {
    text: '',
    image: '/images/svg/searchBlue.svg'
  };
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.wrapperHeading}`}>
        Course consumption statistics
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          <CardHeader props={search} />
          <CardHeader props={download} />
          <Dropdown
            placeholder={'Category'}
            options={optionsCat}
            value={catValue}
            changeHandler={(e) => {
              setActiveCatId(e);
              setFilters({ ...filters, category: e.value, subCategory: null });
            }}
          />
        </div>
      </div>
      <div className={`${styles.wrapperSubHeading}`}>
        All category courses
        <Dropdown
          placeholder={'Sub-category'}
          options={optionsSubCat}
          value={subCatValue}
          changeHandler={(e) => {
            setFilters({ ...filters, subCategory: e.value });
          }}
        />
      </div>

      <DashboardTable />
    </div>
  );
}