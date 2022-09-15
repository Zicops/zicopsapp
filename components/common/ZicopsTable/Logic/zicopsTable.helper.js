import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import {
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector
} from '@mui/x-data-grid';
import ToolTip from '../../ToolTip';

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
      renderItem={(props2) => (
        <>
          <ToolTip title="Go to this Page" placement="bottom">
            <PaginationItem {...props2} disableRipple />
          </ToolTip>
        </>
      )}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

export function CustomAscendingIcon() {
  return (
    <div style={{ marginTop: '5px' }}>
      <ToolTip title="Previous" placement="left">
        <img
          src="/images/downsort.svg"
          alt=""
          height={15}
          width={15}
          style={{ transform: 'rotate(180deg)' }}
        />
      </ToolTip>
    </div>
  );
}

export function CustomDescendingIcon() {
  return (
    <div style={{ marginTop: '5px' }}>
      <ToolTip title="Next" placement="right">
        <img src="/images/downsort.svg" alt="" height={15} width={15} />
      </ToolTip>
    </div>
  );
}
