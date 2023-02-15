import BarChart from '@/components/common/Charts/BarChart';
import Spinner from '@/components/common/Spinner';
import Dropdown from '@/components/DashboardComponents/Dropdown';
import SwitchButton from '@/components/DashboardComponents/SwitchButton';
import { useHandleCatSubCat } from '@/helper/hooks.helper';
import { useState } from 'react';
import styles from '../adminAnalyticsDashboard.module.scss';
import SectionTitle from '../common/SectionTitle';
import SortBtn from '../common/SortBtn';
import useHandleCatConsumption from '../Logic/useHandleCatConsumption';

export default function CategoryAvailability() {
  const [filters, setFilters] = useState({ category: null, subCategory: null, isCategory: false });
  const [sortIndex, setSortIndex] = useState({ x: 0, y: 0 });
  const { catSubCat } = useHandleCatSubCat();
  const { subCatData, isLoading } = useHandleCatConsumption(filters?.isCategory);

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
      if (sortIndex?.y === 1) return compare;
      if (sortIndex?.y === 2) return compare * -1;

      return -1;
    })
    ?.sort((data1, data2) => {
      if (sortIndex?.x === 1) return data2?.count - data1?.count;
      if (sortIndex?.x === 2) return data1?.count - data2?.count;

      return -1;
    });
  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
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
        backgroundColor: styles.primary,
        borderRadius: ['1'],
        barThickness: 20,
        minBarLength: 2,
        barPercentage: 0.2,
        height: 500,
        fill: true
      }
    ]
  };

  return (
    <div className={`${styles.wrapper} ${styles.courseAvailability}`}>
      <SectionTitle title="Category availability" />

      <div className={`${styles.wrapperSubHeading} ${styles.bottomBorder}`}>
        Showing data for:
        <SwitchButton
          text={'Sub-categories'}
          isTextLeft={true}
          isChecked={!filters?.isCategory}
          changeHandler={(e, isChecked) => setFilters({ ...filters, isCategory: !isChecked })}
        />
      </div>

      <div className={`${styles.wrapperSubHeading}`}>
        {filters?.isCategory ? (
          <span style={{ padding: '5px' }}>All Categories</span>
        ) : (
          <>
            Sub-categories of:
            <Dropdown
              placeholder={'Category'}
              options={[{ value: '', label: 'All Categories' }, ...catSubCat?.cat]}
              value={{ value: filters.category, label: filters.category }}
              changeHandler={(e) => setFilters({ ...filters, category: e.value })}
            />
          </>
        )}
      </div>

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
        displayText={filters?.isCategory ? 'Categories' : 'Sub-Categories'}
      />

      <div className={`${styles.barGraphContainer}`}>
        {!isLoading ? (
          <BarChart
            options={options}
            chartData={data}
            direction="rtl"
            containerStyles={{ height: `${labels?.length < 8 ? '340' : labels?.length * 30}px` }}
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
            displayText="Number of courses"
          />
        )}
      </div>
    </div>
  );
}
