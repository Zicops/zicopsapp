import BarChart from '@/components/common/Charts/BarChart';
import Dropdown from '@/components/DashboardComponents/Dropdown';
import { useHandleCatSubCat } from '@/helper/hooks.helper';
import { useState } from 'react';
import Spinner from '../common/Spinner';
import styles from './adminAnalyticsDashboard.module.scss';
import SectionTitle from './common/SectionTitle';
import SortBtn from './common/SortBtn';
import useHandleCatConsumption from './Logic/useHandleCatConsumption';

export default function CategoryConsumption() {
  const [filters, setFilters] = useState({ category: null, subCategory: null });
  const [sortIndex, setSortIndex] = useState({ x: 0, y: 0 });
  const { catSubCat, setActiveCatId } = useHandleCatSubCat();
  const { subCatData, isLoading } = useHandleCatConsumption();

  const sort = ['none', 'up', 'down'];
  const dataArr = subCatData
    ?.filter((subCat) => {
      let isFiltered = true;
      if (filters?.category) isFiltered = subCat?.cat?.Name === filters?.category;
      if (filters?.subCategory) isFiltered = subCat?.Name === filters?.subCategory;

      return isFiltered;
    })
    ?.sort((data1, data2) => {
      const compare = data1?.name?.localeCompare(data2?.name);
      if (sortIndex?.x === 1) return compare;
      if (sortIndex?.x === 2) return compare * -1;

      return -1;
    })
    ?.sort((data1, data2) => {
      if (sortIndex?.y === 1) return data2?.count - data1?.count;
      if (sortIndex?.y === 2) return data1?.count - data2?.count;

      return -1;
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
    if (filters?.category) return `${filters?.category} sub-categories`;

    return 'All categories';
  }

  return (
    <div className={`${styles.wrapper} ${styles.categoryConsumption}`}>
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

      <SortBtn
        handleClick={() =>
          setSortIndex((prev) => {
            const index = prev.y + 1;
            if (index === sort?.length) return { ...prev, y: 0 };
            return { ...prev, y: index || 0 };
          })
        }
        sortIndex={sortIndex.y}
        isAxisX={false}
        displayText="Number of courses"
      />

      <div className={`${styles.barGraphContainer}`}>
        {!isLoading ? (
          <BarChart
            chartData={categoryConsumptionData}
            containerStyles={{
              width: `${categoryConsumptionData?.labels?.length * 150}px`,
              height: '300px'
            }}
            labelLength={15}
          />
        ) : (
          <Spinner />
        )}
      </div>

      <div className={`${styles.footer}`}>
        {!isLoading && (
          <SortBtn
            handleClick={() =>
              setSortIndex((prev) => {
                const index = prev.x + 1;
                if (index === sort?.length) return { ...prev, x: 0 };
                return { ...prev, x: index || 0 };
              })
            }
            sortIndex={sortIndex.x}
            displayText="Sub-Categories"
          />
        )}
      </div>
    </div>
  );
}
