import BarChart from '@/components/common/Charts/BarChart';
import Dropdown from '@/components/DashboardComponents/Dropdown';
import SwitchButton from '@/components/DashboardComponents/SwitchButton';
import { useHandleCatSubCat } from '@/helper/hooks.helper';
import { useState } from 'react';
import styles from '../adminAnalyticsDashboard.module.scss';
import useHandleCatConsumption from '../Logic/useHandleCatConsumption';

export default function CategoryAvailability() {
  const [filters, setFilters] = useState({ category: null, subCategory: null });
  const { catSubCat, setActiveCatId } = useHandleCatSubCat();
  const { subCatData } = useHandleCatConsumption(catSubCat);

  const dataArr = subCatData?.filter((subCat) => {
    let isFiltered = true;
    if (filters?.category) isFiltered = subCat?.cat?.Name === filters?.category;
    if (filters?.subCategory) isFiltered = subCat?.Name === filters?.subCategory;

    return isFiltered;
  });
  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        // borderWidth: 2
      }
    },
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    }
  };

  const labels = dataArr?.map((data) => data.name);

  const data = {
    labels,
    datasets: [
      {
        label: 'Courses',
        data: dataArr?.map((data) => data.count),
        // borderColor: 'rgb(255, 99, 132)',
        backgroundColor: styles.primary
      }
    ]
  };

  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.wrapperHeading}`}>Category availability</div>
      <div className={`${styles.wrapperSubHeading}`}>
        Showing data for:
        <SwitchButton text={'Sub-categories'} isTextLeft={true} />
      </div>

      <div className={`${styles.wrapperSubHeading}`}>
        Sub-categories of:
        <Dropdown
          placeholder={'Sub-category'}
          options={[{ value: '', label: '-- Select --' }, ...catSubCat?.subCat]}
          value={{ value: filters.subCategory, label: filters.subCategory }}
          changeHandler={(e) => setFilters({ ...filters, subCategory: e.value })}
        />
      </div>

      <BarChart options={options} chartData={data} />
    </div>
  );
}
