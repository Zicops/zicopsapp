import BarChart from '@/components/common/Charts/BarChart';
import Dropdown from '@/components/DashboardComponents/Dropdown';
import { useHandleCatSubCat } from '@/helper/hooks.helper';
import { useState } from 'react';
import styles from './adminAnalyticsDashboard.module.scss';
import SectionTitle from './common/SectionTitle';
import useHandleCatConsumption from './Logic/useHandleCatConsumption';

export default function CategoryConsumption() {
  const [filters, setFilters] = useState({ category: null, subCategory: null });
  const { catSubCat, setActiveCatId } = useHandleCatSubCat();
  const { subCatData } = useHandleCatConsumption();

  const dataArr = subCatData?.filter((subCat) => {
    let isFiltered = true;
    if (filters?.category) isFiltered = subCat?.cat?.Name === filters?.category;
    if (filters?.subCategory) isFiltered = subCat?.Name === filters?.subCategory;

    return isFiltered;
  });
  const categoryConsumptionData = {
    labels: dataArr?.map((data) => data.name),
    datasets: [
      {
        label: ['Courses'],
        data: dataArr?.map((data) => data.count),
        backgroundColor: [styles.primary],
        borderRadius: ['1'],
        barThickness: 20,
        minBarLength: 2,
        barPercentage: 0.2,
        height: 500,
        fill: true
      }
    ]
  };

  function getDisplayHeading() {
    if (filters?.subCategory) return `${filters?.subCategory} courses`;
    if (filters?.category) return `${filters?.category} categories courses`;

    return 'All categories';
  }

  return (
    <div className={`${styles.wrapper}`}>
      <SectionTitle
        title="Category consumption"
        extraCompAtEnd={
          <>
            <div className={`${styles.sectionHeaderActionBtns}`}>
              <Dropdown
                placeholder={'Category'}
                options={[{ value: '', label: 'All Categories' }, ...catSubCat?.cat]}
                value={{ value: filters.category, label: filters.category }}
                changeHandler={(e) => {
                  setActiveCatId(e);
                  setFilters({ ...filters, category: e.value, subCategory: null });
                }}
              />
              <Dropdown
                placeholder={'Sub-category'}
                options={[{ value: '', label: 'All Sub Categories' }, ...catSubCat?.subCat]}
                value={{ value: filters.subCategory, label: filters.subCategory }}
                changeHandler={(e) => setFilters({ ...filters, subCategory: e.value })}
              />
            </div>
          </>
        }
      />

      <div className={`${styles.wrapperSubHeading}`}>{getDisplayHeading()}</div>

      <div>
        {!!categoryConsumptionData?.labels?.length && (
          <BarChart
            chartData={categoryConsumptionData}
            containerStyles={{
              width: `${categoryConsumptionData?.labels?.length * 150}px`,
              height: '300px'
            }}
            labelLength={15}
          />
        )}
      </div>
    </div>
  );
}
