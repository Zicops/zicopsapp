import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import {
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector
} from '@mui/x-data-grid';

export function CustomPagination() {
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

export function CustomAscendingIcon() {
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

export function CustomDescendingIcon() {
  return (
    <div style={{ marginLeft: '20px', marginTop: '5px' }}>
      <img src="/images/downsort.svg" alt="" height={15} width={15} />
    </div>
  );
}
