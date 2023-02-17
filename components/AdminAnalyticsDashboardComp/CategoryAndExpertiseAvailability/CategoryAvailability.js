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
    interaction: {
      mode: 'point',
      axis: 'y'
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    parsing: {
      xAxisKey: 'count',
      yAxisKey: 'count'
    },
    scales: {
      y: {
        ticks: {
          font: {
            size: 14
            // family: 'vazir'
          }
        }
      }
    }
  };

  const labels = dataArr?.map((data) => data.name);
  const data = {
    labels,
    datasets: [
      {
        axis: 'y',
        label: 'Courses',
        data: dataArr,
        // borderColor: 'rgb(255, 99, 132)',
        backgroundColor: styles.primary,
        borderRadius: ['1'],
        barThickness: 20,
        minBarLength: 2,
        barPercentage: 2,
        categoryPercentage: 0.5,
        height: 500,
        fill: true
      }
    ]
  };

  function tooltipUI(tooltipData) {
    const parentNode = document.createElement('div');

    const catTitleNode = document.createElement('div');
    const catData = document.createTextNode(tooltipData?.cat?.Name || tooltipData?.name);
    catTitleNode.appendChild(catData);

    const subCatNode = document.createElement('span');
    const subCatData = document.createTextNode(`Sub-categories: ${tooltipData?.subCatCount || 0}`);
    subCatNode.appendChild(subCatData);
    subCatNode.style.fontSize = '13px';
    subCatNode.style.color = styles.darkThree;

    const courseTitleNode = document.createElement('div');
    const courseData = document.createTextNode(`Courses: ${tooltipData?.count}`);
    courseTitleNode.appendChild(courseData);

    const zicopsCourseNode = document.createElement('div');
    const zicopsCourseData = document.createTextNode(
      `Zicops courses: ${tooltipData?.zicopsCourseCount}`
    );
    zicopsCourseNode.appendChild(zicopsCourseData);
    zicopsCourseNode.style.fontSize = '13px';
    zicopsCourseNode.style.color = styles.darkThree;

    const myCourseNode = document.createElement('div');
    const myCourseData = document.createTextNode(`My courses: ${tooltipData?.myCourseCount}`);
    myCourseNode.appendChild(myCourseData);
    myCourseNode.style.fontSize = '13px';
    myCourseNode.style.color = styles.darkThree;

    parentNode.appendChild(catTitleNode);
    parentNode.appendChild(subCatNode);
    parentNode.appendChild(courseTitleNode);
    parentNode.appendChild(myCourseNode);
    parentNode.appendChild(zicopsCourseNode);
    return parentNode;
  }

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
            tooltipBody={tooltipUI}
            containerStyles={{ height: `${labels?.length < 8 ? '340' : labels?.length * 50}px` }}
          />
        ) : (
          // <ZicopsBarChart
          //   data={d?.map((data) => ({ key: data.name, data: data.count }))}
          //   // containerStyles={{ height: `${dataArr?.length < 8 ? '340' : dataArr?.length * 30}px` }}
          //   barGraphHeight={getBarGraphHeight()}
          //   // data={[
          //   //   { key: 'DLP', data: 13 },
          //   //   { key: 'SIEM', data: 2 },
          //   //   { key: 'Endpoint', data: 7 }
          //   // ]}
          // />
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
