import ZicopsTable from '@/components/common/ZicopsTable';
import Dropdown from '@/components/DashboardComponents/Dropdown';
import { useHandleCatSubCat } from '@/helper/hooks.helper';
import { useRef, useState } from 'react';
import { UnFoldMoreArrows } from '../common/ZicopsIcons';
import styles from './adminAnalyticsDashboard.module.scss';
import SectionTitle from './common/SectionTitle';
import useHandleCourseConsumption from './Logic/useHandleCourseConsumption';

export default function TopCourseTable() {
  const { catSubCat, setActiveCatId } = useHandleCatSubCat();
  const { tableData, filters, setFilters, isLoading, setIsLoading } = useHandleCourseConsumption();
  const [pageSize, setPageSize] = useState(5);
  const tableContainerRef = useRef();

  const columns = [
    {
      field: 'name',
      headerName: 'Course name',
      headerClassName: 'course-list-header',
      flex: 1.5
    },
    {
      field: 'totalLearners',
      headerName: 'Number of learners',
      type: 'number',
      headerClassName: 'course-list-header',
      headerAlign: 'center',
      align: 'center',
      flex: 1
    },
    {
      field: 'ownedBy',
      headerName: 'Course owned by',
      headerClassName: 'course-list-header',
      flex: 1
    }
  ];

  const isTopFiveCourses = +pageSize === 5;
  return (
    <div className={`${styles.wrapper}`}>
      <SectionTitle
        title={`Top ${pageSize} courses`}
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
                changeHandler={(e) => {
                  setFilters({ ...filters, subCategory: e.value });
                }}
              />
            </div>
          </>
        }
      />

      <div className={`${styles.wrapperSubHeading}`}>In all category</div>
      <div className={`${styles.tableContainer}`} ref={tableContainerRef}>
        <ZicopsTable
          columns={columns}
          data={tableData?.slice(0, pageSize)}
          pageSize={pageSize}
          rowsPerPageOptions={[3]}
          tableHeight={`${pageSize === 5 ? 53 : 147}vh`}
          loading={isLoading}
          customStyles={{
            padding: '10px 0'
          }}
          customPaginationUiComp={
            <span
              className={`${styles.seeMore}`}
              onClick={() => {
                setIsLoading(true);
                tableContainerRef?.current?.scrollIntoView(false);
                setPageSize(isTopFiveCourses ? 20 : 5);

                // this is required to add some delay in rendering the data table
                // changing the data values and pagesize causes the table to re-render quickly and
                // dom is not updated instantly which causes the table to be small sized but rows with large height
                setTimeout(() => setIsLoading(false), 0);
              }}>
              See {isTopFiveCourses ? 'More' : 'Less'} <UnFoldMoreArrows turns="0.25" />
            </span>
          }
        />
      </div>
    </div>
  );
}
