import Button from '@/components/common/Button';
import ZicopsTable from '@/components/common/ZicopsTable';
import Dropdown from '@/components/DashboardComponents/Dropdown';
import { useHandleCatSubCat } from '@/helper/hooks.helper';
import styles from './adminAnalyticsDashboard.module.scss';
import SectionTitle from './common/SectionTitle';
import useHandleCourseConsumption from './Logic/useHandleCourseConsumption';

export default function CourseConsumptionStatistics() {
  const { catSubCat, setActiveCatId } = useHandleCatSubCat();
  const { tableData, filters, setFilters } = useHandleCourseConsumption();

  const columns = [
    {
      field: 'courseName',
      headerName: 'Course name',
      headerClassName: 'course-list-header',
      width: 300
    },
    {
      field: 'activeLearners',
      headerName: 'Active learners',
      type: 'number',
      headerClassName: 'course-list-header',
      headerAlign: 'center',
      align: 'center',
      width: 180
    },
    {
      field: 'completedBy',
      headerName: 'Completed by',
      type: 'number',
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'course-list-header',
      width: 180
    },
    {
      field: 'averageCompletionTime',
      headerName: 'Average completion time',
      type: 'number',
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'course-list-header',
      width: 250
    },
    {
      field: 'averageCompliance',
      headerName: 'Average compliance %',
      type: 'number',
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'course-list-header',
      width: 250
    },
    {
      field: 'publishedOn',
      headerName: 'Published on',
      type: 'number',
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'course-list-header',
      width: 180
    },
    {
      field: 'ownedBy',
      headerName: 'Owned by',
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'course-list-header',
      width: 130
    },
    {
      field: 'duration',
      headerName: 'Duration',
      type: 'number',
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'course-list-header',
      width: 150
    }
  ];

  function getDisplayHeading() {
    if (filters?.subCategory) return `${filters?.subCategory} courses`;
    if (filters?.category) return `${filters?.category} categories courses`;

    return 'All category courses';
  }

  return (
    <div className={`${styles.wrapper}`}>
      <SectionTitle
        title="Course consumption statistics"
        extraCompAtEnd={
          <>
            <div className={`${styles.sectionHeaderActionBtns}`}>
              <Button
                styleClass={styles.downloadBtn}
                text={<img src="/images/svg/searchBlue.svg" />}
              />
              <Button
                styleClass={styles.downloadBtn}
                text={
                  <>
                    <img src="/images/svg/downloadBlue.svg" />
                    <p>Download</p>
                  </>
                }
              />
              <Dropdown
                placeholder={'Category'}
                options={[{ value: '', label: 'All Categories' }, ...catSubCat?.cat]}
                value={{ value: filters.category, label: filters.category }}
                changeHandler={(e) => {
                  setActiveCatId(e);
                  setFilters({ ...filters, category: e.value, subCategory: null });
                }}
              />
            </div>
          </>
        }
      />

      <div className={`${styles.wrapperSubHeading}`}>
        {getDisplayHeading()}
        <Dropdown
          placeholder={'Sub-category'}
          options={[{ value: '', label: '-- Select --' }, ...catSubCat?.subCat]}
          value={{ value: filters.subCategory, label: filters.subCategory }}
          changeHandler={(e) => setFilters({ ...filters, subCategory: e.value })}
        />
      </div>

      <ZicopsTable
        columns={columns}
        data={tableData}
        pageSize={5}
        rowsPerPageOptions={[3]}
        tableHeight="55vh"
      />
    </div>
  );
}
