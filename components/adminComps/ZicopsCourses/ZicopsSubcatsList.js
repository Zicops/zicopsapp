import CourseHead from '../../CourseHead';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import StyledDataGrid from '../../common/StyledDataGrid';

import {
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector
} from '@mui/x-data-grid';
import { queryClient, GET_SUB_CATS } from '../../../API/Queries';
import { ApolloProvider, useQuery } from '@apollo/client';

const columns = [
  {
    field: 'id',
    headerName: 'Index',
    headerClassName: 'course-list-header',
    width: 300
  },
  {
    field: 'SubCatName',
    headerClassName: 'course-list-header',
    headerName: 'SubCategory',
    width: 300
  }
];

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      classes={{ ul: 'paginationStyle' }}
      variant="outlined"
      shape="rounded"
      page={page + 1}
      count={pageCount}
      renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

function CustomAscendingIcon() {
  return (
    <div style={{ marginLeft: '20px', marginTop: '5px' }}>
      <img
        src="/images/downsort.svg"
        alt=""
        height={15}
        width={15}
        style={{ transform: 'rotate(180deg)' }}
      />
    </div>
  );
}

function CustomDescendingIcon() {
  return (
    <div style={{ marginLeft: '20px', marginTop: '5px' }}>
      <img src="/images/downsort.svg" alt="" height={15} width={15} />
    </div>
  );
}

function ZicopsSubCategoryList() {
  const { data } = useQuery(GET_SUB_CATS);
  // console.log(data);
  let latest = [];
  data
    ? data.allSubCategories.map((val, index) => latest.push({ id: index + 1, SubCatName: val }))
    : null;
  return (
    <div style={{ height: '70vh' }}>
      {data && (
        <StyledDataGrid
          rows={latest}
          columns={columns}
          sx={{
            border: 0,
            pt: 2,
            pb: 0,
            px: 5,
            color: '#fff'
          }}
          autoHeight={false}
          disableSelectionOnClick
          components={{
            Pagination: CustomPagination,
            ColumnSortedDescendingIcon: CustomDescendingIcon,
            ColumnSortedAscendingIcon: CustomAscendingIcon
          }}
          pageSize={7}
          rowsPerPageOptions={[5]}
          pagination
        />
      )}
    </div>
  );
}

const ZicopsSubcatsList = () => {
  return (
    <>
      <div className="content">
        <CourseHead title="Zicops Subcategories" />

        <ApolloProvider client={queryClient}>
          <div className="content-panel">
            <ZicopsSubCategoryList />
          </div>
        </ApolloProvider>
      </div>
      <style jsx>
        {`
          .content {
            background-color: #1a1a1a;
            float: right;
            width: calc(100% - 250px);
            z-index: 1;
            margin-top: 70px;
            height: calc(110vh - 70px);
            padding: 30px 70px;
          }
          .content-panel {
            margin: 30px 10px 10px 10px;
            color: var(--white);
            height: calc(60vh + 100px);
            box-shadow: -2px 2px 10px 0 #000000, 2px -2px 5px 0 #686868;
            border-radius: 10px;
          }
        `}
      </style>
    </>
  );
};

export default ZicopsSubcatsList;
