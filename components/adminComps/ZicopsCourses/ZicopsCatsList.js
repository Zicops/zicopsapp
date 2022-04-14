import { ApolloProvider, useQuery } from '@apollo/client';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import StyledDataGrid from '../../common/StyledDataGrid';

import {
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector
} from '@mui/x-data-grid';
import { GET_CATS, queryClient } from '../../../API/Queries';
import CourseHead from '../../CourseHead';

const columns = [
  {
    field: 'id',
    headerName: 'Index',
    headerClassName: 'course-list-header',
    width: 300
  },
  {
    field: 'catName',
    headerClassName: 'course-list-header',
    headerName: 'Category',
    width: 300
  }
];

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  // https://mui.com/material-ui/react-pagination/#usepagination
  return (
    <Pagination
      // className="paginationStyle"
      classes={{ ul: 'paginationStyle' }}
      variant="outlined"
      shape="rounded"
      page={page + 1}
      count={pageCount}
      // @ts-expect-error
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

function ZicopsCategoryList() {
  const { data } = useQuery(GET_CATS);
  console.log(data);
  let latest = [];
  data
    ? data.allCategories.map((val, index) => latest.push({ id: index + 1, catName: val }))
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
          // sortModel={[{ field: 'name', sort: 'asc' }]}
          components={{
            Pagination: CustomPagination,
            ColumnSortedDescendingIcon: CustomDescendingIcon,
            ColumnSortedAscendingIcon: CustomAscendingIcon
          }}
          pageSize={8}
          rowsPerPageOptions={[5]}
          pagination
        />
      )}
    </div>
  );
}

const ZicopsCatsList = () => {
  return (
    <>
      <div className="content">
        <CourseHead title="Zicops Categories" />

        <ApolloProvider client={queryClient}>
          {/* <CourseContextProvider> */}

          <div className="content-panel">
            <ZicopsCategoryList />
          </div>

          {/* </CourseContextProvider> */}
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

export default ZicopsCatsList;
