import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import {
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector
} from '@mui/x-data-grid';
import ToolTip from '../../ToolTip';
import styles from '../zicopsTable.module.scss';
import usePagination from '@mui/material/usePagination';

export function CustomPagination({ currentPage = null }) {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  if (currentPage !== null && currentPage !== page) apiRef.current.setPage(currentPage);

  return (
    <Pagination
      classes={{ ul: 'paginationStyle' }}
      variant="outlined"
      shape="rounded"
      page={page + 1}
      count={pageCount}
      siblingCount={1}
      boundaryCount={0}
      renderItem={(props2) => {
        if (props2?.type?.includes('ellipsis')) return null;

        if (page <= 1 && props2?.page === 4 && props2?.type !== 'next') return null;
        if (page === 2 && props2?.page === 1 && props2?.type !== 'previous') return null;
        if (page === pageCount - 3 && props2?.page === pageCount && props2?.type !== 'next')
          return null;
        if (page >= pageCount - 2 && props2?.page === pageCount - 3 && props2?.type !== 'previous')
          return null;

        return (
          <>
            <ToolTip
              title={`${
                props2.type.includes('page')
                  ? 'go to this page'
                  : `${props2.type === 'next' ? 'next page' : 'previous page'}`
              } `}
              placement="bottom">
              <PaginationItem {...props2} disableRipple />
            </ToolTip>
          </>
        );
      }}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

export function CustomPagination1() {
  const { items } = usePagination({ count: 10, siblingCount: 5 });

  const index = items?.findIndex(({ type }) => type === 'end-ellipsis');
  const _items = index >= 0 ? items?.splice(index, items?.length - index - 1) : items;

  console.log(_items, items);
  return (
    <ul className={styles?.pagination}>
      {items.map(({ page, type, selected, ...item }, index) => {
        if (type === 'start-ellipsis' || type === 'end-ellipsis') return null;
        if (type === 'end-ellipsis') return null;

        console.log(index);
        const isPage = type === 'page';
        return (
          <li key={index}>
            <li style={isPage ? { fontWeight: selected ? 'bold' : undefined } : {}} {...item}>
              {isPage ? page : type}
            </li>
          </li>
        );
      })}
    </ul>
  );
}

export function CustomAscendingIcon() {
  return (
    <div style={{ marginTop: '5px' }}>
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
    <div style={{ marginTop: '5px' }}>
      <img src="/images/downsort.svg" alt="" height={15} width={15} />
    </div>
  );
}
