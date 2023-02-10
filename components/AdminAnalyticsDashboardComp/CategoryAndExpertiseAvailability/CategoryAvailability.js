import BarChart from '@/components/common/Charts/BarChart';
import Spinner from '@/components/common/Spinner';
import { DownSortTriangleIcon } from '@/components/common/ZicopsIcons';
import Dropdown from '@/components/DashboardComponents/Dropdown';
import SwitchButton from '@/components/DashboardComponents/SwitchButton';
import { useHandleCatSubCat } from '@/helper/hooks.helper';
import { useState } from 'react';
import styles from '../adminAnalyticsDashboard.module.scss';
import useHandleCatConsumption from '../Logic/useHandleCatConsumption';

export default function CategoryAvailability() {
  const [filters, setFilters] = useState({ category: null, subCategory: null, isCategory: false });
  const [sortIndex, setSortIndex] = useState(0);
  const { catSubCat } = useHandleCatSubCat();
  const { subCatData } = useHandleCatConsumption(filters?.isCategory);

  const sort = ['none', 'up', 'down'];
  const dataArr = subCatData?.filter((subCat) => {
    let isFiltered = true;
    if (filters?.category) isFiltered = subCat?.cat?.Name === filters?.category;
    if (filters?.subCategory) isFiltered = subCat?.Name === filters?.subCategory;

    return isFiltered;
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

  const labels = dataArr
    ?.map((data) => data.name)
    ?.sort((l1, l2) => {
      const compare = l1.localeCompare(l2);
      if (sortIndex === 1) return compare;
      if (sortIndex === 2) return compare * -1;

      return -1;
    });

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
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.wrapperHeading}`}>Category availability</div>
      <div className={`${styles.wrapperSubHeading}`}>
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
              options={[{ value: '', label: '-- Select --' }, ...catSubCat?.cat]}
              value={{ value: filters.category, label: filters.category }}
              changeHandler={(e) => setFilters({ ...filters, category: e.value })}
            />
          </>
        )}
      </div>

      <div
        className={`${styles.sortBtn}`}
        onClick={() =>
          setSortIndex((prev) => {
            const index = prev + 1;
            if (index === sort?.length) return 0;
            return index;
          })
        }>
        <span>
          <DownSortTriangleIcon
            color={sortIndex === 1 ? styles.primary : styles.darkThree}
            turns="0.5"
          />
          <DownSortTriangleIcon color={sortIndex === 2 ? styles.primary : styles.darkThree} />
        </span>
        {filters?.isCategory ? 'Categories' : 'Sub-Categories'}
      </div>

      <div className={`${styles.barGraphContainer}`}>
        {labels?.length ? (
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
    </div>
  );
}
